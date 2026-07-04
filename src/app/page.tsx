import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container, Section, SectionHeader } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { HeroVisual } from "@/components/three/hero-visual";
import { SolutionsScroll } from "@/components/home/solutions-scroll";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { TrainingCta } from "@/components/home/training-cta";
import { CtaSection } from "@/components/blocks/cta-section";
import { Faq } from "@/components/blocks/faq";
import { services } from "@/config/services";
import { caseStudies } from "@/config/case-studies";
import { whyUs, stats, trustPoints, faqs } from "@/config/content";
import { pageMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Build, Launch & Scale Modern Software — SaaS, LMS, CRM & Training",
  description:
    "Patashala.Dev designs and develops production-ready SaaS applications, LMS platforms, CRM systems, and full-stack web apps — and runs practical software training programs for modern businesses and EdTech teams.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <div className="glow-orbs relative overflow-hidden pt-28 sm:pt-36">
        {/* Layer 0 — Three.js icosahedron canvas (absolute background) */}
        <HeroVisual />

        {/* Layer 1 — dot grid sits above canvas, below text */}
        <div
          className="bg-grid absolute inset-0 z-[1] opacity-20 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]"
          aria-hidden
        />

        {/* Layer 2 — left-to-right gradient so text stays legible over the model */}
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-background/80 via-background/50 to-background/10"
          aria-hidden
        />

        {/* Layer 10 — content */}
        <Container className="relative z-[10]">
          <div className="grid items-center gap-12 pb-16 lg:grid-cols-2 lg:gap-8 lg:pb-24">
            <Reveal staggerChildren>
              <RevealItem>
                <Badge variant="glass" className="mb-6">
                  <span className="size-1.5 rounded-full bg-secondary" aria-hidden />
                  Consulting · Development · Training · Innovation
                </Badge>
              </RevealItem>
              <RevealItem>
                <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                  Build, launch, and scale modern software with{" "}
                  <span className="text-gradient">Patashala.Dev</span>
                </h1>
              </RevealItem>
              <RevealItem>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  We design and develop production-ready SaaS applications, LMS platforms, CRM
                  systems, and full-stack web apps — and run practical software training programs
                  for modern businesses and EdTech teams.
                </p>
              </RevealItem>
              <RevealItem className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    <CalendarCheck aria-hidden /> Book a Consultation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/services">
                    Explore Services <ArrowRight aria-hidden />
                  </Link>
                </Button>
              </RevealItem>
              <RevealItem className="mt-10">
                <ul className="grid max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {trustPoints.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="size-4 shrink-0 text-success" aria-hidden />
                      {point}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            </Reveal>

            {/* Right column — intentionally empty; the canvas model floats here */}
            <div aria-hidden />
          </div>
        </Container>
      </div>

      {/* ── Stats band ─────────────────────────────────────────────── */}
      <Section tone="surface" className="border-y border-border py-14 sm:py-16 lg:py-16">
        <Container>
          <Reveal staggerChildren className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <RevealItem key={stat.label} className="text-center">
                <p className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* ── Services overview ──────────────────────────────────────── */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="What we do"
            title="Production software for real business workflows"
            description="From SaaS platforms to education systems, we build software that runs businesses — designed, developed, and maintained by one accountable team."
          />
          <Reveal staggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service) => (
              <RevealItem key={service.id}>
                <Link href={`/services#${service.id}`} className="block h-full rounded-2xl">
                  <Card variant="interactive" className="h-full">
                    <div className="mb-4 grid size-11 place-items-center rounded-xl bg-primary/10">
                      <service.icon className="size-5 text-primary" aria-hidden />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription className="mt-2">{service.summary}</CardDescription>
                    <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Learn more <ArrowRight className="size-3.5" aria-hidden />
                    </p>
                  </Card>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
          <Reveal className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/services">
                View all services <ArrowRight aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* ── Solutions — pinned horizontal scroll ───────────────────── */}
      <SolutionsScroll />

      {/* ── Training CTA — magnetic button ─────────────────────────── */}
      <TrainingCta />

      {/* ── Process — scroll-drawn timeline ────────────────────────── */}
      <ProcessTimeline />

      {/* ── Why Patashala.Dev ──────────────────────────────────────── */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="Why Patashala.Dev"
            title="A team that builds, teaches, and innovates"
            description="Consulting keeps us accountable to outcomes. Training keeps us sharp on fundamentals. Innovation projects like Agri Rover keep us honest about what's hard."
          />
          <Reveal staggerChildren className="grid gap-6 md:grid-cols-2">
            {whyUs.map((item) => (
              <RevealItem key={item.title}>
                <Card variant="gradient" padding="lg" className="h-full">
                  <div className="mb-4 grid size-10 place-items-center rounded-lg bg-primary/15">
                    <ShieldCheck className="size-5 text-primary" aria-hidden />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription className="mt-2">{item.description}</CardDescription>
                </Card>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* ── Case-study highlights ──────────────────────────────────── */}
      <Section tone="surface" className="border-y border-border">
        <Container>
          <SectionHeader
            eyebrow="Selected work"
            title="Engagement snapshots"
            description="Anonymized snapshots of the kinds of platforms we design, build, and run — labeled honestly, never invented."
          />
          <Reveal staggerChildren className="grid gap-6 lg:grid-cols-3">
            {caseStudies.slice(0, 3).map((cs) => (
              <RevealItem key={cs.id}>
                <Link href={`/portfolio#${cs.id}`} className="block h-full rounded-2xl">
                  <Card variant="interactive" className="h-full">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{cs.category}</Badge>
                      <Badge variant="outline">{cs.type}</Badge>
                    </div>
                    <CardTitle className="mt-4">{cs.title}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-3">{cs.challenge}</CardDescription>
                    <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Read snapshot <ArrowRight className="size-3.5" aria-hidden />
                    </p>
                  </Card>
                </Link>
              </RevealItem>
            ))}
          </Reveal>
          <Reveal className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/portfolio">
                View all work <ArrowRight aria-hidden />
              </Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <Section>
        <Container>
          <SectionHeader
            eyebrow="FAQ"
            title="Answers before you ask"
            description="The questions founders, institute owners, and learners ask us most."
          />
          <Reveal>
            <Faq items={faqs} />
          </Reveal>
        </Container>
      </Section>

      {/* ── Contact CTA ────────────────────────────────────────────── */}
      <CtaSection />
    </>
  );
}
