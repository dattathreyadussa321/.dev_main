import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { PageHeader } from "@/components/blocks/page-header";
import { CtaSection } from "@/components/blocks/cta-section";
import { solutions } from "@/config/solutions";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Solutions — Advanced LMS, EdTech CRM, SaaS & AgriTech",
  description:
    "Productized platforms from Patashala.Dev: advanced LMS, CRM for EdTech, multi-tenant SaaS foundations, training management platforms, role-based dashboards, and the Agri Rover AgriTech innovation track.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        badge="Solutions"
        title={
          <>
            Platforms shaped by <span className="text-gradient">domain depth</span>
          </>
        }
        description="We've gone deep where it matters: education technology, SaaS foundations, training operations, and agricultural innovation. These are the platforms we know inside out."
      />

      <Section className="pt-4 sm:pt-4 lg:pt-4">
        <Container>
          <Reveal staggerChildren className="grid gap-6 md:grid-cols-2">
            {solutions.map((solution) => (
              <RevealItem key={solution.id}>
                <Card
                  id={solution.id === "training-platforms" || solution.id === "dashboards" ? solution.id : undefined}
                  variant="interactive"
                  padding="lg"
                  className="h-full scroll-mt-28"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15">
                      <solution.icon className="size-6 text-primary" aria-hidden />
                    </div>
                    <Badge variant="outline" className="text-right">
                      {solution.tagline}
                    </Badge>
                  </div>
                  <CardTitle className="mt-5 text-xl">{solution.title}</CardTitle>
                  <CardDescription className="mt-2">{solution.summary}</CardDescription>
                  <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {solution.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Check className="size-3.5 shrink-0 text-success" aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="ghost" size="sm" className="-ml-3 mt-5 text-primary">
                    <Link href={solution.href}>
                      Explore {solution.title} <ArrowRight aria-hidden />
                    </Link>
                  </Button>
                </Card>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section tone="surface" className="border-y border-border">
        <Container>
          <SectionHeader
            eyebrow="Every role, one platform"
            title="Dashboards for every stakeholder"
            description="Students, trainers, counsellors, admins, and institute owners each get a focused view — built into every LMS, CRM, and training platform we ship."
          />
          <Reveal staggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                role: "Student",
                points: ["Enrolled courses & progress", "Upcoming live classes", "Assignments & scores", "Certificates"],
              },
              {
                role: "Trainer",
                points: ["Batch & class management", "Materials & recordings", "Grading workflows", "Student progress"],
              },
              {
                role: "Admin",
                points: ["Users, courses & batches", "Payments & receipts", "Platform analytics", "Role permissions"],
              },
              {
                role: "Institute Owner",
                points: ["Revenue dashboards", "Conversion funnels", "Trainer performance", "Growth reports"],
              },
            ].map((d) => (
              <RevealItem key={d.role}>
                <Card className="h-full">
                  <CardTitle className="text-base">{d.role} Dashboard</CardTitle>
                  <ul className="mt-4 space-y-2.5">
                    {d.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Card>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CtaSection
        title="Which platform would change your business?"
        description="Tell us how your institute, startup, or farm operation works today. We'll show you what the right platform looks like — and what it takes to build it."
      />
    </>
  );
}
