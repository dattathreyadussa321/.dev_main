import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { PageHeader } from "@/components/blocks/page-header";
import { CtaSection } from "@/components/blocks/cta-section";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { pageMetadata } from "@/lib/seo";
import { getPublishedPosts } from "@/lib/blog-db";

export const metadata: Metadata = pageMetadata({
  title: "Insights — LMS, CRM, SaaS, EdTech & AgriTech Engineering",
  description:
    "Practical engineering insights from Patashala.Dev: custom LMS strategy, EdTech CRM, SaaS MVP scoping, full-stack architecture, software training, and AgriTech innovation.",
  path: "/blog",
});

// Dynamic so the page is rendered per-request (DB may not be available at build time)
export const dynamic = "force-dynamic";

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const allPosts = await getPublishedPosts();
  const posts = allPosts;
  const [featured, ...rest] = posts;

  // Build unique categories
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category))).sort()];

  return (
    <>
      <PageHeader
        badge="Insights"
        title={
          <>
            Notes from the <span className="text-gradient">build floor</span>
          </>
        }
        description="What we learn building SaaS, LMS, and CRM platforms — and training the engineers who'll build the next ones. Practical, opinionated, no fluff."
      />

      <Section className="pt-4 sm:pt-4 lg:pt-4">
        <Container>
          {/* Category filter chips */}
          {categories.length > 2 && (
            <Reveal className="mb-8 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant={cat === "All" ? "default" : "secondary"}
                  className="cursor-default px-3 py-1 text-xs"
                >
                  {cat}
                </Badge>
              ))}
            </Reveal>
          )}

          {posts.length === 0 && (
            <Reveal>
              <div className="rounded-2xl border border-border bg-card p-12 text-center">
                <p className="text-lg font-medium text-foreground">Coming soon</p>
                <p className="mt-2 text-muted-foreground">
                  We&apos;re working on our first insights. Subscribe to be notified when we publish.
                </p>
                <div className="mx-auto mt-6 max-w-sm">
                  <NewsletterForm />
                </div>
              </div>
            </Reveal>
          )}

          {featured && (
            <>
              {/* Featured post */}
              <Reveal>
                <Link href={`/blog/${featured.slug}`} className="block rounded-2xl">
                  <Card variant="interactive" padding="lg" className="lg:p-10">
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <Badge>{featured.category}</Badge>
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="size-3.5" aria-hidden /> {formatDate(featured.date)}
                      </span>
                      {featured.readingTime && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3.5" aria-hidden /> {featured.readingTime}
                        </span>
                      )}
                      {(featured._count?.likes ?? 0) > 0 && (
                        <span className="inline-flex items-center gap-1">
                          <Heart className="size-3.5 text-rose-500" aria-hidden fill="currentColor" />{" "}
                          {featured._count!.likes}
                        </span>
                      )}
                    </div>
                    <CardTitle className="mt-4 text-2xl sm:text-3xl">{featured.title}</CardTitle>
                    <CardDescription className="mt-3 max-w-3xl text-base">
                      {featured.excerpt}
                    </CardDescription>
                    <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                      Read article <ArrowRight className="size-4" aria-hidden />
                    </p>
                  </Card>
                </Link>
              </Reveal>

              {/* Newsletter between featured and grid */}
              {rest.length > 0 && (
                <Reveal className="my-8 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-6 sm:p-8">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Get new insights in your inbox</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        No spam. Practical engineering notes on LMS, SaaS, and training.
                      </p>
                    </div>
                    <div className="w-full max-w-xs shrink-0">
                      <NewsletterForm compact />
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Grid */}
              <Reveal staggerChildren className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <RevealItem key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="block h-full rounded-2xl">
                      <Card variant="interactive" className="h-full">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <Badge variant="secondary">{post.category}</Badge>
                          {post.readingTime && (
                            <span className="inline-flex items-center gap-1">
                              <Clock className="size-3.5" aria-hidden /> {post.readingTime}
                            </span>
                          )}
                          {(post._count?.likes ?? 0) > 0 && (
                            <span className="inline-flex items-center gap-1">
                              <Heart className="size-3 text-rose-500" aria-hidden fill="currentColor" />{" "}
                              {post._count!.likes}
                            </span>
                          )}
                        </div>
                        <CardTitle className="mt-4 text-lg">{post.title}</CardTitle>
                        <CardDescription className="mt-2 line-clamp-3">{post.excerpt}</CardDescription>
                        <p className="mt-4 text-xs text-muted-foreground">{formatDate(post.date)}</p>
                      </Card>
                    </Link>
                  </RevealItem>
                ))}
              </Reveal>
            </>
          )}

          {/* Bottom newsletter CTA */}
          {posts.length > 0 && (
            <Reveal className="mx-auto mt-16 max-w-md text-center">
              <p className="mb-4 text-lg font-semibold">Enjoyed the read?</p>
              <NewsletterForm />
            </Reveal>
          )}
        </Container>
      </Section>

      <CtaSection
        title="Want this thinking applied to your product?"
        description="The same judgment behind these articles goes into every platform we build. Start a conversation."
      />
    </>
  );
}
