import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Boxes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { PageHeader } from "@/components/blocks/page-header";
import { CtaSection } from "@/components/blocks/cta-section";
import { services } from "@/config/services";
import { solutions } from "@/config/solutions";
import { pageMetadata, servicesJsonLd } from "@/lib/seo";

// Productized solutions surfaced as clickable cards on the Services page.
const lms = solutions.find((s) => s.id === "lms")!;
const crm = solutions.find((s) => s.id === "crm")!;

const solutionCards = [
  {
    title: "Solutions",
    summary:
      "Explore the full range of productized platforms we build — LMS, CRM, SaaS foundations, training operations, and more.",
    href: "/solutions",
    icon: Boxes,
    highlights: ["Domain-deep platforms", "Owned outright", "Production-ready"],
  },
  {
    title: lms.title,
    summary: lms.summary,
    href: lms.href,
    icon: lms.icon,
    highlights: lms.highlights,
  },
  {
    title: crm.title,
    summary: crm.summary,
    href: crm.href,
    icon: crm.icon,
    highlights: crm.highlights,
  },
];

export const metadata: Metadata = pageMetadata({
  title: "Services — SaaS, LMS, CRM & Full-Stack Development",
  description:
    "SaaS application development, custom LMS and CRM platforms, EdTech products, UI/UX design, API development, MVPs, modernization, and cloud deployment — production-ready, end to end.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd([...services])) }}
      />

      <PageHeader
        badge="Services"
        title={
          <>
            Software services, <span className="text-gradient">end to end</span>
          </>
        }
        description="One accountable team for strategy, design, development, and operations. Every service below ships as production code — typed, tested, documented, and deployed."
      >
        <Button asChild size="lg">
          <Link href="/contact">Book a Consultation</Link>
        </Button>
      </PageHeader>

      <Section className="pt-4 sm:pt-4 lg:pt-4">
        <Container>
          <div className="space-y-10">
            {services.map((service, i) => (
              <Reveal key={service.id}>
                <Card
                  id={service.id}
                  variant="elevated"
                  padding="lg"
                  className="scroll-mt-28 lg:p-10"
                >
                  <div className="grid gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-7">
                      <div className="flex items-center gap-4">
                        <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/10">
                          <service.icon className="size-6 text-primary" aria-hidden />
                        </div>
                        <Badge variant="outline">{String(i + 1).padStart(2, "0")}</Badge>
                      </div>
                      <CardTitle className="mt-5 text-2xl">{service.title}</CardTitle>
                      <CardDescription className="mt-3 text-base">{service.summary}</CardDescription>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {service.deliverables.map((d) => (
                          <Badge key={d} variant="secondary">
                            {d}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        What you get
                      </p>
                      <ul className="mt-4 space-y-3">
                        {service.outcomes.map((o) => (
                          <li key={o} className="flex items-start gap-2.5 text-sm leading-relaxed">
                            <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                            {o}
                          </li>
                        ))}
                      </ul>
                      <Button asChild variant="ghost" size="sm" className="mt-6 -ml-3 text-primary">
                        <Link href={`/contact?service=${service.id}`}>
                          Discuss this service <ArrowRight aria-hidden />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="surface" className="border-y border-border">
        <Container>
          <SectionHeader
            eyebrow="Productized platforms"
            title="Solutions, LMS & CRM"
            description="Beyond custom builds, we ship productized platforms you can own outright. Tap a card to explore the full platform."
          />
          <Reveal staggerChildren className="grid gap-6 md:grid-cols-3">
            {solutionCards.map((card) => (
              <RevealItem key={card.href}>
                <Link href={card.href} className="group block h-full focus:outline-none">
                  <Card
                    variant="interactive"
                    padding="lg"
                    className="h-full focus-visible:ring-2 focus-visible:ring-ring group-focus-visible:ring-2 group-focus-visible:ring-ring"
                  >
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15">
                      <card.icon className="size-6 text-primary" aria-hidden />
                    </div>
                    <CardTitle className="mt-5 text-xl">{card.title}</CardTitle>
                    <CardDescription className="mt-2">{card.summary}</CardDescription>
                    <ul className="mt-5 space-y-2">
                      {card.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Check className="size-3.5 shrink-0 text-success" aria-hidden />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Explore {card.title}
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </Card>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CtaSection
        title="Not sure which service fits?"
        description="Book a free consultation. We'll map your goals to the right engagement — and tell you honestly if a smaller scope would serve you better."
      />
    </>
  );
}
