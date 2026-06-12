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
import { trainingTracks, trainingPrinciples } from "@/config/training";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Software Training with Real Projects — Full-Stack, React, Next.js & More",
  description:
    "Industry-practical software training from working engineers: frontend, backend, full-stack, JavaScript, React, Next.js, Node.js, PostgreSQL, UI/UX, Git, real-world projects, and interview readiness.",
  path: "/training",
});

const journey = [
  { step: "01", title: "Foundations by building", text: "Core concepts taught through code you write in the first session — never passive video marathons." },
  { step: "02", title: "Real project briefs", text: "Build LMS modules, CRM pipelines, and SaaS dashboards — the same product shapes our consulting team ships." },
  { step: "03", title: "Industry workflows", text: "Git branches, code review, tickets, staging deploys. You graduate already fluent in how teams work." },
  { step: "04", title: "Job-readiness", text: "Portfolio polish, resume engineering, mock interviews, and communication practice — built into the program." },
];

export default function TrainingPage() {
  return (
    <>
      <PageHeader
        badge="Patashala Academy"
        title={
          <>
            Go from theory to <span className="text-gradient">job-ready</span>
          </>
        }
        description="Practical software training run by engineers who build production platforms for clients. You learn by shipping real projects inside real workflows — and finish with work you can defend in interviews."
      >
        <Button asChild size="lg">
          <Link href="/contact?service=training">Enquire About Training</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="#tracks">
            Browse Tracks <ArrowRight aria-hidden />
          </Link>
        </Button>
      </PageHeader>

      {/* Principles */}
      <Section className="pt-4 sm:pt-4 lg:pt-4">
        <Container>
          <Reveal staggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trainingPrinciples.map((p) => (
              <RevealItem key={p.title}>
                <Card variant="glass" className="h-full">
                  <CardTitle className="text-base">{p.title}</CardTitle>
                  <CardDescription className="mt-2">{p.description}</CardDescription>
                </Card>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Tracks */}
      <Section id="tracks" tone="surface" className="scroll-mt-20 border-y border-border">
        <Container>
          <SectionHeader
            eyebrow="Training tracks"
            title="Twelve tracks. One standard: industry-practical."
            description="Every track is project-driven, mentored by working engineers, and mapped to the skills hiring teams actually test."
          />
          <Reveal staggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {trainingTracks.map((track) => (
              <RevealItem key={track.id}>
                <Card variant="interactive" className="h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid size-11 place-items-center rounded-xl bg-primary/10">
                      <track.icon className="size-5 text-primary" aria-hidden />
                    </div>
                    <Badge variant="outline">{track.level}</Badge>
                  </div>
                  <CardTitle className="mt-4 text-base">{track.title}</CardTitle>
                  <CardDescription className="mt-2">{track.summary}</CardDescription>
                  <ul className="mt-4 space-y-1.5">
                    {track.topics.map((t) => (
                      <li key={t} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="size-3.5 shrink-0 text-success" aria-hidden />
                        {t}
                      </li>
                    ))}
                  </ul>
                </Card>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Journey */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="The learning journey"
            title="How a Patashala.Dev learner becomes hireable"
          />
          <Reveal staggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((j) => (
              <RevealItem key={j.step}>
                <Card className="h-full">
                  <p className="font-mono text-sm font-bold text-primary">{j.step}</p>
                  <CardTitle className="mt-3 text-lg">{j.title}</CardTitle>
                  <CardDescription className="mt-2">{j.text}</CardDescription>
                </Card>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CtaSection
        title="Ready to learn by building?"
        description="Tell us your background and goals. We'll recommend the right track honestly — including telling you if you should start somewhere simpler."
        primaryLabel="Enquire About Training"
        secondaryLabel="Read Training Insights"
        secondaryHref="/blog/practical-training-job-ready"
      />
    </>
  );
}
