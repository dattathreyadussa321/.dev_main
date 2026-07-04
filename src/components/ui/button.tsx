import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[14px] font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary font-bold text-primary-foreground shadow-[0_0_40px_rgba(83,243,207,0.3)] hover:shadow-[0_0_60px_rgba(83,243,207,0.5)] hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-secondary font-bold text-secondary-foreground shadow-[0_0_30px_rgba(44,197,178,0.25)] hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border border-white/20 bg-white/[0.03] text-foreground hover:border-primary/50 hover:bg-primary/[0.06]",
        mint: "border border-primary/35 bg-transparent font-bold text-primary hover:bg-primary/10",
        ghost: "text-foreground hover:bg-white/[0.06]",
        glass: "glass text-foreground hover:border-primary/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, children, ...props }, ref) => {
    // Lightweight `asChild`: clone the single child (e.g. a Next <Link>)
    // and merge button styling onto it instead of rendering a <button>.
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(buttonVariants({ variant, size }), child.props.className, className),
      });
    }
    return (
      <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
