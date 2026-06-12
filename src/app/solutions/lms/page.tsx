import type { Metadata } from "next";
import Link from "next/link";
import { Check, GraduationCap, MonitorSmartphone, ShieldCheck, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { PageHeader } from "@/components/blocks/page-header";
import { FeatureCard } from "@/components/blocks/feature-card";
import { CtaSection } from "@/components/blocks/cta-section";
import { lmsFeatures } from "@/config/solutions";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Advanced LMS Development — Custom Learning Management Systems",
  description:
    "A complete custom LMS for institutes and EdTech businesses: course management, student/trainer/admin dashboards, live and recorded classes, assessments, certificates, payments, and analytics. Owned outright, no per-seat fees.",
  path: "/solutions/lms",
});

const audiences = [
  "Training institutes scaling past spreadsheets",
  "Coaching centers moving online",
  "EdTech startups launching learning products",
  "Corporate teams running internal academies",
];

export default function LmsPage() {
  return (
    <>
      <PageHeader
        badge="Advanced LMS"
        title={
          <>
            A learning platform built around{" "}
            <span className="text-gradient">how you actually teach</span>
          </>
        }
        description="Courses, batches, live and recorded classes, assessments, certificates, and payments — in one platform your institute owns outright. No per-seat fees, no workflow workarounds."
      >
        <Button asChild size="lg">
          <Link href="/contact?service=lms">Discuss Your LMS</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/portfolio#lms-platform">See an LMS Snapshot</Link>
        </Button>
      </PageHeader>

      {/* Who it's for */}
      <Section className="pt-4 sm:pt-4 lg:pt-4">
        <Container>
          <Reveal>
            <Card variant="gradient" padding="lg">
              <div className="grid items-center gap-8 lg:grid-cols-2">
                <div>
                  <Badge className="mb-4">Who it&apos;s for</Badge>
                  <CardTitle className="text-2xl">
                    Built for education businesses that have outgrown generic tools
                  </CardTitle>
                  <CardDescription className="mt-3 text-base">
                    Off-the-shelf LMS products charge per seat and force your workflow into their
                    template. A custom LMS bends to your curriculum, your batches, and your fee
                    plans — and scales without scaling your costs.
                  </CardDescription>
                </div>
                <ul className="space-y-3">
                  {audiences.map((a) => (
                    <li key={a} className="flex items-center gap-3 text-sm font-medium">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10">
                        <Check className="size-4 text-primary" aria-hidden />
                      </span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* Feature grid */}
      <Section tone="surface" className="border-y border-border">
        <Container>
          <SectionHeader
            eyebrow="Platform capabilities"
            title="Everything a serious institute needs"
            description="Twelve core modules, integrated from day one — not bolted together from plugins."
          />
          <Reveal staggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lmsFeatures.map((f) => (
              <RevealItem key={f.title}>
                <FeatureCard title={f.title} description={f.description} />
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Pillars */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Why custom"
            title="Designed for ownership, not rental"
          />
          <Reveal staggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                Icon: ShieldCheck,
                title: "Multi-role by design",
                text: "Students, trainers, counsellors, admins, and owners — each with scoped permissions and a purpose-built dashboard.",
              },
              {
                Icon: MonitorSmartphone,
                title: "Mobile-responsive learning",
                text: "Students learn on the phones they already own. Every screen is designed mobile-first and verified on real devices.",
              },
              {
                Icon: Wallet,
                title: "Your fees, your flow",
                text: "Installments, batch pricing, scholarships, receipts — fee logic modeled on how your institute actually charges.",
              },
              {
                Icon: GraduationCap,
                title: "Built by educators",
                text: "We run training programs ourselves. The LMS patterns we ship come from operating a real academy, not guessing.",
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
        </Container>
      </Section>

      <CtaSection
        title="Ready to own your learning platform?"
        description="Walk us through how your institute runs courses today. We'll map it to an LMS architecture and give you a clear scope, timeline, and budget."
        secondaryLabel="See CRM for EdTech"
        secondaryHref="/solutions/crm"
      />
    </>
  );
}
