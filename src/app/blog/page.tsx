import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { BlogGrid, type BlogCardPost } from "@/components/blog/blog-grid";
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

  // Serialize for the client grid — only what the cards render.
  const posts: BlogCardPost[] = allPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: formatDate(p.date),
    readingTime: p.readingTime,
    likes: p._count?.likes ?? 0,
  }));

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden px-6 pb-14 pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[30%] right-[20%] size-[700px] rounded-full bg-[radial-gradient(circle,rgba(44,197,178,0.12),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-[1200px]">
          <div className="eyebrow mb-5">Insights</div>
          <h1 className="max-w-[980px] font-display text-[clamp(48px,7.5vw,96px)] font-semibold leading-[0.98] tracking-[-0.03em]">
            Notes from the <span className="text-gradient">build floor</span>
          </h1>
          <p className="mt-6 max-w-[560px] text-lg leading-relaxed text-foreground/65">
            What we learn building SaaS, LMS and CRM platforms — and training the engineers
            who&apos;ll build the next ones. Practical, opinionated, no fluff.
          </p>
        </div>
      </div>

      {/* ── Filters + posts ────────────────────────────────────────── */}
      <div className="px-6 pb-[72px]">
        <div className="mx-auto max-w-[1200px]">
          {posts.length === 0 ? (
            <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-12 text-center">
              <p className="text-lg font-bold">Coming soon</p>
              <p className="mt-2 text-foreground/55">
                We&apos;re working on our first insights. Subscribe to be notified when we publish.
              </p>
              <div className="mx-auto mt-6 max-w-sm">
                <NewsletterForm />
              </div>
            </div>
          ) : (
            <BlogGrid posts={posts} />
          )}
        </div>
      </div>

      {/* ── Newsletter ─────────────────────────────────────────────── */}
      <div className="px-6 pb-[90px]">
        <Reveal className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-6 rounded-3xl border border-primary/25 bg-[linear-gradient(120deg,#0C1512,#0A0E14)] px-8 py-10 sm:px-11">
          <div className="max-w-[520px]">
            <div className="font-display text-[clamp(22px,2.6vw,30px)] font-semibold">
              Engineering insights, monthly
            </div>
            <p className="mt-2 text-[14.5px] leading-relaxed text-foreground/60">
              Practical notes on SaaS, LMS, CRM and AgriTech engineering. No spam, ever.
            </p>
          </div>
          <NewsletterForm />
        </Reveal>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <div className="px-6 pb-8">
        <div className="mx-auto max-w-[1200px]">
          <Reveal className="rounded-[28px] border border-white/10 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(44,197,178,0.2),transparent_60%),#0B0D10] px-8 py-20 text-center">
            <h2 className="font-display text-[clamp(34px,5vw,60px)] font-semibold leading-[1.05]">
              Want this thinking applied
              <br />
              to <span className="text-gradient">your product?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-[460px] leading-relaxed text-foreground/60">
              The same judgment behind these articles goes into every platform we build. Start a
              conversation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="rounded-[14px] bg-primary px-[30px] py-4 font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(83,243,207,0.45)]"
              >
                Book a consultation
              </Link>
              <Link
                href="/services"
                className="rounded-[14px] border border-white/[0.18] px-[30px] py-4 font-medium text-foreground transition-colors hover:border-primary/50"
              >
                Explore services
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
