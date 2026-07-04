import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-[20px] border text-card-foreground", {
  variants: {
    variant: {
      default: "border-border bg-white/[0.03]",
      glass: "glass",
      elevated: "border-border bg-card",
      interactive:
        "border-border bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:bg-primary/[0.04]",
      gradient:
        "border-primary/25 bg-[linear-gradient(120deg,#0C1512,#0A0E14)]",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: { variant: "default", padding: "md" },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, padding, ...props }: CardProps) {
  return <div className={cn(cardVariants({ variant, padding }), className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-semibold tracking-tight", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm leading-relaxed text-muted-foreground", className)} {...props} />;
}
