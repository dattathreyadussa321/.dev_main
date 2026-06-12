"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full bg-primary/80"
    />
  );
}
