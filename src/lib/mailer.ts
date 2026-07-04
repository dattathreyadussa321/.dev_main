import nodemailer from "nodemailer";
import { Resend } from "resend";
import type { ContactInput } from "@/lib/validations";

const hasResend = Boolean(process.env.RESEND_API_KEY);
const hasSmtp = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
);

export const mailerConfigured = hasResend || hasSmtp;

// ── Internals ─────────────────────────────────────────────────────────────────

function smtpFrom() {
  return (
    process.env.MAIL_FROM ??
    process.env.CONTACT_FROM_EMAIL ??
    `"Patashala Dev" <${process.env.SMTP_USER ?? "noreply@patashala.dev"}>`
  );
}

function resendFrom() {
  // Must be from a Resend-verified domain; falls back to Resend's shared
  // sender which always works without domain verification.
  return process.env.RESEND_FROM ?? "Patashala Dev <onboarding@resend.dev>";
}

interface MailOptions {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}

async function sendMail(opts: MailOptions): Promise<void> {
  if (hasResend) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const payload: Parameters<typeof resend.emails.send>[0] = {
        from: resendFrom(),
        to: opts.to,
        subject: opts.subject,
        text: opts.text,
      };
      if (opts.replyTo) payload.replyTo = opts.replyTo;
      const { error } = await resend.emails.send(payload);
      if (error) throw new Error(`Resend error: ${error.message}`);
      return;
    } catch (err) {
      if (!hasSmtp) throw err;
      // Resend failed (e.g. unverified domain / test-mode restriction) — fall through to SMTP
      console.warn("[mailer] Resend failed, falling back to SMTP:", err);
    }
  }

  if (hasSmtp) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port !== 587,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      // cPanel often uses a cert issued to the server hostname, not the domain —
      // disabling strict verification avoids ERR_TLS_CERT_ALTNAME_INVALID.
      tls: { rejectUnauthorized: false },
    });
    await transporter.sendMail({
      from: smtpFrom(),
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
    });
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/** One-time password sent to the admin for 2-step login. */
export async function sendOtpEmail(otp: string): Promise<void> {
  const to =
    process.env.ADMIN_OTP_EMAIL ??
    process.env.ADMIN_EMAIL ??
    "admin@patashala.dev";

  await sendMail({
    to,
    subject: `${otp} is your Patashala.Dev admin OTP`,
    text: [
      "Your one-time login code for Patashala.Dev Admin:",
      "",
      `        ${otp}`,
      "",
      "This code expires in 5 minutes.",
      "Do not share it with anyone.",
      "",
      "If you did not attempt to log in, your password may be compromised — change it immediately.",
    ].join("\n"),
  });
}

/** Confirmation sent to the user who submitted the contact form. */
export async function sendUserConfirmation(lead: ContactInput): Promise<void> {
  if (!mailerConfigured) return;

  const lines = [
    `Hi ${lead.name},`,
    "",
    "Thank you for contacting Patashala Dev.",
    "",
    "We have received your message and our team will review it shortly. We usually respond within one business day.",
    "",
    "Your submitted request:",
    "",
    `Service: ${lead.serviceInterest}`,
    lead.timeline ? `Timeline: ${lead.timeline}` : null,
    lead.budget ? `Budget: ${lead.budget}` : null,
    "",
    "Regards,",
    "Patashala Dev Team",
    "https://patashala.dev",
  ].filter((l): l is string => l !== null);

  await sendMail({
    to: lead.email,
    subject: "We received your message — Patashala Dev",
    text: lines.join("\n"),
  });
}

/** Full-detail notification sent to the admin inbox. */
export async function sendAdminNotification(
  lead: ContactInput,
  submittedAt: Date,
): Promise<void> {
  if (!mailerConfigured) return;

  const adminEmail =
    process.env.ADMIN_EMAIL ??
    process.env.CONTACT_NOTIFY_EMAIL ??
    "info@patashala.dev";

  const lines = [
    "New contact form submission on Patashala Dev:",
    "",
    `Full Name:  ${lead.name}`,
    `Email:      ${lead.email}`,
    lead.phone ? `Phone:      ${lead.phone}` : null,
    lead.company ? `Company:    ${lead.company}` : null,
    `Service:    ${lead.serviceInterest}`,
    lead.budget ? `Budget:     ${lead.budget}` : null,
    lead.timeline ? `Timeline:   ${lead.timeline}` : null,
    "",
    "Project Message:",
    lead.message,
    "",
    `Submitted:  ${submittedAt.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
  ].filter((l): l is string => l !== null);

  await sendMail({
    to: adminEmail,
    replyTo: lead.email,
    subject: "New Contact Form Submission — Patashala Dev",
    text: lines.join("\n"),
  });
}
