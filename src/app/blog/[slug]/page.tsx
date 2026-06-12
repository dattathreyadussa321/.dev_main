import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container, Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { CtaSection } from "@/components/blocks/cta-section";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { EngagementRailDesktop, EngagementInline } from "@/components/blog/engagement-rail";
import { ArticleBody, extractHeadings } from "@/components/blog/article-body";
import { CopyLinkButton } from "@/components/blog/share-button";
import { getPostBySlug, getPublishedPosts, getLikeCount } from "@/lib/blog-db";
import { pageMetadata, blogPostJsonLd } from "@/lib/seo";
import { databaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts().catch(() => []);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getPublishedPosts();
  const related = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 2)
    .concat(allPosts.filter((p) => p.slug !== post.slug && p.category !== post.category).slice(0, 2 - Math.min(2, allPosts.filter((p) => p.slug !== post.slug && p.category === post.category).length)))
    .slice(0, 2);

  const likeCount = databaseConfigured
    ? await getLikeCount(post.id).catch(() => 0)
    : 0;

  const headings = extractHeadings(post.content);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogPostJsonLd({
              title: post.title,
              excerpt: post.excerpt,
              date: post.date.toISOString(),
              slug: post.slug,
              author: post.author,
            }),
          ),
        }}
      />

      <ReadingProgress />

      {/* Article hero */}
      <div className="glow-orbs relative overflow-hidden pb-12 pt-32 sm:pt-40">
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl">
            <Button asChild variant="ghost" size="sm" className="-ml-3 mb-6 text-muted-foreground">
              <Link href="/blog">
                <ArrowLeft aria-hidden /> All insights
              </Link>
            </Button>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Badge>{post.category}</Badge>
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-4" aria-hidden /> {formatDate(post.date)}
              </span>
              {post.readingTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="size-4" aria-hidden /> {post.readingTime}
                </span>
              )}
            </div>
            <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <User className="size-4" aria-hidden /> {post.author}
              </p>
              <div className="flex items-center gap-3">
                <EngagementInline slug={post.slug} title={post.title} likeCount={likeCount} />
                <CopyLinkButton slug={post.slug} />
              </div>
            </div>
          </Reveal>
        </Container>
      </div>

      {/* Article body */}
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          {/* Outer grid: optional ToC on left, article in center, engagement rail on right */}
          <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 xl:grid-cols-[1fr_3fr_auto]">
            {/* Table of contents (desktop only) */}
            {headings.length > 1 && (
              <aside className="hidden xl:sticky xl:top-28 xl:block xl:h-fit">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Contents
                </p>
                <nav aria-label="Table of contents">
                  <ul className="space-y-2">
                    {headings.map((h) => (
                      <li key={h.id}>
                        <a
                          href={`#${h.id}`}
                          className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                        >
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}

            {/* Article */}
            <article className={headings.length <= 1 ? "xl:col-span-2" : ""}>
              <ArticleBody sections={post.id.startsWith("config:") ? undefined : undefined} content={post.content} />

              {/* Bottom engagement + copy link */}
              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
                <EngagementInline slug={post.slug} title={post.title} likeCount={likeCount} />
                <CopyLinkButton slug={post.slug} />
              </div>

              {/* Newsletter */}
              <div className="mt-10 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-secondary/5 p-6">
                <p className="font-semibold text-foreground">Enjoyed this article?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Get practical engineering insights straight to your inbox.
                </p>
                <div className="mt-4 max-w-sm">
                  <NewsletterForm />
                </div>
              </div>

              {/* Related posts */}
              {related.length > 0 && (
                <div className="mt-12 border-t border-border pt-10">
                  <h2 className="mb-6 text-xl font-bold tracking-tight">Keep reading</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {related.map((r) => (
                      <Link key={r.slug} href={`/blog/${r.slug}`} className="block rounded-2xl">
                        <Card variant="interactive" className="h-full">
                          <Badge variant="secondary">{r.category}</Badge>
                          <CardTitle className="mt-3 text-base">{r.title}</CardTitle>
                          <CardDescription className="mt-2 line-clamp-2">{r.excerpt}</CardDescription>
                          <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                            Read <ArrowRight className="size-3.5" aria-hidden />
                          </p>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Desktop engagement rail */}
            <EngagementRailDesktop slug={post.slug} title={post.title} likeCount={likeCount} />
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
