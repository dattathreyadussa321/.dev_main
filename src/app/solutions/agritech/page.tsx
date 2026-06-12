import type { Metadata } from "next";
import Link from "next/link";
import {
  Bot,
  Compass,
  Database,
  HeartHandshake,
  Radar,
  Sprout,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { PageHeader } from "@/components/blocks/page-header";
import { CtaSection } from "@/components/blocks/cta-section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Agri Rover — AgriTech Innovation & Smart Farming Technology",
  description:
    "Agri Rover is Patashala.Dev's AgriTech innovation project: a rover-based platform designed for field monitoring and data collection, built with farmer-first design principles for future-ready smart farming systems.",
  path: "/solutions/agritech",
});

const capabilities = [
  {
    Icon: Radar,
    title: "Rover-Based Monitoring",
    text: "Designed for systematic field traversal and observation — bringing consistency to inspection work that today depends on time and footsteps.",
  },
  {
    Icon: Database,
    title: "Field Data Collection",
    text: "Capabilities can include structured capture of field conditions over time, building the data layer that precision decisions depend on.",
  },
  {
    Icon: Bot,
    title: "Field Automation",
    text: "Our innovation direction explores automating the repetitive, physical parts of field monitoring — so farmer attention goes where judgment is needed.",
  },
  {
    Icon: Sprout,
    title: "Smart Farming Systems",
    text: "The long-term vision: rover observations feeding software platforms that turn field data into clear, actionable recommendations.",
  },
  {
    Icon: HeartHandshake,
    title: "Farmer-First Design",
    text: "Interfaces designed for the phones farmers already own, in workflows that respect how farms actually operate — technology that adapts to the field, not the reverse.",
  },
  {
    Icon: Compass,
    title: "Future-Ready Architecture",
    text: "Software foundations built to grow with the hardware: telemetry-ready pipelines, dashboards, and integration points designed for what comes next.",
  },
];

const principles = [
  {
    step: "01",
    title: "Built where it's used",
    text: "AgriTech designed far from the field fails in the field. Agri Rover's direction is shaped by real agricultural conditions — dust, heat, distance, and connectivity gaps.",
  },
  {
    step: "02",
    title: "Honest about maturity",
    text: "Agri Rover is an active innovation project, not a finished product catalog. We describe what it's designed for — and share progress when it's real.",
  },
  {
    step: "03",
    title: "Software-grade engineering",
    text: "The same production discipline behind our SaaS and LMS platforms — typed code, data pipelines, monitoring — applied to agricultural technology.",
  },
];

export default function AgriTechPage() {
  return (
    <>
      <PageHeader
        badge="AgriTech Innovation"
        title={
          <>
            Agri Rover — engineering for the{" "}
            <span className="text-gradient">future of farming</span>
          </>
        }
        description="Our in-house AgriTech innovation project: a rover-based platform designed for field monitoring and data collection, built with farmer-first design principles."
      >
        <Button asChild size="lg">
          <Link href="/contact?service=agritech">Talk AgriTech With Us</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/blog/agritech-software-opportunity">Read Our AgriTech Thinking</Link>
        </Button>
      </PageHeader>

      {/* Vision statement */}
      <Section className="pt-4 sm:pt-4 lg:pt-4">
        <Container>
          <Reveal>
            <Card variant="gradient" padding="lg" className="text-center lg:p-12">
              <Badge className="mb-5">The vision</Badge>
              <blockquote className="mx-auto max-w-3xl text-xl font-medium leading-relaxed sm:text-2xl">
                &ldquo;Precision agriculture shouldn&apos;t be reserved for industrial farms.
                Field robotics plus well-built software can put systematic monitoring within reach
                of every farmer.&rdquo;
              </blockquote>
              <p className="mt-5 text-sm text-muted-foreground">
                — The innovation direction behind Agri Rover
              </p>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* Capabilities */}
      <Section tone="surface" className="border-y border-border">
        <Container>
          <SectionHeader
            eyebrow="Innovation direction"
            title="What Agri Rover is designed for"
            description="An honest look at the capability areas we're building toward — described as direction and design intent, not finished specifications."
          />
          <Reveal staggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ Icon, title, text }) => (
              <RevealItem key={title}>
                <Card variant="interactive" className="h-full">
                  <div className="mb-4 grid size-11 place-items-center rounded-xl bg-gradient-to-br from-success/15 to-secondary/15">
                    <Icon className="size-5 text-success" aria-hidden />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  <CardDescription className="mt-2">{text}</CardDescription>
                </Card>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Principles */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="How we approach it"
            title="Innovation with engineering discipline"
          />
          <Reveal staggerChildren className="grid gap-6 lg:grid-cols-3">
            {principles.map((p) => (
              <RevealItem key={p.step}>
                <Card className="h-full">
                  <p className="font-mono text-sm font-bold text-success">{p.step}</p>
                  <CardTitle className="mt-3 text-lg">{p.title}</CardTitle>
                  <CardDescription className="mt-2">{p.text}</CardDescription>
                </Card>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CtaSection
        title="Working on AgriTech? Let's compare notes."
        description="We're always glad to talk with farmers, researchers, AgriTech startups, and institutions exploring field technology and smart farming systems."
        primaryLabel="Start a Conversation"
        secondaryLabel="Explore Our Solutions"
        secondaryHref="/solutions"
      />
    </>
  );
}
