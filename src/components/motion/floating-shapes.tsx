"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

const SHAPES = [
  { size: 120, x: "8%", y: "12%", color: "var(--primary)", opacity: 0.06, delay: 0 },
  { size: 80, x: "88%", y: "8%", color: "var(--secondary)", opacity: 0.07, delay: 1.2 },
  { size: 160, x: "75%", y: "60%", color: "var(--accent)", opacity: 0.05, delay: 0.6 },
  { size: 60, x: "15%", y: "72%", color: "var(--secondary)", opacity: 0.08, delay: 1.8 },
  { size: 100, x: "50%", y: "85%", color: "var(--primary)", opacity: 0.04, delay: 0.9 },
] as const;

/**
 * Decorative floating blobs for hero backgrounds.
 * Fully hidden for reduced-motion users — purely decorative.
 */
export function FloatingShapes() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {SHAPES.map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            borderRadius: "60% 40% 70% 30% / 50% 60% 40% 55%",
            background: s.color,
            opacity: s.opacity,
            filter: "blur(40px)",
          }}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 8 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
