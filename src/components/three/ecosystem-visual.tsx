"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";

const EcosystemScene = dynamic(() => import("./ecosystem-scene"), {
  ssr: false,
  loading: () => <EcosystemFallback />,
});

const ECOSYSTEM_LABELS = [
  "SaaS",
  "LMS",
  "CRM",
  "Training",
  "Agri Rover",
  "Analytics",
  "Cloud",
] as const;

/** Lightweight CSS fallback for mobile / reduced motion / WebGL-less environments. */
function EcosystemFallback() {
  return (
    <div className="relative grid h-full w-full place-items-center" aria-hidden>
      <div className="relative size-64 sm:size-80">
        {/* concentric rings */}
        {[0, 1, 2].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border border-primary/20"
            style={{ inset: `${ring * 14}%` }}
          />
        ))}
        {/* core */}
        <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary via-accent to-secondary opacity-80 blur-[1px]" />
        <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-2xl" />
        {/* static nodes on rings */}
        {ECOSYSTEM_LABELS.map((label, i) => {
          const angle = (i / ECOSYSTEM_LABELS.length) * Math.PI * 2 - Math.PI / 2;
          const r = 38 + (i % 3) * 7; // percentage radius
          const x = 50 + Math.cos(angle) * r;
          const y = 50 + Math.sin(angle) * r;
          return (
            <span
              key={label}
              className="glass absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-2.5 py-1 text-[10px] font-medium text-foreground sm:text-xs"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function useIsSmallScreen() {
  const [small, setSmall] = React.useState<boolean | null>(null);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return small;
}

/**
 * Hero ecosystem visual. Renders the full Three.js scene on capable
 * desktop devices; a light CSS visual on mobile or with reduced motion.
 */
export function EcosystemVisual({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const small = useIsSmallScreen();
  // Until we know the viewport (first client render), show the fallback —
  // it's also the dynamic-import loading state, so there's no flash.
  const useFull = small === false && !reduce;

  return (
    <div className={className} role="img" aria-label="Patashala.Dev product ecosystem: SaaS, LMS, CRM, Training, Agri Rover, Analytics, and Cloud connected to one core team">
      {useFull ? <EcosystemScene /> : <EcosystemFallback />}
    </div>
  );
}
