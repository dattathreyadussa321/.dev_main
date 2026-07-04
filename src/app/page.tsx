import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { HeroScene } from "@/components/three/hero-scene";
import { Faq } from "@/components/blocks/faq";
import { ekkalavyaUrl } from "@/config/site";
import { pageMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Build, Launch & Scale Modern Software — SaaS, LMS, CRM & Training",
  description:
    "Patashala.Dev designs and develops production-ready SaaS applications, LMS platforms, CRM systems, and full-stack web apps — and runs practical software training programs for modern businesses and EdTech teams.",
  path: "/",
});

/* ── Prototype content (source of truth: "Patashala Website Redesign") ── */

const stats = [
  { value: "12+", label: "Programs & training tracks" },
  { value: "40+", label: "Platform builds & engagements" },
  { value: "24", label: "Ekkalavya placement features" },
  { value: "100%", label: "Project-based learning" },
] as const;

const marqueeItems = ["SaaS", "LMS", "CRM", "Training", "Ekkalavya", "Agri Rover", "Analytics", "Cloud"] as const;

const services = [
  {
    num: "/01",
    title: "SaaS Development",
    desc: "Multi-tenant platforms with subscriptions, role-based access, billing and dashboards that scale from first customer to thousands.",
  },
  {
    num: "/02",
    title: "Full-Stack Web Apps",
    desc: "Modern frontends, robust APIs and reliable databases — designed, built, tested and shipped by one accountable team.",
  },
  {
    num: "/03",
    title: "Custom LMS",
    desc: "Learning systems built around how your institute actually teaches — courses, live classes, assessments, certificates, payments.",
  },
  {
    num: "/04",
    title: "Custom CRM",
    desc: "Enquiry capture, admissions pipelines, counsellor workflows, follow-ups and revenue visibility for education businesses.",
  },
  {
    num: "/05",
    title: "EdTech Products",
    desc: "From online academies and assessment engines to full learning ecosystems with mobile-first experiences.",
  },
  {
    num: "/06",
    title: "UI/UX + Frontend",
    desc: "Interfaces that look premium and ship as production code — design systems, prototypes, pixel-perfect React.",
  },
] as const;

const process = [
  { num: "01", title: "Discover", desc: "Workflow, users and success metrics mapped before any code. Clear scope, honest estimates." },
  { num: "02", title: "Design", desc: "Wireframes, UI and a clickable prototype — approve the experience before development." },
  { num: "03", title: "Build", desc: "Weekly demo-driven sprints with a typed, tested codebase in a staging environment." },
  { num: "04", title: "Launch", desc: "Production deploy with monitoring, backups and performance checks. With you, not at you." },
  { num: "05", title: "Scale", desc: "Post-launch iteration, roadmaps and maintenance — a long-term engineering partner." },
] as const;

const academy = [
  { num: "01", title: "Learning by building", desc: "Code from the first session; finish with work you can show in interviews." },
  { num: "02", title: "Industry workflows day one", desc: "Git, code review, tickets, deployment — real consulting workflows." },
  { num: "03", title: "Taught by working engineers", desc: "Mentors ship production SaaS, LMS and CRM during the day." },
  { num: "04", title: "Job-readiness built in", desc: "Interview prep, portfolio reviews and communication practice included." },
] as const;

const work = [
  {
    tag: "LMS Platform",
    title: "Advanced LMS for a multi-branch institute",
    desc: "From spreadsheets, WhatsApp groups and a generic video tool to one view of progress, attendance and fees.",
    grad: "linear-gradient(135deg,#0E2E29,#123A34 60%,#0A0E14)",
  },
  {
    tag: "EdTech CRM",
    title: "Admissions CRM for an education business",
    desc: "Enquiries from ads, walk-ins and referrals unified — no missed follow-ups, reliable conversion numbers.",
    grad: "linear-gradient(135deg,#1B1533,#241B45 60%,#0A0E14)",
  },
  {
    tag: "SaaS",
    title: "Multi-tenant SaaS from MVP to paying users",
    desc: "A founding team validated a B2B idea fast — without throwaway code they'd regret six months later.",
    grad: "linear-gradient(135deg,#0C2233,#10304A 60%,#0A0E14)",
  },
] as const;

const faqs = [
  {
    question: "What does Patashala.Dev actually do?",
    answer:
      "Three things, deliberately connected: we build production software (SaaS, LMS, CRM, full-stack platforms) for clients; we run practical, project-based training; and we invest in innovation projects like Agri Rover and Ekkalavya.",
  },
  {
    question: "What is Ekkalavya?",
    answer:
      "Our placement-readiness platform for students: 24 features covering resume, practice, mock interviews and job hunt. Free to start; Starter at ₹399/mo gives every feature 15 uses; Premium at ₹899/mo is unlimited.",
  },
  {
    question: "What makes your training different?",
    answer:
      "Every track is project-driven and taught by working engineers. You learn inside the same workflows our consulting team uses on client projects — Git, code review, tickets, deployment.",
  },
  {
    question: "How do engagements usually start?",
    answer:
      "A short consultation call. We map your workflow, users and success metrics, then respond with an honest read on scope, timeline and budget within one business day.",
  },
] as const;

