"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * Animated count-up metric. Always renders 0 on the first (server + hydration)
 * render so SSR output matches the client; the animation — or an instant jump
 * when reduced motion is preferred — happens after mount.
 */
export function Counter({ to, suffix = "", duration = 1.6, className }: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    let frame: number;
    if (reduce) {
      // Skip the animation but still update after mount (hydration-safe).
      frame = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(frame);
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      // ease-out cubic
      setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
