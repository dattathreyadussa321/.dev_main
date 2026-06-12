import type { Metadata } from "next";
import Link from "next/link";
import { Compass, GraduationCap, Hammer, Lightbulb, MapPin, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { PageHeader } from "@/components/blocks/page-header";
import { CtaSection } from "@/components/blocks/cta-section";
import { whyUs } from "@/config/content";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About — Consulting, Development, Training & Innovation",
  description:
    "Patashala.Dev is a Hyderabad-based technology company combining software consulting, production development, practical training, and AgriTech innovation under one engineering culture.",
  path: "/about",
});

const pillars = [
  {
    Icon: Hammer,
    title: "Consulting & Development",
    text: "We build production SaaS, LMS, CRM, and full-stack platforms for clients — with weekly demos and full ownership at handover.",
  },
  {
    Icon: GraduationCap,
    title: "Practical Training",
    text: "Patashala means 'school' — and ours teaches the way industry works: real projects, code review, deployment, and job-readiness.",
  },
  {
    Icon: Lightbulb,
    title: "Innovation",
    text: "Projects like Agri Rover keep us building at the frontier — applying software engineering discipline to problems beyond the screen.",
  },
];

const values = [
  {
    title: "Production-ready is the only standard",
    text: "Demo-quality code never leaves our shop. Everything we ship is typed, validated, monitored, and documented.",
  },
  {
    title: "Honesty over upsell",
    text: "If a smaller scope serves you better, we say so. If a deadline is unrealistic, we say that too — before you spend.",
  },
  {
    title: "Teaching makes us better engineers",
    text: "Explaining fundamentals to learners every week keeps our consulting practice sharp and our patterns defensible.",
  },
  {
    title: "Outcomes, not output",
    text: "We measure engagements by what your users and business gain — not by features delivered or hours billed.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        badge="About Patashala.Dev"
        title={
          <>
            A school of <span className="text-gradient">shipping</span>
          </>
        }
        description="Patashala.Dev is a technology company from Hyderabad, India, built on a simple loop: we build production software for clients, teach the craft to the next generation of engineers, and push innovation projects that keep us honest about what's hard."
      >
        <Badge variant="glass">
          <MapPin className="size-3.5" aria-hidden /> {siteConfig.location}
        </Badge>
      </PageHeader>

      {/* Mission */}
      <Section className="pt-4 sm:pt-4 lg:pt-4">
        <Container>
          <Reveal>
            <Card variant="gradient" padding="lg" className="text-center lg:p-12">
              <div className="mx-auto mb-5 grid size-12 place-items-center rounded-xl bg-primary/15">
                <Target className="size-6 text-primary" aria-hidden />
              </div>
              <Badge className="mb-4">Our mission</Badge>
              <p className="mx-auto max-w-3xl text-xl font-medium leading-relaxed sm:text-2xl">
                Make production-grade software — and the skills to build it — accessible to the
                businesses, institutes, and learners who need it most.
              </p>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* Three pillars */}
      <Section tone="surface" className="border-y border-border">
        <Container>
          <SectionHeader
            eyebrow="What we are"
            title="Three practices, one engineering culture"
            description="Consulting, training, and innovation aren't separate departments — they're one team whose practices sharpen each other."
          />
          <Reveal staggerChildren className="grid gap-6 lg:grid-cols-3">
            {pillars.map(({ Icon, title, text }) => (
              <RevealItem key={title}>
                <Card variant="interactive" padding="lg" className="h-full text-center">
                  <div className="mx-auto mb-5 grid size-12 place-items-center rounded-xl bg-primary/10">
                    <Icon className="size-6 text-primary" aria-hidden />
                  </div>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription className="mt-3">{text}</CardDescription>
                </Card>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* Product engineering mindset */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                How we think
              </p>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                A product engineering mindset, not an agency assembly line
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Most development shops optimize for billable features. We optimize for the moment
                your product meets its users. That means asking why before how, cutting scope that
                doesn&apos;t serve outcomes, and building foundations your future team will thank
                us for.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                It also means we stay after launch. Most of our engagements grow into long-term
                partnerships — because the team that built your platform is the best team to grow
                it.
              </p>
              <Button asChild className="mt-8">
                <Link href="/contact">
                  <Compass aria-hidden /> Work With Us
                </Link>
              </Button>
            </Reveal>
            <Reveal staggerChildren className="grid gap-4 sm:grid-cols-2">
              {values.map((v) => (
                <RevealItem key={v.title}>
                  <Card variant="glass" className="h-full">
                    <CardTitle className="text-base">{v.title}</CardTitle>
                    <CardDescription className="mt-2">{v.text}</CardDescription>
                  </Card>
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Why clients choose us */}
      <Section tone="surface" className="border-y border-border">
        <Container>
          <SectionHeader
            eyebrow="Why clients choose us"
            title="The reasons engagements turn into partnerships"
          />
          <Reveal staggerChildren className="grid gap-6 md:grid-cols-2">
            {whyUs.map((item) => (
              <RevealItem key={item.title}>
                <Card padding="lg" className="h-full">
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="mt-2">{item.description}</CardDescription>
                </Card>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CtaSection
        title="Let's find out if we're the right partner"
        description="One conversation. An honest read on your goals, scope, and budget. No pressure, no obligation."
      />
    </>
  );
}
