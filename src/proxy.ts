import { type NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "pdadmin";
const SESSION_MSG = "admin:authenticated:v1";

async function verifyEdgeSession(cookie: string, secret: string): Promise<boolean> {
  try {
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );
    const rawSig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(SESSION_MSG));
    const expected = Array.from(new Uint8Array(rawSig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    // Constant-time comparison via same-length XOR
    if (cookie.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < cookie.length; i++) {
      diff |= cookie.charCodeAt(i) ^ expected.charCodeAt(i);
    }
    return diff === 0;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login");
  const isAdminApi = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login");

  if (!isAdminPage && !isAdminApi) return NextResponse.next();

  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Admin not configured." }, { status: 503 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const sessionCookie = request.cookies.get(COOKIE_NAME)?.value;

  if (!sessionCookie) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const valid = await verifyEdgeSession(sessionCookie, adminToken);
  if (!valid) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
