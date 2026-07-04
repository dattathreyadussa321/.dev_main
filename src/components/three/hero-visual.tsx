"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { isWebGLAvailable } from "./three-utils";

gsap.registerPlugin(ScrollTrigger);

const HeroCanvas = dynamic(() => import("./hero-canvas"), { ssr: false });

// ── Error boundary ────────────────────────────────────────────────────────────

class HeroCanvasBoundary extends React.Component<
  { children: React.ReactNode },
  { errored: boolean }
> {
  state = { errored: false };
  static getDerivedStateFromError() {
    return { errored: true };
  }
  render() {
    return this.state.errored ? null : this.props.children;
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Full-bleed hero canvas wrapper.
 *
 * Positioned `absolute inset-0 z-0` inside the hero div. GSAP ScrollTrigger
 * (synced to Lenis via LenisProvider) drives both the canvas fade-out and the
 * scroll progress value that the Three.js scene reads each frame.
 */
export function HeroVisual() {
  const containerRef   = React.useRef<HTMLDivElement>(null);
  const scrollProgress = React.useRef(0); // 0→1 fed into the R3F scene
  const prefersReduced = useReducedMotion();
  const [webgl, setWebgl] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReduced) return;

    const ctx = gsap.context(() => {
      // Drive the 3D mesh scroll animation (0→1 as hero exits viewport)
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
      });

      // Fade canvas out in the last portion of the hero scroll
      gsap.fromTo(
        el,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "50% top",
            end: "85% top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [prefersReduced]);

  const show = webgl === true && !prefersReduced;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden
    >
      {show && (
        <HeroCanvasBoundary>
          <HeroCanvas scrollProgress={scrollProgress} />
        </HeroCanvasBoundary>
      )}
    </div>
  );
}
