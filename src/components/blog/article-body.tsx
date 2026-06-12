import * as React from "react";
import { cn } from "@/lib/utils";

interface Section {
  heading?: string;
  paragraphs: string[];
}

interface ArticleBodyProps {
  /** Structured sections (from config/legacy DB) */
  sections?: Section[];
  /** Free-form text content (may contain Markdown headings) */
  content?: string;
  className?: string;
}

/** Parse a plain-text/light-markdown content string into sections */
function parseContent(content: string): Section[] {
  const lines = content.split("\n");
  const sections: Section[] = [{ paragraphs: [] }];

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;

    if (line.startsWith("## ")) {
      sections.push({ heading: line.slice(3).trim(), paragraphs: [] });
    } else if (line.startsWith("### ")) {
      sections.push({ heading: line.slice(4).trim(), paragraphs: [] });
    } else if (line.startsWith("# ")) {
      // Skip top-level heading (already in article hero)
    } else {
      sections[sections.length - 1].paragraphs.push(line);
    }
  }

  return sections.filter((s) => s.paragraphs.length > 0 || s.heading);
}

/**
 * Renders article content from either structured sections or raw text.
 * Keeps the bundle tiny (no markdown parser library) while supporting
 * basic heading-paragraph structure.
 */
export function ArticleBody({ sections, content, className }: ArticleBodyProps) {
  const resolved = sections ?? (content ? parseContent(content) : []);

  return (
    <div
      className={cn("article-prose mx-auto max-w-3xl", className)}
    >
      {resolved.map((section, i) => (
        <div key={i} className="mt-10 first:mt-0">
          {section.heading && (
            <h2 className="mb-5 scroll-mt-24 text-2xl font-bold tracking-tight" id={slugify(section.heading)}>
              {section.heading}
            </h2>
          )}
          {section.paragraphs.map((p, j) => (
            <p key={j} className="mb-5 text-[17px] leading-[1.8] text-muted-foreground last:mb-0">
              {p}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

/** Extract headings from content for table of contents */
export function extractHeadings(content: string): { text: string; id: string }[] {
  return content
    .split("\n")
    .filter((l) => l.startsWith("## ") || l.startsWith("### "))
    .map((l) => {
      const text = l.replace(/^#+\s+/, "").trim();
      return { text, id: slugify(text) };
    });
}
