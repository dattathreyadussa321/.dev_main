"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { processSteps } from "@/config/content";

gsap.registerPlugin(ScrollTrigger);

// ── Step component ────────────────────────────────────────────────────────────

type Step = (typeof processSteps)[number];

function TimelineStep({
  step,
  index,
  stepRef,
  nodeRef,
}: {
  step: Step;
  index: number;
  stepRef: (el: HTMLDivElement | null) => void;
  nodeRef: (el: HTMLDivElement | null) => void;
}) {
  const isEven = index % 2 === 0;
  return (
    <div
      ref={stepRef}
      className="relative flex items-start gap-6 opacity-0"
      style={{ transform: "translateY(28px)" }}
    >
      {/* Node — sits on the vertical line */}
      <div className="relative z-10 mt-1 shrink-0">
        <div
          ref={nodeRef}
          className="relative size-4 scale-0 rounded-full bg-primary shadow-[0_0_12px_2px_var(--primary)]"
        >
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
        </div>
      </div>

      {/* Content */}
      <div className={`pb-14 ${isEven ? "pr-0 lg:pr-[50%]" : "pr-0 lg:pl-0"}`}>
        <p className="mb-1 font-mono text-xs font-bold text-primary">{step.step}</p>
        <h3 className="text-xl font-bold tracking-tight text-foreground">{step.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

/**
 * Process section with a scroll-drawn vertical timeline.
 *
 * As the user scrolls through the section:
 *   1. A vertical line draws progressively (scaleY 0→1 via GSAP scrub)
 *   2. Each step node pops in (scale 0→1) with a back-ease
 *   3. Each step's text fades up into view
 *
 * Reduced-motion users see all steps already visible — no animation.
 */
export function ProcessTimeline() {
  const sectionRef  = React.useRef<HTMLElement>(null);
  const lineRef     = React.useRef<HTMLDivElement>(null);
  const stepRefs    = React.useRef<(HTMLDivElement | null)[]>([]);
  const nodeRefs    = React.useRef<(HTMLDivElement | null)[]>([]);
  const prefersReduced = useReducedMotion();

  // Initialise to correct state immediately — avoids flash of hidden steps
  // for reduced-motion users who never run the animations below.
  React.useEffect(() => {
    if (!prefersReduced) return;
    stepRefs.current.forEach((el) => {
      if (!el) return;
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    nodeRefs.current.forEach((el) => {
      if (el) el.style.transform = "scale(1)";
    });
  }, [prefersReduced]);

  React.useEffect(() => {
    const section = sectionRef.current;
    const line    = lineRef.current;
    if (!section || !line || prefersReduced) return;

    const ctx = gsap.context(() => {
      // 1. Draw the timeline line as you scroll through the section
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            end: "bottom 70%",
            scrub: 1,
          },
        },
      );

      // 2. Animate each step in sequence
      stepRefs.current.forEach((step, i) => {
        const node = nodeRefs.current[i];
        if (!step) return;

        // Text fade + slide up
        gsap.to(step, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        // Node pop-in
        if (node) {
          gsap.to(node, {
            scale: 1,
            duration: 0.45,
            ease: "back.out(2.5)",
            delay: 0.1,
            scrollTrigger: {
              trigger: step,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="process-heading"
      className="border-y border-border bg-surface"
    >
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            How we work
          </p>
          <h2
            id="process-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            A process built on weekly proof, not promises
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            From idea to launch — demos every week, no surprises at handover.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative pl-8">
          {/* Vertical line */}
          <div
            ref={lineRef}
            className="absolute bottom-0 left-2 top-0 w-px origin-top bg-gradient-to-b from-primary via-primary/60 to-transparent"
            style={{ transform: "scaleY(0)", transformOrigin: "top center" }}
            aria-hidden
          />

          {/* Steps */}
          {processSteps.map((step, i) => (
            <TimelineStep
              key={step.step}
              step={step}
              index={i}
              stepRef={(el) => { stepRefs.current[i] = el; }}
              nodeRef={(el) => { nodeRefs.current[i] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
