"use client";

import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { LenisProvider } from "./lenis-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      {/* reducedMotion="user" disables transform animations for prefers-reduced-motion
          users without changing rendered markup (hydration-safe). */}
      <MotionConfig reducedMotion="user">
        <LenisProvider>{children}</LenisProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
