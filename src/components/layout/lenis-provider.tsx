"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";

// Register once at module level — idempotent, safe across hot reloads
gsap.registerPlugin(ScrollTrigger);

/**
 * Initialises Lenis smooth scroll and connects it to GSAP's ticker so that
 * every ScrollTrigger animation scrubs in sync with the Lenis virtual scroll.
 *
 * Skipped entirely for users who prefer reduced motion — they get native scroll
 * and all GSAP ScrollTrigger animations still fire (just without smooth easing).
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();

  React.useEffect(() => {
    if (prefersReduced) {
      // ScrollTrigger still works; just no smooth-scroll wrapper
      ScrollTrigger.refresh();
      return;
    }

    let cleanup: (() => void) | undefined;

    // Dynamic import keeps Lenis out of the SSR bundle entirely
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        lerp: 0.09,           // smoothness factor (lower = smoother)
        wheelMultiplier: 1,
        touchMultiplier: 2,
        autoRaf: false,       // GSAP ticker drives raf manually
      });

      // Keep GSAP ScrollTrigger in sync with Lenis virtual scroll position
      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        lenis.destroy();
        gsap.ticker.remove(tick);
      };
    });

    return () => cleanup?.();
  }, [prefersReduced]);

  return <>{children}</>;
}
