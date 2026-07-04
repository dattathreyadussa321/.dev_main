import * as React from "react";
import { cn } from "@/lib/utils";

/** Page-width container with consistent gutters. */
export function Container({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)} {...props} />;
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Alternate background band to break up long pages. */
  tone?: "default" | "surface";
}

/** Vertical rhythm wrapper for page sections. */
export function Section({ className, tone = "default", ...props }: SectionProps) {
  return (
    <section
      className={cn("py-20 sm:py-24 lg:py-28", tone === "surface" && "bg-surface", className)}
      {...props}
    />
  );
}

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/** Reusable section heading block: eyebrow, title, supporting text. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl sm:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
