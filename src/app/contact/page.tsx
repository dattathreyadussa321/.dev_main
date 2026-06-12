import type { Metadata } from "next";
import { Suspense } from "react";
import { CalendarCheck, Clock, Mail, MapPin } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { PageHeader } from "@/components/blocks/page-header";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Book a Free Consultation",
  description:
    "Tell Patashala.Dev about your SaaS, LMS, CRM, full-stack, or training needs. We respond within one business day with an honest read on scope, timeline, and budget.",
  path: "/contact",
});

const expectations = [
  {
    Icon: Clock,
    title: "Reply within one business day",
    text: "A real engineer reads your message — not an autoresponder.",
  },
  {
    Icon: CalendarCheck,
    title: "A free consultation call",
    text: "We map your goals to a realistic scope and give you honest options.",
  },
  {
    Icon: Mail,
    title: "A clear written proposal",
    text: "Scope, timeline, budget, and the team you'll work with — in writing.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        badge="Contact"
        title={
          <>
            Let&apos;s talk about <span className="text-gradient">your build</span>
          </>
        }
        description="Whether it's a SaaS product, an LMS for your institute, a CRM for your admissions team, or a training enquiry — start with one message."
      />

      <Section className="pt-4 sm:pt-4 lg:pt-4">
        <Container>
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Form */}
            <Reveal className="lg:col-span-3">
              <Card variant="elevated" padding="lg">
                <Suspense fallback={<FormSkeleton />}>
                  <ContactForm />
                </Suspense>
              </Card>
            </Reveal>

            {/* Sidebar */}
            <Reveal delay={0.1} className="space-y-5 lg:col-span-2">
              {expectations.map(({ Icon, title, text }) => (
                <Card key={title} variant="glass">
                  <div className="flex gap-4">
                    <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-primary/10">
                      <Icon className="size-5 text-primary" aria-hidden />
                    </div>
                    <div>
                      <CardTitle className="text-base">{title}</CardTitle>
                      <CardDescription className="mt-1">{text}</CardDescription>
                    </div>
                  </div>
                </Card>
              ))}
              <Card variant="gradient">
                <CardTitle className="text-base">Prefer email?</CardTitle>
                <CardDescription className="mt-2">
                  Write to us directly at{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </CardDescription>
                <CardDescription className="mt-3 flex items-center gap-1.5">
                  <MapPin className="size-4 text-primary" aria-hidden />
                  {siteConfig.location}
                </CardDescription>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}

/** Lightweight loading state while the client form hydrates. */
function FormSkeleton() {
  return (
    <div className="animate-pulse space-y-5" aria-hidden>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-12 rounded-xl bg-muted" />
      ))}
      <div className="h-32 rounded-xl bg-muted" />
      <div className="h-12 w-40 rounded-full bg-muted" />
    </div>
  );
}