/* Ekkalavya spotlight — floating numbered cells */
const ekkGrid = Array.from({ length: 12 }).map((_, i) => ({
  n: String(i * 2 + 1).padStart(2, "0"),
  delay: `${(i % 5) * 0.55}s`,
}));

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-36">
        <HeroScene />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[10%] -top-[20%] size-[720px] rounded-full bg-[radial-gradient(circle,rgba(44,197,178,0.16),transparent_65%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-[30%] -left-[10%] size-[640px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.1),transparent_65%)]"
        />

        <div className="relative mx-auto w-full max-w-[1200px]">
          <div className="mb-7">
            <Badge variant="mono">
              <span className="size-[7px] animate-pulse-slow rounded-full bg-primary" aria-hidden />
              Consulting · Development · Training
            </Badge>
          </div>
          <h1 className="font-display text-[clamp(64px,10.5vw,148px)] font-semibold leading-[0.94] tracking-[-0.03em]">
            <span className="block">Learn.</span>
            <span className="block text-outline">Build.</span>
            <span className="block text-gradient-tri">Deliver.</span>
          </h1>
          <div className="mt-9 flex flex-wrap items-end justify-between gap-8">
            <p className="max-w-[520px] text-[19px] leading-relaxed text-foreground/70">
              Production-ready SaaS, LMS &amp; CRM platforms — and{" "}
              <a
                href={ekkalavyaUrl}
                className="border-b border-primary/40 text-primary no-underline hover:border-primary"
              >
                Ekkalavya
              </a>
              , our 24-feature platform that gets students placement-ready.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={ekkalavyaUrl}
                className="inline-flex items-center gap-2.5 rounded-[14px] bg-primary px-7 py-4 font-bold text-primary-foreground shadow-[0_0_40px_rgba(83,243,207,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_60px_rgba(83,243,207,0.5)]"
              >
                Explore Ekkalavya <span className="font-mono">→</span>
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-[14px] border border-white/[0.18] bg-white/[0.03] px-7 py-4 font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/[0.06]"
              >
                Book a consultation
              </Link>
            </div>
          </div>

          {/* Stats grid */}
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-white/[0.08] bg-white/[0.08] lg:grid-cols-4">
            {stats.map((st) => (
              <div key={st.label} className="bg-card px-6 py-6">
                <div className="font-display text-4xl font-semibold text-primary">{st.value}</div>
                <div className="mt-1 text-[13px] text-foreground/55">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Marquee ────────────────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-white/[0.08] bg-surface py-[18px]">
        <div className="flex w-max animate-marquee">
          {Array.from({ length: 4 }).flatMap((_, rep) =>
            marqueeItems.map((m) => (
              <span
                key={`${rep}-${m}`}
                aria-hidden={rep > 0}
                className="inline-flex items-center gap-7 whitespace-nowrap pr-7 font-display text-[22px] font-medium text-foreground/70"
              >
                {m} <span className="text-secondary">✦</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* ── Services ───────────────────────────────────────────────── */}
      <div id="services" className="px-6 pb-10 pt-28">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow mb-4">01 — What we do</div>
              <h2 className="max-w-[640px] font-display text-[clamp(36px,5vw,58px)] font-semibold leading-[1.05]">
                Production software for real business workflows
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/30 px-5 py-3 text-[15px] font-medium text-primary transition-colors hover:bg-primary/[0.08]"
            >
              All services →
            </Link>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((sv) => (
              <Reveal key={sv.num}>
                <Link
                  href="/services"
                  className="flex min-h-[220px] flex-col gap-3.5 rounded-[20px] border border-white/[0.08] bg-white/[0.03] p-7 no-underline transition-all hover:-translate-y-1 hover:border-primary/45 hover:bg-primary/[0.04]"
                >
                  <div className="font-mono text-xs text-foreground/40">{sv.num}</div>
                  <div className="font-display text-[22px] font-semibold text-foreground">{sv.title}</div>
                  <div className="flex-1 text-[14.5px] leading-relaxed text-foreground/60">{sv.desc}</div>
                  <div className="text-[13px] font-bold text-primary">Learn more →</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Ekkalavya spotlight ────────────────────────────────────── */}
      <div className="px-6 py-20">
        <Reveal className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[28px] border border-primary/25 bg-[linear-gradient(135deg,#0C1512_0%,#0A0E14_55%,#120F1C_100%)] p-8 sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-[5%] -top-[40%] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(83,243,207,0.14),transparent_65%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute right-14 top-1/2 hidden -translate-y-1/2 grid-cols-4 gap-2.5 opacity-90 xl:grid"
          >
            {ekkGrid.map((cell) => (
              <div
                key={cell.n}
                className="flex size-[52px] animate-float items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.05] font-mono text-[11px] text-primary/75"
                style={{ animationDelay: cell.delay }}
              >
                {cell.n}
              </div>
            ))}
          </div>
          <div className="relative max-w-[560px]">
            <Badge variant="solid">New · Flagship platform</Badge>
            <h2 className="mt-5 font-display text-[clamp(40px,5.5vw,64px)] font-semibold leading-none">
              Ekkalavya
            </h2>
            <p className="mt-[18px] text-lg leading-relaxed text-foreground/70">
              24 features. One goal: <span className="font-bold text-primary">placed.</span> Resume
              to offer letter — practice, mock interviews, projects and mentors in one platform.
              Free to start, ₹399 to go serious.
            </p>
            <a
              href={ekkalavyaUrl}
              className="mt-8 inline-flex items-center gap-2.5 rounded-[14px] bg-primary px-[26px] py-[15px] font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(83,243,207,0.4)]"
            >
              See all 24 features →
            </a>
          </div>
        </Reveal>
      </div>

      {/* ── Process ────────────────────────────────────────────────── */}
      <div className="px-6 py-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mb-14">
            <div className="eyebrow mb-4">02 — How we work</div>
            <h2 className="max-w-[720px] font-display text-[clamp(36px,5vw,58px)] font-semibold leading-[1.05]">
              Weekly proof, <span className="text-outline">not promises</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {process.map((p) => (
              <Reveal key={p.num}>
                <div className="flex h-full flex-col gap-3 rounded-[18px] border border-white/[0.08] bg-white/[0.02] px-5 py-6 transition-colors hover:border-accent/50 hover:bg-accent/[0.05]">
                  <div className="font-display text-[32px] font-bold text-outline-violet">{p.num}</div>
                  <div className="font-display text-[19px] font-semibold">{p.title}</div>
                  <div className="text-[13.5px] leading-relaxed text-foreground/55">{p.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Training strip ─────────────────────────────────────────── */}
      <div className="px-6 pb-24 pt-10">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="grid items-center gap-12 rounded-[28px] border border-white/[0.08] bg-card p-8 sm:p-14 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="eyebrow mb-4">03 — Patashala Academy</div>
              <h2 className="font-display text-[clamp(32px,4vw,46px)] font-semibold leading-[1.1]">
                Training run by engineers who ship for clients
              </h2>
              <p className="mt-[18px] leading-relaxed text-foreground/60">
                You learn the way our consulting team works — Git, code review, deployments, and
                products you can defend in interviews.
              </p>
              <Link
                href="/training"
                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-primary/35 px-[22px] py-[13px] text-[15px] font-bold text-primary transition-colors hover:bg-primary/[0.08]"
              >
                Explore training →
              </Link>
            </div>
            <div className="grid gap-2.5">
              {academy.map((a) => (
                <div
                  key={a.num}
                  className="flex items-start gap-3.5 rounded-[14px] border border-white/[0.06] bg-white/[0.03] px-[18px] py-4"
                >
                  <span className="mt-[3px] font-mono text-xs text-primary">{a.num}</span>
                  <div>
                    <div className="text-[15px] font-bold">{a.title}</div>
                    <div className="mt-[3px] text-[13.5px] leading-normal text-foreground/55">
                      {a.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Selected work ──────────────────────────────────────────── */}
      <div className="px-6 pb-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mb-12">
            <div className="eyebrow mb-4">04 — Selected work</div>
            <h2 className="font-display text-[clamp(36px,5vw,58px)] font-semibold">
              Engagement snapshots
            </h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {work.map((w) => (
              <Reveal key={w.tag}>
                <div className="h-full overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02] transition-all hover:-translate-y-1 hover:border-primary/40">
                  <div className="relative h-[150px]" style={{ background: w.grad }}>
                    <span className="absolute left-3.5 top-3.5 rounded-full bg-foreground/95 px-2.5 py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-background">
                      {w.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="font-display text-[19px] font-semibold leading-tight">{w.title}</div>
                    <div className="mt-2.5 text-sm leading-relaxed text-foreground/55">{w.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <div className="px-6 pb-28">
        <div className="mx-auto max-w-[840px]">
          <Reveal className="mb-10 text-center">
            <div className="eyebrow mb-4">05 — FAQ</div>
            <h2 className="font-display text-[clamp(32px,4.5vw,48px)] font-semibold">
              Answers before you ask
            </h2>
          </Reveal>
          <Faq items={faqs} />
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <div className="px-6 pb-8">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(44,197,178,0.22),transparent_60%),#0B0D10] px-8 py-24 text-center">
            <h2 className="font-display text-[clamp(40px,6vw,72px)] font-semibold leading-[1.02] tracking-[-0.03em]">
              Let&apos;s build something
              <br />
              your users will <span className="text-gradient">rely on</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[480px] leading-relaxed text-foreground/60">
              Tell us about your product, platform, or placement goals. Honest read on scope,
              timeline and budget within one business day.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-[14px] bg-primary px-[30px] py-4 font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(83,243,207,0.45)]"
              >
                Book a consultation
              </Link>
              <Link
                href="/services"
                className="rounded-[14px] border border-white/[0.18] px-[30px] py-4 font-medium text-foreground transition-colors hover:border-primary/50"
              >
                Explore services
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
