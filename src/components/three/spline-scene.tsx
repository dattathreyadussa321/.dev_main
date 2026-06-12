"use client";

import * as React from "react";
import Script from "next/script";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const SPLINE_URL = "https://prod.spline.design/PBQQBw8bfXDhBo7w/scene.splinecode";
const SPLINE_SCRIPT = "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";

// Cast the custom element tag to a React component so TypeScript accepts it
// without needing global JSX namespace augmentation (React 19 new-JSX-transform safe).
const SplineViewer = "spline-viewer" as unknown as React.ComponentType<{
  url?: string;
  "events-target"?: string;
  loading?: string;
  style?: React.CSSProperties;
}>;

// ── Solar-system orbit data ───────────────────────────────────────────────────
// r = orbit radius in px (safe at both size-64=256px and size-80=320px containers)
// duration = seconds for one full revolution
// startAngle = initial angular offset in degrees so planets start spread out
const ORBIT_NODES = [
  { label: "SaaS",       r: 68,  duration: 10, startAngle: 0   },
  { label: "LMS",        r: 92,  duration: 18, startAngle: 52  },
  { label: "CRM",        r: 76,  duration: 13, startAngle: 105 },
  { label: "Training",   r: 88,  duration: 21, startAngle: 210 },
  { label: "Agri Rover", r: 94,  duration: 27, startAngle: 280 },
  { label: "Analytics",  r: 72,  duration: 17, startAngle: 160 },
  { label: "Cloud",      r: 84,  duration: 23, startAngle: 330 },
] as const;

// Visual guide rings (px radii matching the node orbits)
const RING_PX = [72, 84, 94] as const;

function SceneFallback({ className }: { className?: string }) {
  const paused = useReducedMotion() ?? false;
  const playState = paused ? "paused" : "running";

  return (
    <div className={cn("relative grid h-full w-full place-items-center", className)} aria-hidden>
      <div className="relative size-64 sm:size-80">

        {/* Orbit path rings — centred by offsetting by their radius */}
        {RING_PX.map((r) => (
          <div
            key={r}
            className="absolute rounded-full border border-dashed border-primary/20"
            style={{
              width:  r * 2,
              height: r * 2,
              left:   `calc(50% - ${r}px)`,
              top:    `calc(50% - ${r}px)`,
            }}
          />
        ))}

        {/* Glow */}
        <div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-2xl" />

        {/* Central orb */}
        <motion.div
          className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary via-violet-500 to-indigo-400 shadow-lg shadow-primary/40 sm:size-16"
          animate={paused ? {} : { rotate: 360, scale: [1, 1.06, 1] }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale:  { duration: 3,  repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Orbiting planets — pure CSS so they always run */}
        {ORBIT_NODES.map(({ label, r, duration, startAngle }) => {
          // Negative delay starts the animation mid-cycle at the correct startAngle
          const delay = `-${(startAngle / 360) * duration}s`;
          return (
            <div
              key={label}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 0,
                height: 0,
                // Rotate around this element's own top-left corner = container centre
                transformOrigin: "0 0",
                animation: `orbit-cw ${duration}s linear infinite`,
                animationDelay: delay,
                animationPlayState: playState,
              }}
            >
              {/* Planet label — counter-spins so text stays upright */}
              <span
                style={{
                  position: "absolute",
                  // Place along the arm's X-axis at orbit radius
                  left: r,
                  top: 0,
                  animation: `orbit-label ${duration}s linear infinite`,
                  animationDelay: delay,
                  animationPlayState: playState,
                }}
                className="whitespace-nowrap rounded-full border border-border/50 bg-background/80 px-2.5 py-1 text-[10px] font-medium text-foreground shadow-sm backdrop-blur-sm sm:text-xs"
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface SplineSceneProps {
  className?: string;
}

export function SplineScene({ className }: SplineSceneProps) {
  const reduce = useReducedMotion();
  const [small, setSmall] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const useFull = small === false && !reduce;

  return (
    <div
      className={cn("relative h-full w-full", className)}
      role="img"
      aria-label="Patashala.Dev product ecosystem: SaaS, LMS, CRM, Training, Agri Rover, Analytics, and Cloud"
    >
      {!useFull ? (
        <SceneFallback />
      ) : (
        <>
          {/* Load the viewer script once; type="module" is set via the Script tag */}
          <Script src={SPLINE_SCRIPT} strategy="afterInteractive" />

          {/* Outer centres the scene; inner shrinks it ~15% relative to the hero column */}
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{ width: "82%", height: "82%" }}
            >
              {/* Thin theme-tinted ring so the scene feels integrated */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/10" />

              {/* spline-viewer renders into shadow DOM; background: transparent lets the
                  page background (dark/light) show through any unoccupied canvas area */}
              <SplineViewer
                url={SPLINE_URL}
                events-target="global"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  background: "transparent",
                  display: "block",
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
