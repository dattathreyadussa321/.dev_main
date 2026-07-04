import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";

interface CtaSectionProps {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/** Reusable conversion block used at the bottom of most pages. */
export function CtaSection({
  title = "Let's build something your users will rely on",
  description = "Tell us about your product, platform, or training goals. We'll respond within one business day with an honest read on scope, timeline, and budget.",
  primaryLabel = "Book a consultation",
  primaryHref = "/contact",
  secondaryLabel = "Explore services",
  secondaryHref = "/services",
}: CtaSectionProps) {
  return (
    <div className="px-6 pb-8 pt-4">
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="rounded-[28px] border border-white/10 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(44,197,178,0.2),transparent_60%),#0B0D10] px-8 py-20 text-center">
          <h2 className="mx-auto max-w-3xl font-display text-[clamp(34px,5vw,60px)] font-semibold leading-[1.05]">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] leading-relaxed text-foreground/60">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={primaryHref}
              className="rounded-[14px] bg-primary px-[30px] py-4 font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(83,243,207,0.45)]"
            >
              {primaryLabel}
            </Link>
            <Link
              href={secondaryHref}
              className="rounded-[14px] border border-white/[0.18] px-[30px] py-4 font-medium text-foreground transition-colors hover:border-primary/50"
            >
              {secondaryLabel}
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
