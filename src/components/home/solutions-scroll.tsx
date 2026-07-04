"use client";

import * as React from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { solutions, type Solution } from "@/config/solutions";

gsap.registerPlugin(ScrollTrigger);

// ── Card ─────────────────────────────────────────────────────────────────────

function SolutionCard({ solution }: { solution: Solution }) {
  const Icon = solution.icon;
  return (
    <Link
      href={solution.href}
      className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-[0_0_32px_-8px_var(--primary)]">
        {/* Subtle glow blob on hover */}
        <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

        {/* Icon + tagline */}
        <div className="flex items-start justify-between gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 ring-1 ring-primary/20">
            <Icon className="size-5 text-primary" aria-hidden />
          </div>
          <span className="rounded-full border border-border px-3 py-1 text-right text-[11px] font-medium text-muted-foreground">
            {solution.tagline}
          </span>
        </div>

        {/* Title + description */}
        <h3 className="mt-6 text-xl font-bold tracking-tight text-foreground">{solution.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{solution.summary}</p>

        {/* Highlights */}
        <ul className="mt-6 grid grid-cols-2 gap-2">
          {solution.highlights.map((h) => (
            <li key={h} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Check className="size-3 shrink-0 text-success" aria-hidden />
              {h}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-gap duration-200 group-hover:gap-2.5">
          Explore <ArrowRight className="size-3.5" aria-hidden />
        </p>
      </article>
    </Link>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

/**
 * Premium horizontal-scroll solutions section.
 *
 * Desktop (≥ 768px): GSAP pins the section while vertical scroll drives the
 * card track horizontally — the Lenis/ScrollTrigger connection in LenisProvider
 * keeps it perfectly smooth.
 *
 * Mobile (< 768px): falls back to a responsive CSS grid — no GSAP, no pin.
 *
 * `gsap.matchMedia()` handles resize automatically and cleans up the animation
 * if the viewport drops below the breakpoint.
 */
export function SolutionsScroll() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const trackRef   = React.useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  React.useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track || prefersReduced) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const getScrollDist = () => track.scrollWidth - section.clientWidth;

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -getScrollDist(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollDist()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, section);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, [prefersReduced]);

  return (
    <>
      {/* ── Desktop: pinned horizontal scroll ─────────────────────────────── */}
      <section
        ref={sectionRef}
        aria-labelledby="solutions-heading"
        className="relative hidden overflow-hidden border-y border-border bg-surface md:block"
        style={{ height: "100svh" }}
      >
        {/* Fixed header — stays in place while track scrolls */}
        <div className="absolute left-0 right-0 top-0 z-10 px-[6vw] pb-6 pt-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Featured Solutions
          </p>
          <div className="flex items-end justify-between">
            <h2
              id="solutions-heading"
              className="max-w-lg text-3xl font-bold tracking-tight lg:text-4xl"
            >
              Platforms we've productized
            </h2>
            <p className="text-sm text-muted-foreground">
              Scroll to explore <span aria-hidden>→</span>
            </p>
          </div>
        </div>

        {/* Horizontal card track */}
        <div
          ref={trackRef}
          className="absolute top-0 flex h-full will-change-transform"
          style={{
            gap: "1.5rem",
            paddingTop: "160px",
            paddingBottom: "40px",
            paddingLeft: "6vw",
            paddingRight: "6vw",
            width: "max-content",
          }}
        >
          {solutions.map((solution) => (
            <div key={solution.id} className="w-[360px] shrink-0">
              <SolutionCard solution={solution} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Mobile: vertical grid fallback ────────────────────────────────── */}
      <section
        aria-labelledby="solutions-heading-mobile"
        className="border-y border-border bg-surface px-4 py-16 md:hidden sm:px-6"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          Featured Solutions
        </p>
        <h2
          id="solutions-heading-mobile"
          className="mb-10 text-3xl font-bold tracking-tight"
        >
          Platforms we've productized
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {solutions.slice(0, 4).map((solution) => (
            <SolutionCard key={solution.id} solution={solution} />
          ))}
        </div>
      </section>
    </>
  );
}
