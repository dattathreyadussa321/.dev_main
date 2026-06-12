import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { PageHeader } from "@/components/blocks/page-header";
import { CtaSection } from "@/components/blocks/cta-section";
import { services } from "@/config/services";
import { pageMetadata, servicesJsonLd } from "@/lib/seo";

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

      <CtaSection
        title="Not sure which service fits?"
        description="Book a free consultation. We'll map your goals to the right engagement — and tell you honestly if a smaller scope would serve you better."
      />
    </>
  );
}
