import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ekkalavyaUrl } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Software Training with Real Projects — Full-Stack, React, Next.js & More",
  description:
    "Industry-practical software training from working engineers: frontend, backend, full-stack, JavaScript, React, Next.js, Node.js, PostgreSQL, UI/UX, Git, real-world projects, and interview readiness.",
  path: "/training",
});

/* ── Prototype content (source of truth: "Patashala Website Redesign") ── */

const pillars = [
  {
    num: "01",
    title: "Learning by building",
    desc: "Every track is project-driven. You write code from the first session and finish with work you can show.",
  },
  {
    num: "02",
    title: "Industry workflows",
    desc: "Git, code review, tickets, deployment — the same workflows our consulting team uses on client projects.",
  },
  {
    num: "03",
    title: "Working engineers",
    desc: "Your mentors ship production SaaS, LMS and CRM platforms during the day. Answers from shipped systems, not slides.",
  },
  {
    num: "04",
    title: "Job-readiness built in",
    desc: "Interview prep, portfolio reviews and communication practice are part of the program — not an afterthought.",
  },
] as const;

const tracks = [
  {
    num: "/01",
    title: "Full-Stack Development",
    meta: "React · Node · SQL · Deploys",
    desc: "Frontend to database to production. Build and ship a real multi-user application end to end.",
  },
  {
    num: "/02",
    title: "Frontend Engineering",
    meta: "React · Design systems · APIs",
    desc: "Pixel-perfect, production-grade interfaces — components, state, performance and real code review.",
  },
  {
    num: "/03",
    title: "Backend & APIs",
    meta: "Node · Databases · Auth · Cloud",
    desc: "Robust APIs, data modelling, authentication and deployment with monitoring and backups.",
  },
  {
    num: "/04",
    title: "Placement Bootcamp",
    meta: "DSA · Aptitude · Interviews",
    desc: "A focused sprint pairing live sessions with full Ekkalavya Premium access until you're placed.",
  },
] as const;

export default function TrainingPage() {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden px-6 pb-[72px] pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[30%] right-[10%] size-[700px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.12),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-[1200px]">
          <div className="eyebrow mb-5">Patashala Academy</div>
          <h1 className="max-w-[980px] font-display text-[clamp(48px,7.5vw,96px)] font-semibold leading-[0.98] tracking-[-0.03em]">
            Learn the way <span className="text-gradient">shipping teams</span> work
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-foreground/65">
            Project-driven tracks taught by engineers who build production SaaS, LMS and CRM
            platforms during the day. Code from session one; finish with work you can defend in
            interviews.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact?service=training"
              className="rounded-[14px] bg-primary px-[26px] py-[15px] text-[15px] font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(83,243,207,0.4)]"
            >
              Apply for a track →
            </Link>
            <a
              href={ekkalavyaUrl}
              className="rounded-[14px] border border-white/[0.18] px-[26px] py-[15px] text-[15px] font-medium text-foreground transition-colors hover:border-primary/50"
            >
              Self-paced? Try Ekkalavya
            </a>
          </div>
        </div>
      </div>

      {/* ── Pillars ────────────────────────────────────────────────── */}
      <div className="px-6 pb-[90px] pt-10">
        <div className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pl) => (
            <Reveal key={pl.num}>
              <div className="flex h-full flex-col gap-3 rounded-[20px] border border-white/[0.08] bg-white/[0.025] p-[26px] transition-all hover:-translate-y-1 hover:border-primary/40">
                <div className="font-display text-[30px] font-bold text-outline-mint">{pl.num}</div>
                <div className="font-display text-[19px] font-semibold">{pl.title}</div>
                <div className="text-sm leading-relaxed text-foreground/55">{pl.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Tracks ─────────────────────────────────────────────────── */}
      <div className="px-6 pb-24">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="mb-11">
            <div className="eyebrow mb-3.5">Training tracks</div>
            <h2 className="font-display text-[clamp(32px,4.5vw,52px)] font-semibold">
              Pick your track
            </h2>
          </Reveal>
          <div className="grid gap-3">
            {tracks.map((t) => (
              <Reveal key={t.num}>
                <div className="grid items-center gap-4 rounded-[18px] border border-white/[0.08] bg-white/[0.02] px-7 py-[26px] transition-colors hover:border-primary/45 hover:bg-primary/[0.03] lg:grid-cols-[56px_1.1fr_1.6fr_auto] lg:gap-6">
                  <div className="font-mono text-[13px] text-foreground/40">{t.num}</div>
                  <div>
                    <div className="font-display text-[21px] font-semibold">{t.title}</div>
                    <div className="mt-1.5 font-mono text-[11.5px] text-primary">{t.meta}</div>
                  </div>
                  <div className="text-[14.5px] leading-relaxed text-foreground/60">{t.desc}</div>
                  <Link
                    href="/contact?service=training"
                    className="justify-self-start whitespace-nowrap rounded-[11px] border border-primary/35 px-5 py-[11px] text-sm font-bold text-primary transition-colors hover:bg-primary/10 lg:justify-self-end"
                  >
                    Apply →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Ekkalavya cross-sell ───────────────────────────────────── */}
      <div className="px-6 pb-24">
        <Reveal className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 rounded-3xl border border-primary/25 bg-[linear-gradient(120deg,#0C1512,#0A0E14)] px-8 py-10 sm:px-11">
          <div className="max-w-[620px]">
            <div className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
              Prefer self-paced?
            </div>
            <div className="font-display text-[clamp(24px,3vw,34px)] font-semibold">
              Ekkalavya: 24 placement features, from ₹0
            </div>
            <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/60">
              Resume, DSA practice, AI mock interviews, mentors and job tracking — free to start,
              ₹399/mo Starter, ₹899/mo unlimited.
            </p>
          </div>
          <a
            href={ekkalavyaUrl}
            className="whitespace-nowrap rounded-[14px] bg-primary px-[26px] py-[15px] text-[15px] font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(83,243,207,0.4)]"
          >
            Explore Ekkalavya →
          </a>
        </Reveal>
      </div>
    </>
  );
}
