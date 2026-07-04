"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { LenisProvider } from "./lenis-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // Redesign is dark-only: force the dark theme so tokens never flip.
    <ThemeProvider attribute="class" forcedTheme="dark" defaultTheme="dark" disableTransitionOnChange>
      {/* reducedMotion="user" disables transform animations for prefers-reduced-motion
          users without changing rendered markup (hydration-safe). */}
      <MotionConfig reducedMotion="user">
        <LenisProvider>{children}</LenisProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
