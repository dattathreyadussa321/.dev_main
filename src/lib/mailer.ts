import nodemailer from "nodemailer";
import type { ContactInput } from "@/lib/validations";

export const mailerConfigured = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS,
);

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function fromAddress() {
  return (
    process.env.MAIL_FROM ??
    process.env.CONTACT_FROM_EMAIL ??
    `"Patashala Dev" <${process.env.SMTP_USER ?? "noreply@patashala.dev"}>`
  );
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

  await createTransporter().sendMail({
    from: fromAddress(),
    to: lead.email,
    subject: "We received your message — Patashala Dev",
    text: lines.join("\n"),
  });
}

/** One-time password sent to the admin for 2-step login. */
export async function sendOtpEmail(otp: string): Promise<void> {
  if (!mailerConfigured) return;

  const adminOtpEmail =
    process.env.ADMIN_OTP_EMAIL ??
    process.env.ADMIN_EMAIL ??
    "admin@patashala.dev";

  await createTransporter().sendMail({
    from: fromAddress(),
    to: adminOtpEmail,
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

  await createTransporter().sendMail({
    from: fromAddress(),
    to: adminEmail,
    replyTo: lead.email,
    subject: "New Contact Form Submission — Patashala Dev",
    text: lines.join("\n"),
  });
}
