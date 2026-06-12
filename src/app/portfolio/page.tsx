import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { PageHeader } from "@/components/blocks/page-header";
import { CtaSection } from "@/components/blocks/cta-section";
import { caseStudies } from "@/config/case-studies";
import { pageMetadata } from "@/lib/seo";
import { Check } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: "Portfolio & Case Studies — LMS, CRM, SaaS & AgriTech Work",
  description:
    "Engagement snapshots from Patashala.Dev: custom LMS platforms, EdTech CRMs, multi-tenant SaaS applications, full-stack modernizations, and the Agri Rover AgriTech innovation project.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        badge="Portfolio"
        title={
          <>
            Work that <span className="text-gradient">runs businesses</span>
          </>
        }
        description="Snapshots of the platforms we design, build, and operate. Engagements are anonymized and labeled honestly — we'd rather show you real patterns than invented logos."
      />

      <Section className="pt-4 sm:pt-4 lg:pt-4">
        <Container>
          <div className="space-y-10">
            {caseStudies.map((cs) => (
              <Reveal key={cs.id}>
                <Card id={cs.id} variant="elevated" padding="lg" className="scroll-mt-28 lg:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{cs.category}</Badge>
                    <Badge variant="outline">{cs.type}</Badge>
                  </div>
                  <CardTitle className="mt-5 text-2xl">{cs.title}</CardTitle>

                  <div className="mt-8 grid gap-8 lg:grid-cols-3">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        The challenge
                      </p>
                      <CardDescription className="mt-3 text-sm">{cs.challenge}</CardDescription>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Our approach
                      </p>
                      <CardDescription className="mt-3 text-sm">{cs.approach}</CardDescription>
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        The outcome
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {cs.results.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                            <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
                    {cs.stack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Your platform could be the next snapshot"
        description="Every engagement here started with one conversation about how a business actually works. Start yours."
      />
    </>
  );
}
