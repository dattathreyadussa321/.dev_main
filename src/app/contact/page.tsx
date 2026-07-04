import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Book a Free Consultation",
  description:
    "Tell Patashala.Dev about your SaaS, LMS, CRM, full-stack, or training needs. We respond within one business day with an honest read on scope, timeline, and budget.",
  path: "/contact",
});

const infoRows = [
  { label: "Email", value: siteConfig.email, mono: true, href: `mailto:${siteConfig.email}` },
  { label: "Base", value: siteConfig.location, mono: false },
] as const;

const socialLinks = [
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "X", href: siteConfig.social.x },
  { label: "Instagram", href: siteConfig.social.instagram },
] as const;

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 pb-[90px] pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] -top-[25%] size-[700px] rounded-full bg-[radial-gradient(circle,rgba(44,197,178,0.13),transparent_65%)]"
      />
      <div className="relative mx-auto grid max-w-[1200px] items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-[72px]">
        {/* ── Left: intro + info ─────────────────────────────────── */}
        <div>
          <div className="eyebrow mb-5">Contact</div>
          <h1 className="font-display text-[clamp(44px,6vw,76px)] font-semibold leading-none tracking-[-0.03em]">
            Tell us what you&apos;re <span className="text-gradient">building</span>
          </h1>
          <p className="mt-[22px] max-w-[440px] text-[17px] leading-relaxed text-foreground/65">
            Product, platform or placement goals — we reply within one business day with an honest
            read on scope, timeline and budget.
          </p>

          <div className="mt-10 grid max-w-[400px] gap-3.5">
            {infoRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center gap-3.5 rounded-2xl border border-white/[0.09] bg-white/[0.02] px-5 py-[18px]"
              >
                <span className="w-16 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/45">
                  {row.label}
                </span>
                {"href" in row && row.href ? (
                  <a
                    href={row.href}
                    className="font-mono text-sm text-primary transition-colors hover:text-foreground"
                  >
                    {row.value}
                  </a>
                ) : (
                  <span className="text-[14.5px] text-foreground/80">{row.value}</span>
                )}
              </div>
            ))}
            <div className="flex items-center gap-3.5 rounded-2xl border border-white/[0.09] bg-white/[0.02] px-5 py-[18px]">
              <span className="w-16 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/45">
                Social
              </span>
              <span className="flex gap-3.5 text-sm">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/75 transition-colors hover:text-primary"
                  >
                    {s.label}
                  </a>
                ))}
              </span>
            </div>
          </div>
        </div>

        {/* ── Right: form card ───────────────────────────────────── */}
        <div className="relative rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-10">
          <Suspense fallback={<FormSkeleton />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

/** Lightweight loading state while the client form hydrates. */
function FormSkeleton() {
  return (
    <div className="animate-pulse space-y-5" aria-hidden>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-12 rounded-xl bg-white/[0.05]" />
      ))}
      <div className="h-32 rounded-xl bg-white/[0.05]" />
      <div className="h-14 rounded-[14px] bg-white/[0.05]" />
    </div>
  );
}
