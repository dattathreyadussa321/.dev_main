import type { Metadata } from "next";
import Link from "next/link";
import { BellRing, LineChart, MessageSquareText, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { PageHeader } from "@/components/blocks/page-header";
import { FeatureCard } from "@/components/blocks/feature-card";
import { CtaSection } from "@/components/blocks/cta-section";
import { crmFeatures } from "@/config/solutions";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "CRM for EdTech — Admissions & Enquiry Management Software",
  description:
    "A custom CRM built for education businesses: lead management, student enquiry tracking, admissions pipelines, counsellor dashboards, follow-up automation, batch management, payment status, and analytics.",
  path: "/solutions/crm",
});

const pipelineStages = ["New Enquiry", "Contacted", "Counselling", "Demo / Visit", "Negotiation", "Admitted"];

export default function CrmPage() {
  return (
    <>
      <PageHeader
        badge="CRM for EdTech"
        title={
          <>
            Stop losing admissions to{" "}
            <span className="text-gradient">missed follow-ups</span>
          </>
        }
        description="An admissions-focused CRM for institutes and EdTech teams: every enquiry captured, every follow-up scheduled, every conversion measured — from first touch to enrolled student."
      >
        <Button asChild size="lg">
          <Link href="/contact?service=crm">Discuss Your CRM</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/portfolio#crm-platform">See a CRM Snapshot</Link>
        </Button>
      </PageHeader>

      {/* Pipeline visual */}
      <Section className="pt-4 sm:pt-4 lg:pt-4">
        <Container>
          <Reveal>
            <Card variant="elevated" padding="lg">
              <Badge className="mb-5">The admissions pipeline</Badge>
              <CardTitle className="text-2xl">One pipeline. Zero lost enquiries.</CardTitle>
              <CardDescription className="mt-2 max-w-2xl text-base">
                Enquiries from your website, ads, calls, and walk-ins land in one pipeline.
                Counsellors move them stage by stage — and leadership sees true conversion
                numbers at every step.
              </CardDescription>
              <ol className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {pipelineStages.map((stage, i) => (
                  <li key={stage} className="relative">
                    <div className="rounded-xl border border-border bg-surface p-4 text-center">
                      <p className="font-mono text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</p>
                      <p className="mt-1.5 text-sm font-medium">{stage}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* Feature grid */}
      <Section tone="surface" className="border-y border-border">
        <Container>
          <SectionHeader
            eyebrow="Platform capabilities"
            title="Built for how education teams actually sell"
            description="Ten core modules tuned to enquiries, counsellors, batches, and fees — not generic 'deals' and 'accounts'."
          />
          <Reveal staggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {crmFeatures.map((f) => (
              <RevealItem key={f.title}>
                <FeatureCard title={f.title} description={f.description} />
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Differentiators */}
      <Section>
        <Container>
          <SectionHeader eyebrow="Why it converts" title="Designed around counsellor discipline" />
          <Reveal staggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                Icon: BellRing,
                title: "Due-today follow-ups",
                text: "Counsellors open the CRM to a clear list: who to call today, who's overdue, and the full context of every conversation.",
              },
              {
                Icon: MessageSquareText,
                title: "WhatsApp & email ready",
                text: "Integration-ready architecture for WhatsApp Business API and transactional email — send templated messages without leaving the pipeline.",
              },
              {
                Icon: Workflow,
                title: "Automation-ready workflows",
                text: "Auto-assign new leads, trigger follow-up sequences, escalate stale enquiries — rules your team configures, not hard-coded behavior.",
              },
              {
                Icon: LineChart,
                title: "Numbers leadership trusts",
                text: "Source-wise conversion, counsellor performance, and revenue projections — pulled from real pipeline data, not month-end guesswork.",
              },
            ].map(({ Icon, title, text }) => (
              <RevealItem key={title}>
                <Card variant="glass" className="h-full">
                  <div className="mb-4 grid size-10 place-items-center rounded-lg bg-primary/10">
                    <Icon className="size-5 text-primary" aria-hidden />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription className="mt-2">{text}</CardDescription>
                </Card>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal className="mt-12">
            <Card variant="gradient" padding="lg" className="text-center">
              <CardTitle className="text-xl">Pairs naturally with our Advanced LMS</CardTitle>
              <CardDescription className="mx-auto mt-2 max-w-xl text-base">
                Admitted students flow from the CRM straight into LMS batches — one record from
                first enquiry to certificate.
              </CardDescription>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button asChild variant="outline">
                  <Link href="/solutions/lms">Explore the LMS</Link>
                </Button>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <CtaSection
        title="How many enquiries did you lose last month?"
        description="If you can't answer that, you need this CRM. Book a consultation and we'll map your admissions flow into a pipeline your team will actually use."
      />
    </>
  );
}
