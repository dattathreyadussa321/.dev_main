import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { EkkalavyaSection } from "@/components/ekkalavya/ekkalavya-section";
import { pageMetadata, servicesJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services — SaaS, Full-Stack, LMS, CRM, EdTech & UI/UX Development",
  description:
    "Six engineering services for businesses — SaaS application development, full-stack web apps, custom LMS and CRM, EdTech products, UI/UX and frontend — plus Ekkalavya, our placement-readiness platform for students.",
  path: "/services",
});

/* ── Prototype content (source of truth: "Patashala Website Redesign") ── */

const services = [
  {
    num: "01",
    title: "SaaS Application Development",
    desc: "Multi-tenant SaaS platforms built for real business workflows — subscriptions, role-based access, billing, and dashboards that scale from first customer to thousands.",
    tags: ["Multi-tenancy", "Billing", "Analytics"],
  },
  {
    num: "02",
    title: "Full-Stack Web Apps",
    desc: "End-to-end web applications with modern frontends, robust APIs, and reliable databases — designed, built, tested, and shipped by one accountable team.",
    tags: ["React / Next.js", "APIs", "Databases"],
  },
  {
    num: "03",
    title: "Custom LMS Development",
    desc: "Learning management systems built around how your institute actually teaches — courses, batches, live classes, assessments, certificates, and payments in one platform.",
    tags: ["Live classes", "Assessments", "Payments"],
  },
  {
    num: "04",
    title: "Custom CRM Development",
    desc: "CRM systems tuned to education and services businesses — enquiry capture, admissions pipelines, counsellor workflows, follow-ups, and revenue visibility.",
    tags: ["Pipelines", "Automation", "WhatsApp-ready"],
  },
  {
    num: "05",
    title: "EdTech Product Development",
    desc: "Product engineering for education businesses — from online academies and assessment engines to full learning ecosystems with mobile-first experiences.",
    tags: ["Mobile-first", "Assessment engines", "Ecosystems"],
  },
  {
    num: "06",
    title: "UI/UX Design & Frontend",
    desc: "Interfaces that look premium and ship as production code — design systems, prototypes, and pixel-perfect React frontends from the same team.",
    tags: ["Design systems", "Prototypes", "React"],
  },
] as const;

const solutions = [
  {
    tag: "Advanced LMS",
    title: "Your institute's learning platform, owned outright",
    desc: "Courses, live + recorded classes, assessments, certificates, payments, and dashboards for every role.",
    href: "/solutions/lms",
  },
  {
    tag: "CRM for EdTech",
    title: "From first enquiry to confirmed admission",
    desc: "Lead capture, counsellor pipelines, follow-up reminders, batch and payment tracking.",
    href: "/solutions/crm",
  },
  {
    tag: "Agri Rover",
    title: "Farmer-first agricultural innovation",
    desc: "Rover-based field monitoring, data collection, and smart farming systems — our AgriTech track.",
    href: "/solutions/agritech",
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            servicesJsonLd(services.map((s) => ({ title: s.title, summary: s.desc }))),
          ),
        }}
      />

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden px-6 pb-[72px] pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[30%] left-[30%] size-[700px] rounded-full bg-[radial-gradient(circle,rgba(44,197,178,0.13),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-[1200px]">
          <div className="eyebrow mb-5">Services</div>
          <h1 className="max-w-[900px] font-display text-[clamp(48px,7.5vw,96px)] font-semibold leading-[0.98] tracking-[-0.03em]">
            Everything we <span className="text-outline">design,</span>{" "}
            <span className="text-gradient">build</span> &amp; run
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-foreground/65">
            Six engineering services for businesses — plus{" "}
            <a
              href="#ekkalavya"
              className="border-b border-primary/40 text-primary no-underline hover:border-primary"
            >
              Ekkalavya
            </a>
            , our own platform that makes students placement-ready.
          </p>
        </div>
      </div>

      {/* ── Services grid ──────────────────────────────────────────── */}
      <div className="px-6 pb-[90px] pt-6">
        <div className="mx-auto grid max-w-[1200px] gap-4 lg:grid-cols-2">
          {services.map((sv) => (
            <Reveal key={sv.num}>
              <div className="flex h-full flex-col gap-6 rounded-[22px] border border-white/[0.08] bg-white/[0.025] p-8 transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/[0.03] sm:flex-row">
                <div className="flex-none font-display text-[40px] font-bold leading-none text-outline-mint">
                  {sv.num}
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold">{sv.title}</div>
                  <div className="mt-2.5 text-[15px] leading-relaxed text-foreground/60">
                    {sv.desc}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {sv.tags.map((tg) => (
                      <span
                        key={tg}
                        className="rounded-full border border-white/[0.12] px-2.5 py-[5px] font-mono text-[11px] text-foreground/55"
                      >
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Ekkalavya ──────────────────────────────────────────────── */}
      <EkkalavyaSection />

      {/* ── Solutions strip ────────────────────────────────────────── */}
      <div className="px-6 pb-[90px] pt-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mb-11">
            <div className="eyebrow mb-3.5">Productized platforms</div>
            <h2 className="font-display text-[clamp(32px,4.5vw,52px)] font-semibold">
              Platforms we&apos;ve productized
            </h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {solutions.map((so) => (
              <Reveal key={so.tag}>
                <Link
                  href={so.href}
                  className="flex h-full flex-col gap-3 rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-7 no-underline transition-all hover:-translate-y-1 hover:border-accent/45"
                >
                  <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                    {so.tag}
                  </div>
                  <div className="font-display text-[21px] font-semibold text-foreground">
                    {so.title}
                  </div>
                  <div className="text-sm leading-relaxed text-foreground/55">{so.desc}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <div className="px-6 pb-8">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="rounded-[28px] border border-white/10 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(44,197,178,0.2),transparent_60%),#0B0D10] px-8 py-20 text-center">
            <h2 className="font-display text-[clamp(34px,5vw,60px)] font-semibold leading-[1.05]">
              Not sure which service fits?
            </h2>
            <p className="mx-auto mt-4 max-w-[440px] leading-relaxed text-foreground/60">
              One call. We&apos;ll give you an honest read on scope, timeline and budget.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-[14px] bg-primary px-[30px] py-4 font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(83,243,207,0.45)]"
            >
              Book a consultation
            </Link>
          </Reveal>
        </div>
      </div>
    </>
  );
}
