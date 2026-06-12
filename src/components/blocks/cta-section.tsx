import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/section";
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
  primaryLabel = "Book a Consultation",
  primaryHref = "/contact",
  secondaryLabel = "Explore Services",
  secondaryHref = "/services",
}: CtaSectionProps) {
  return (
    <Section className="pb-24">
      <Container>
        <Reveal>
          <div className="glow-orbs relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-xl sm:px-12 sm:py-20">
            <div className="bg-grid absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,black,transparent)]" aria-hidden />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href={primaryHref}>
                    <CalendarCheck aria-hidden /> {primaryLabel}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={secondaryHref}>
                    {secondaryLabel} <ArrowRight aria-hidden />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
