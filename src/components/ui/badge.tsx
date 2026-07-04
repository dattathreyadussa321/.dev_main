import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary dark:bg-primary/15",
        secondary: "bg-secondary/10 text-secondary dark:bg-secondary/15 dark:text-secondary",
        outline: "border border-border text-muted-foreground",
        glass: "glass text-foreground",
        success: "bg-success/10 text-success",
        /* Mono uppercase pill, e.g. hero "Consulting · Development · Training" */
        mono: "border border-primary/30 bg-primary/[0.06] px-3.5 py-2 font-mono text-[12px] font-normal uppercase tracking-[0.14em] text-primary",
        /* Solid mint tag, e.g. "New · Flagship platform" */
        solid:
          "bg-primary px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-primary-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
