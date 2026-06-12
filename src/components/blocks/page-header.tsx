import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  badge?: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

/** Reusable hero header for interior pages. */
export function PageHeader({ badge, title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("glow-orbs relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40", className)}>
      <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" aria-hidden />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          {badge && <Badge className="mb-5">{badge}</Badge>}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap items-center justify-center gap-4">{children}</div>}
        </Reveal>
      </Container>
    </div>
  );
}
