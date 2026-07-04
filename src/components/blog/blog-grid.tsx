"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/** Serialized, client-safe post shape passed from the server page. */
export interface BlogCardPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string | null;
  likes: number;
}

/* Category tints from the prototype; unknown categories cycle the palette. */
const categoryStyles: Record<string, { tagBg: string; grad: string }> = {
  LMS: { tagBg: "#53F3CF", grad: "linear-gradient(135deg,#0E2E29,#123A34 60%,#0A0E14)" },
  CRM: { tagBg: "#A78BFA", grad: "linear-gradient(135deg,#1B1533,#241B45 60%,#0A0E14)" },
  SaaS: { tagBg: "#5EE0FF", grad: "linear-gradient(135deg,#0C2233,#10304A 60%,#0A0E14)" },
  "Full-Stack": { tagBg: "#FFC46B", grad: "linear-gradient(135deg,#2E2310,#3A2E14 60%,#0A0E14)" },
  Training: { tagBg: "#FF8896", grad: "linear-gradient(135deg,#2E1016,#3A141E 60%,#0A0E14)" },
  AgriTech: { tagBg: "#7BE388", grad: "linear-gradient(135deg,#10290F 0%,#153A18 60%,#0A0E14)" },
};

const fallbackStyles = Object.values(categoryStyles);

function styleFor(category: string) {
  if (categoryStyles[category]) return categoryStyles[category];
  let hash = 0;
  for (const ch of category) hash = (hash * 31 + ch.charCodeAt(0)) | 0;
  return fallbackStyles[Math.abs(hash) % fallbackStyles.length];
}

/** Filterable post grid — first card spans the full row while "All" is active. */
export function BlogGrid({ posts }: { posts: BlogCardPost[] }) {
  const [filter, setFilter] = React.useState("All");

  const categories = React.useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category))).sort()],
    [posts],
  );
  const shown = filter === "All" ? posts : posts.filter((p) => p.category === filter);
  const featured = filter === "All";

  return (
    <>
      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((label) => {
          const on = filter === label;
          return (
            <button
              key={label}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(label)}
              className={cn(
                "rounded-full px-[18px] py-2.5 font-mono text-[12.5px] tracking-[0.04em] transition-colors hover:border-primary/60",
                on
                  ? "border border-primary/70 bg-primary/[0.12] font-bold text-primary"
                  : "border border-white/[0.14] bg-white/[0.03] text-foreground/65",
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Posts */}
      {shown.length === 0 ? (
        <div className="py-16 text-center text-[15px] text-foreground/50">
          No articles in this category yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => {
            const c = styleFor(p.category);
            const isFeat = featured && i === 0;
            return (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className={cn(
                  "flex flex-col overflow-hidden rounded-[20px] border border-white/[0.08] bg-white/[0.02] no-underline transition-all hover:-translate-y-1 hover:border-primary/45",
                  isFeat && "md:col-span-2 lg:col-span-3",
                )}
              >
                <div
                  className={cn("relative flex-none", isFeat ? "h-[200px]" : "h-[140px]")}
                  style={{ background: c.grad }}
                >
                  <span
                    className="absolute left-3.5 top-3.5 rounded-full px-[11px] py-[5px] font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-background"
                    style={{ background: c.tagBg }}
                  >
                    {p.category}
                  </span>
                  <span
                    aria-hidden
                    className="absolute bottom-3 right-3.5 font-mono text-[22px] text-foreground/25"
                  >
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div
                    className={cn(
                      "font-display font-semibold leading-tight text-foreground",
                      isFeat ? "text-2xl sm:text-3xl" : "text-[19px]",
                    )}
                  >
                    {p.title}
                  </div>
                  <div className="flex-1 text-[14.5px] leading-relaxed text-foreground/55">
                    {p.excerpt}
                  </div>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <span className="font-mono text-[11.5px] text-foreground/45">
                      {p.date}
                      {p.readingTime ? ` · ${p.readingTime}` : ""}
                      {p.likes > 0 ? ` · ♥ ${p.likes}` : ""}
                    </span>
                    <span className="text-[13px] font-bold text-primary">Read →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
