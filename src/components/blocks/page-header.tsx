import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  badge?: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

/** Reusable hero header for interior pages, styled per the redesign prototype. */
export function PageHeader({ badge, title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("relative overflow-hidden px-6 pb-[72px] pt-44", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[30%] left-[30%] size-[700px] rounded-full bg-[radial-gradient(circle,rgba(44,197,178,0.13),transparent_65%)]"
      />
      <div className="relative mx-auto max-w-[1200px]">
        <Reveal>
          {badge && <div className="eyebrow mb-5">{badge}</div>}
          <h1 className="max-w-[980px] font-display text-[clamp(44px,7vw,88px)] font-semibold leading-[0.98] tracking-[-0.03em]">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-foreground/65">
              {description}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap items-center gap-3">{children}</div>}
        </Reveal>
      </div>
    </div>
  );
}
