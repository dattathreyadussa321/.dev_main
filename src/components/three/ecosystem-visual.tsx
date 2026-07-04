"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import { isWebGLAvailable } from "./three-utils";

const EcosystemScene = dynamic(
  () => import("./ecosystem-scene"),
  { ssr: false, loading: () => <EcosystemFallback /> },
);

const ECOSYSTEM_LABELS = [
  "SaaS",
  "LMS",
  "CRM",
  "Training",
  "Agri Rover",
  "Analytics",
  "Cloud",
] as const;

/** Lightweight CSS fallback — no WebGL dependency. */
function EcosystemFallback() {
  return (
    <div className="relative grid h-full w-full place-items-center" aria-hidden>
      <div className="relative size-64 sm:size-80">
        {[0, 1, 2].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border border-primary/20"
            style={{ inset: `${ring * 14}%` }}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary via-accent to-secondary opacity-80 blur-[1px]" />
        <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-2xl" />
        {ECOSYSTEM_LABELS.map((label, i) => {
          const angle = (i / ECOSYSTEM_LABELS.length) * Math.PI * 2 - Math.PI / 2;
          const r = 38 + (i % 3) * 7;
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

/** Catches Three.js renderer crashes and renders nothing (parent shows fallback). */
class ThreeErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? this.props.fallback : this.props.children;
  }
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
 * Hero ecosystem visual.
 *
 * Shows the Three.js scene on any device where WebGL (or WebGPU) is
 * available and the user hasn't requested reduced motion. Uses "low"
 * quality on mobile (fewer particles, lower DPR cap) for smooth
 * performance. Falls back to a pure-CSS visual otherwise.
 */
export function EcosystemVisual({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const small = useIsSmallScreen();
  const [webgl, setWebgl] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  // While detecting (null states), show the CSS fallback to avoid flash.
  // Once confirmed: show 3D if WebGL is available and motion is allowed.
  const show3D = webgl === true && !reduce;
  const quality = small ? "low" : "high";

  return (
    <div
      className={className}
      role="img"
      aria-label="Patashala.Dev product ecosystem: SaaS, LMS, CRM, Training, Agri Rover, Analytics, and Cloud connected to one core team"
    >
      {show3D ? (
        <ThreeErrorBoundary fallback={<EcosystemFallback />}>
          <EcosystemScene quality={quality} />
        </ThreeErrorBoundary>
      ) : (
        <EcosystemFallback />
      )}
    </div>
  );
}
