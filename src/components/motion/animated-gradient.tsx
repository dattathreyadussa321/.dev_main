"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedGradientProps {
  className?: string;
}

/**
 * A slow-animated gradient border/glow for CTAs and newsletter forms.
 * Uses a keyframe animation on background-position — GPU-friendly.
 */
export function AnimatedGradientBorder({ className }: AnimatedGradientProps) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "absolute inset-0 rounded-[inherit]",
        reduce ? "opacity-30" : "animate-gradient-spin opacity-40",
        className,
      )}
      aria-hidden
      style={{
        background: "linear-gradient(90deg, var(--primary), var(--accent), var(--secondary), var(--primary))",
        backgroundSize: "300% 100%",
        animation: reduce ? undefined : "gradientShift 4s linear infinite",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: "1.5px",
      }}
    />
  );
}

/**
 * Pulsing gradient glow dot — subtle background accent.
 */
export function GlowDot({
  color = "var(--primary)",
  size = 400,
  className,
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
      style={{ width: size, height: size, background: color, opacity: 0.12 }}
      animate={reduce ? {} : { scale: [1, 1.15, 1], opacity: [0.12, 0.18, 0.12] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    />
  );
}
