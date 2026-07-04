"use client";

import * as React from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── Magnetic button ───────────────────────────────────────────────────────────

/**
 * The magnetic effect works by listening to mousemove on a generous wrapper
 * div (~80px padding around the button). When the cursor enters the wrapper
 * the button nudges toward the cursor (35% of the cursor offset). On leave,
 * it snaps back with an elastic ease.
 *
 * Touch devices never see the magnetic effect; the button still works normally.
 */
function MagneticButton() {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const btnRef     = React.useRef<HTMLAnchorElement>(null);
  const prefersReduced = useReducedMotion();

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width  / 2);
      const y = e.clientY - (rect.top  + rect.height / 2);
      gsap.to(btnRef.current, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.5,
        ease: "power2.out",
      });
    },
    [prefersReduced],
  );

  const onMouseLeave = React.useCallback(() => {
    if (!btnRef.current) return;
    gsap.to(btnRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    /* Wrapper gives a generous magnetic catch radius */
    <div
      ref={wrapperRef}
      className="inline-flex items-center justify-center p-10"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <Link
        ref={btnRef}
        href="/training"
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-[0_0_28px_-4px_var(--primary)] transition-shadow duration-300 hover:shadow-[0_0_40px_-2px_var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {/* Sliding shimmer on hover */}
        <span
          className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/15 transition-transform duration-500 group-hover:translate-x-full"
          aria-hidden
        />
        Explore Training Programs
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
      </Link>
    </div>
  );
}

// ── Background animation ──────────────────────────────────────────────────────

/** Animated gradient orbs that drift slowly in the section background. */
function BackgroundOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-32 top-1/4 size-96 rounded-full bg-primary/10 blur-[80px] animate-[float_9s_ease-in-out_infinite]" />
      <div className="absolute -right-20 bottom-1/4 size-80 rounded-full bg-secondary/10 blur-[80px] animate-[float_11s_ease-in-out_infinite_1.5s]" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 size-64 rounded-full bg-accent/8 blur-[60px] animate-[float_13s_ease-in-out_infinite_3s]" />
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

/**
 * Premium training CTA section.
 *
 * Features:
 * - Scroll-triggered reveal for headline + copy
 * - Magnetic button that follows the cursor
 * - Drifting gradient orbs in the background
 * - Subtle dot-grid overlay
 */
export function TrainingCta() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const headlineRef = React.useRef<HTMLHeadingElement>(null);
  const copyRef     = React.useRef<HTMLParagraphElement>(null);
  const statsRef    = React.useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  React.useEffect(() => {
    const section  = sectionRef.current;
    const headline = headlineRef.current;
    const copy     = copyRef.current;
    const stats    = statsRef.current;
    if (!section || prefersReduced) return;

    const ctx = gsap.context(() => {
      const targets = [headline, copy, stats].filter(Boolean);
      gsap.from(targets, {
        opacity: 0,
        y: 36,
        stagger: 0.14,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="training-cta-heading"
      className="relative isolate overflow-hidden border-y border-border bg-card py-28 sm:py-36"
    >
      {/* Background orbs */}
      <BackgroundOrbs />

      {/* Dot grid overlay */}
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.06] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        {/* Eyebrow */}
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
          Patashala Academy
        </p>

        {/* Headline */}
        <h2
          ref={headlineRef}
          id="training-cta-heading"
          className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
        >
          Train with engineers who{" "}
          <span className="text-gradient">ship production code</span>
        </h2>

        {/* Supporting copy */}
        <p
          ref={copyRef}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Our programs are run by the same team that builds client platforms.
          You learn Git, code review, deployments, and real product workflows —
          not slides. Job-ready from day one.
        </p>

        {/* Quick stats */}
        <div
          ref={statsRef}
          className="mx-auto mt-10 grid max-w-sm grid-cols-3 gap-6"
        >
          {[
            { value: "30+", label: "Programs" },
            { value: "100%", label: "Project-based" },
            { value: "Live", label: "Mentorship" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Magnetic CTA button */}
        <div className="flex justify-center">
          <MagneticButton />
        </div>

        <p className="mt-2 text-xs text-muted-foreground">
          No prior degree required · Practical from day one
        </p>
      </div>
    </section>
  );
}
