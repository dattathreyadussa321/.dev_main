"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

/**
 * Shared animation presets used across the site.
 * Reduced motion is handled globally via <MotionConfig reducedMotion="user">
 * in Providers — transform animations are disabled for those users while the
 * markup stays identical between server and client (hydration-safe).
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.65, 0.36, 1] } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger direct children instead of animating as one block. */
  staggerChildren?: boolean;
  delay?: number;
  as?: "div" | "ul" | "section";
}

/** Scroll-triggered fade-up reveal. */
export function Reveal({
  children,
  className,
  staggerChildren = false,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerChildren ? stagger : fadeUp}
      transition={{ delay }}
    >
      {children}
    </Comp>
  );
}

/** Child item for use inside a staggered <Reveal staggerChildren>. */
export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Comp = motion[as];
  return (
    <Comp className={className} variants={fadeUp}>
      {children}
    </Comp>
  );
}
