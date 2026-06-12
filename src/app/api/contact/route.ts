import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { connectDB, databaseConfigured } from "@/lib/db";
import { Lead } from "@/lib/models/Lead";
import { sendLeadNotification, emailConfigured } from "@/lib/email";
import { sendUserConfirmation, sendAdminNotification, mailerConfigured } from "@/lib/mailer";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    if (!rateLimit(`contact:${ip}`)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      // Honeypot tripped — return success so bots learn nothing.
      if (fieldErrors.website) {
        return NextResponse.json({ ok: true });
      }
      return NextResponse.json(
        { error: "Please check the highlighted fields.", fieldErrors },
        { status: 422 },
      );
    }

    const lead = parsed.data;
    const submittedAt = new Date();

    // Persist to DB when configured.
    if (databaseConfigured) {
      await connectDB();
      await Lead.create({
        name: lead.name,
        email: lead.email,
        phone: lead.phone || null,
        company: lead.company || null,
        serviceInterest: lead.serviceInterest,
        budget: lead.budget || null,
        timeline: lead.timeline || null,
        message: lead.message,
      });
    }

    // Fire all emails concurrently; isolate failures so a stored lead is never lost.
    await Promise.allSettled([
      // User confirmation via Nodemailer SMTP
      sendUserConfirmation(lead).catch((e) =>
        console.error("[contact] user confirmation email failed:", e),
      ),
      // Admin full-detail notification via Nodemailer SMTP
      sendAdminNotification(lead, submittedAt).catch((e) =>
        console.error("[contact] admin smtp notification failed:", e),
      ),
      // Legacy Resend notification kept as secondary channel
      sendLeadNotification(lead).catch((e) =>
        console.error("[contact] resend notification failed:", e),
      ),
    ]);

    if (!databaseConfigured && !emailConfigured && !mailerConfigured) {
      console.error("[contact] no MONGODB_URI, RESEND_API_KEY, or SMTP configured — lead dropped");
      return NextResponse.json(
        { error: "Contact service is not configured. Please email us directly." },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong on our side. Please try again or email us directly." },
      { status: 500 },
    );
  }
}
