import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "crypto";
import { z } from "zod";
import { signAdminSession, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { generateOtp, createPendingToken, verifyPendingOtp } from "@/lib/otp-store";
import { sendOtpEmail, mailerConfigured } from "@/lib/mailer";

// ── Schemas ──────────────────────────────────────────────────────────────────

const passwordSchema = z.object({
  password: z.string().min(1),
});

const otpSchema = z.object({
  pendingToken: z.string().min(64),
  otp: z.string().length(6).regex(/^\d{6}$/),
});

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Timing-safe string equality via SHA-256 hashing.
 * Hashing normalises lengths before timingSafeEqual so there is no
 * observable timing difference between short and long inputs.
 */
function safeCompare(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const ip = clientIp(req);

  // Shared rate limit across both steps — 10 attempts per minute per IP
  if (!rateLimit(`admin-login:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) {
    return NextResponse.json({ error: "Admin not configured." }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // ── Step 2: OTP verification ──────────────────────────────────────────────
  if ("pendingToken" in body) {
    const parsed = otpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid OTP format." }, { status: 400 });
    }

    const result = verifyPendingOtp(parsed.data.pendingToken, parsed.data.otp);

    if (result === "expired") {
      return NextResponse.json(
        { error: "OTP expired. Please start over." },
        { status: 401 },
      );
    }
    if (result === "locked") {
      return NextResponse.json(
        { error: "Too many wrong attempts. Please start over." },
        { status: 401 },
      );
    }
    if (result === "invalid") {
      return NextResponse.json({ error: "Incorrect OTP." }, { status: 401 });
    }

    // OTP valid — issue the session cookie
    const sessionValue = signAdminSession(adminToken);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE_NAME, sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });
    return res;
  }

  // ── Step 1: Password check ────────────────────────────────────────────────
  const parsed = passwordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!safeCompare(parsed.data.password, adminToken)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  // Password correct — generate and dispatch OTP
  if (!mailerConfigured) {
    return NextResponse.json(
      { error: "Email delivery is not configured on this server. Contact your administrator." },
      { status: 503 },
    );
  }

  const otp = generateOtp();
  const pendingToken = createPendingToken(otp);

  try {
    await sendOtpEmail(otp);
  } catch (err) {
    console.error("[admin/login] failed to send OTP email:", err);
    return NextResponse.json(
      { error: "Failed to send OTP email. Check SMTP configuration." },
      { status: 500 },
    );
  }

  return NextResponse.json({ step: "otp", pendingToken });
}
