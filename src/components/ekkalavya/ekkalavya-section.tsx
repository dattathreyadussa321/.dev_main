import { Reveal } from "@/components/motion/reveal";
import { ekkalavyaUrl } from "@/config/site";
import { cn } from "@/lib/utils";

/* ── Prototype content (source of truth: "Patashala Website Redesign") ── */

const tracks = [
  {
    phase: "Track A · Profile",
    name: "Stand out",
    color: "#53F3CF",
    headBg: "linear-gradient(135deg,rgba(83,243,207,.12),transparent)",
    items: [
      { n: "01", t: "AI Resume Builder" },
      { n: "02", t: "ATS Score Checker" },
      { n: "03", t: "LinkedIn Optimizer" },
      { n: "04", t: "GitHub Profile Review" },
      { n: "05", t: "Portfolio Builder" },
      { n: "06", t: "Guided Project Builds" },
    ],
  },
  {
    phase: "Track B · Practice",
    name: "Sharpen up",
    color: "#5EE0FF",
    headBg: "linear-gradient(135deg,rgba(94,224,255,.12),transparent)",
    items: [
      { n: "07", t: "DSA Practice Sheets" },
      { n: "08", t: "Coding Challenges" },
      { n: "09", t: "Aptitude Drills" },
      { n: "10", t: "Logical Reasoning" },
      { n: "11", t: "Verbal Ability" },
      { n: "12", t: "Company-Pattern Mock Tests" },
    ],
  },
  {
    phase: "Track C · Interview",
    name: "Face anyone",
    color: "#A78BFA",
    headBg: "linear-gradient(135deg,rgba(167,139,250,.12),transparent)",
    items: [
      { n: "13", t: "AI Mock Interviews" },
      { n: "14", t: "HR Question Bank" },
      { n: "15", t: "Group Discussion Rooms" },
      { n: "16", t: "Communication Practice" },
      { n: "17", t: "Company-wise Papers" },
      { n: "18", t: "Salary Negotiation Playbook" },
    ],
  },
  {
    phase: "Track D · Launch",
    name: "Get placed",
    color: "#FFC46B",
    headBg: "linear-gradient(135deg,rgba(255,196,107,.12),transparent)",
    items: [
      { n: "19", t: "Job & Internship Alerts" },
      { n: "20", t: "Application Tracker" },
      { n: "21", t: "1:1 Mentor Sessions" },
      { n: "22", t: "Peer Community" },
      { n: "23", t: "Course Certificates" },
      { n: "24", t: "Placement Analytics" },
    ],
  },
] as const;

const plans = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    per: "forever",
    tagline: "Taste the platform with limited features.",
    cta: "Start free",
    feats: [
      "Access to selected features",
      "Limited attempts per feature",
      "Peer community access",
      "No card required",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: "₹399",
    per: "/ month",
    tagline: "All 24 features — each usable up to 15 times a month.",
    cta: "Get Starter",
    feats: [
      "All 24 features unlocked",
      "15 uses per feature / month",
      "AI mock interviews & ATS checks",
      "Progress & placement tracking",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹899",
    per: "/ month",
    tagline: "Everything, unlimited. For the final sprint to your offer.",
    cta: "Go Premium",
    feats: [
      "All 24 features — unlimited use",
      "Unlimited AI mock interviews",
      "Priority 1:1 mentor slots",
      "Everything in Starter",
    ],
  },
] as const;

const highlightPlan = "starter";

const cubeFace =
  "absolute inset-0 flex items-center justify-center border-[1.5px] font-mono text-[13px] tracking-[0.14em]";

/**
 * Full Ekkalavya showcase for the Services page (`/services#ekkalavya`):
 * intro + CSS 3D cube, the 24 features in four tracks, and pricing.
 * Every conversion CTA is an external link to the Ekkalavya product.
 */
