import { Resend } from "resend";
import { siteConfig } from "@/config/site";
import type { ContactInput } from "@/lib/validations";

const resendKey = process.env.RESEND_API_KEY;
const notifyTo = process.env.CONTACT_NOTIFY_EMAIL ?? siteConfig.email;
const fromAddress = process.env.CONTACT_FROM_EMAIL ?? "Patashala.Dev <onboarding@resend.dev>";

export const emailConfigured = Boolean(resendKey);

/** Send the internal lead-notification email. No-op when Resend isn't configured. */
export async function sendLeadNotification(lead: ContactInput): Promise<void> {
  if (!resendKey) return;
  const resend = new Resend(resendKey);
  const lines = [
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.company ? `Company: ${lead.company}` : null,
    `Service interest: ${lead.serviceInterest}`,
    lead.budget ? `Budget: ${lead.budget}` : null,
    lead.timeline ? `Timeline: ${lead.timeline}` : null,
    "",
    "Message:",
    lead.message,
  ].filter((l): l is string => l !== null);

  await resend.emails.send({
    from: fromAddress,
    to: notifyTo,
    replyTo: lead.email,
    subject: `New lead: ${lead.name} — ${lead.serviceInterest}`,
    text: lines.join("\n"),
  });
}
