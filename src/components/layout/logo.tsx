import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Patashala.Dev — Home"
      className={cn(
        "inline-flex shrink-0 items-baseline font-display text-xl font-semibold tracking-tight",
        className,
      )}
    >
      <span className="text-foreground">patashala</span>
      <span className="text-secondary">.dev</span>
    </Link>
  );
}