export function EkkalavyaSection() {
  return (
    <div
      id="ekkalavya"
      className="relative overflow-hidden border-y border-primary/15 bg-[linear-gradient(180deg,#08090B_0%,#0A1210_18%,#0A1210_82%,#08090B_100%)] px-6 py-24 scroll-mt-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_0%,rgba(83,243,207,0.14),transparent_65%)]"
      />

      <div className="relative mx-auto max-w-[1200px]">
        {/* Intro */}
        <div className="mb-20 grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground">
              <span className="size-1.5 animate-pulse-slow rounded-full bg-primary-foreground" aria-hidden />
              Flagship platform · For students
            </span>
            <h2 className="mt-6 font-display text-[clamp(52px,7vw,92px)] font-semibold leading-[0.96] tracking-[-0.03em]">
              Ekkalavya
            </h2>
            <p className="mt-2 font-display text-[clamp(20px,2.4vw,28px)] font-medium text-primary">
              24 features. One goal: placed.
            </p>
            <p className="mt-[22px] max-w-[520px] text-[17px] leading-relaxed text-foreground/65">
              Everything between &ldquo;final year&rdquo; and &ldquo;offer letter&rdquo; — resume,
              coding practice, aptitude, AI mock interviews, mentors and job tracking. Built by the
              same engineers who ship client platforms.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={ekkalavyaUrl}
                className="rounded-[14px] bg-primary px-[26px] py-[15px] text-[15px] font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(83,243,207,0.4)]"
              >
                Start free →
              </a>
              <a
                href="#ekk-features"
                className="rounded-[14px] border border-white/[0.18] px-[26px] py-[15px] text-[15px] font-medium text-foreground transition-colors hover:border-primary/50"
              >
                Browse features
              </a>
            </div>
          </Reveal>

          {/* CSS 3D cube */}
          <Reveal className="flex min-h-[340px] items-center justify-center [perspective:900px]">
            <div className="relative size-[190px] animate-spin3d [transform-style:preserve-3d]">
              <div
                className={cn(
                  cubeFace,
                  "border-primary/70 bg-primary/[0.06] font-display text-[56px] font-bold text-primary backdrop-blur-[2px] [transform:translateZ(95px)]",
                )}
              >
                24
              </div>
              <div className={cn(cubeFace, "border-primary/40 bg-primary/[0.04] text-primary/90 [transform:rotateY(90deg)_translateZ(95px)]")}>
                PRACTICE
              </div>
              <div className={cn(cubeFace, "border-primary/40 bg-primary/[0.04] text-primary/90 [transform:rotateY(180deg)_translateZ(95px)]")}>
                PLACED ✦
              </div>
              <div className={cn(cubeFace, "border-primary/40 bg-primary/[0.04] text-primary/90 [transform:rotateY(-90deg)_translateZ(95px)]")}>
                INTERVIEW
              </div>
              <div className={cn(cubeFace, "border-accent/45 bg-accent/[0.05] [transform:rotateX(90deg)_translateZ(95px)]")} />
              <div className={cn(cubeFace, "border-accent/45 bg-accent/[0.05] [transform:rotateX(-90deg)_translateZ(95px)]")} />
            </div>
          </Reveal>
        </div>

        {/* 24 features */}
        <Reveal
          className="mb-9 flex flex-wrap items-end justify-between gap-4 scroll-mt-28"
          as="div"
        >
          <h3
            id="ekk-features"
            className="font-display text-[clamp(28px,3.6vw,42px)] font-semibold"
          >
            All 24 features, four tracks
          </h3>
          <div className="font-mono text-xs text-foreground/50">
            Resume → Practice → Interview → Offer
          </div>
        </Reveal>
        <div className="mb-24 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {tracks.map((tr) => (
            <Reveal key={tr.phase}>
              <div className="overflow-hidden rounded-[20px] border border-white/[0.09] bg-[rgba(8,9,11,0.55)]">
                <div
                  className="border-b border-white/[0.08] px-5 py-[18px]"
                  style={{ background: tr.headBg }}
                >
                  <div
                    className="font-mono text-[10.5px] uppercase tracking-[0.16em]"
                    style={{ color: tr.color }}
                  >
                    {tr.phase}
                  </div>
                  <div className="mt-1 font-display text-xl font-semibold">{tr.name}</div>
                </div>
                <ul className="grid">
                  {tr.items.map((it) => (
                    <li
                      key={it.n}
                      className="flex items-center gap-3 border-b border-white/[0.05] px-5 py-[13px] transition-colors hover:bg-primary/[0.05]"
                    >
                      <span
                        className="w-5 flex-none font-mono text-[10.5px]"
                        style={{ color: tr.color }}
                      >
                        {it.n}
                      </span>
                      <span className="text-sm font-medium text-foreground/85">{it.t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Pricing */}
        <Reveal className="mb-11 text-center scroll-mt-28" as="div">
          <h3 id="ekk-pricing" className="font-display text-[clamp(28px,3.6vw,42px)] font-semibold">
            Pricing that students can actually afford
          </h3>
          <p className="mt-3 text-[15px] text-foreground/55">
            Start free. Upgrade when you&apos;re serious. Cancel anytime.
          </p>
        </Reveal>
        <div className="grid items-stretch gap-4 md:grid-cols-3">
          {plans.map((pl) => {
            const hot = pl.id === highlightPlan;
            return (
              <Reveal key={pl.id} className="h-full">
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl px-8 py-9",
                    hot
                      ? "border-[1.5px] border-primary/65 bg-[linear-gradient(180deg,rgba(83,243,207,0.09),rgba(83,243,207,0.02)_60%),#0B0F0E] shadow-[0_0_70px_rgba(83,243,207,0.14)]"
                      : "border border-white/10 bg-white/[0.02]",
                  )}
                >
                  {hot && (
                    <span className="absolute -top-[13px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-3.5 py-1.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
                      Most popular
                    </span>
                  )}
                  <div
                    className={cn(
                      "font-mono text-xs uppercase tracking-[0.14em]",
                      hot ? "text-primary" : "text-foreground/55",
                    )}
                  >
                    {pl.name}
                  </div>
                  <div className="mt-3.5 flex items-baseline gap-1.5">
                    <span className="font-display text-[52px] font-semibold tracking-[-0.02em]">
                      {pl.price}
                    </span>
                    <span className="text-sm text-foreground/50">{pl.per}</span>
                  </div>
                  <div className="mt-1.5 min-h-[42px] text-sm leading-normal text-foreground/60">
                    {pl.tagline}
                  </div>
                  <ul className="mb-7 mt-6 grid gap-[11px] text-left">
                    {pl.feats.map((ft) => (
                      <li
                        key={ft}
                        className="flex items-start gap-2.5 text-sm leading-normal text-foreground/80"
                      >
                        <span
                          className={cn("font-bold", hot ? "text-primary" : "text-foreground/45")}
                          aria-hidden
                        >
                          ✓
                        </span>
                        <span>{ft}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={ekkalavyaUrl}
                    className={cn(
                      "mt-auto rounded-xl px-5 py-3.5 text-center text-[15px] font-bold transition-transform hover:-translate-y-0.5",
                      hot
                        ? "bg-primary text-primary-foreground"
                        : "border border-white/[0.16] bg-white/[0.05] text-foreground",
                    )}
                  >
                    {pl.cta}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal as="div">
          <p className="mt-7 text-center font-mono text-xs text-foreground/45">
            Starter: every feature usable up to 15 times / month · Premium: unlimited everything
          </p>
        </Reveal>
      </div>
    </div>
  );
}
