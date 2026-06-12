import { isValidObjectId } from "mongoose";
import { connectDB, databaseConfigured } from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";
import { BlogLike } from "@/lib/models/BlogLike";
import { BlogShare } from "@/lib/models/BlogShare";
import { blogPosts as configPosts } from "@/config/blog";
import type { BlogPost as ConfigPost } from "@/config/blog";

export interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  content: string;
  coverImage: string | null;
  author: string;
  readingTime: string | null;
  published: boolean;
  date: Date;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  _count?: { likes: number; shares: number };
}

/** Shape of a lean BlogPost document straight from Mongo. */
interface LeanBlogPost {
  _id: { toString(): string };
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags?: string[];
  content: string;
  coverImage?: string | null;
  author?: string;
  readingTime?: string | null;
  published: boolean;
  date: Date;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/** Map a lean Mongo document to our typed format. */
function mapDb(row: LeanBlogPost, count?: { likes: number; shares: number }): DbBlogPost {
  return {
    id: row._id.toString(),
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    category: row.category,
    tags: row.tags ?? [],
    content: row.content,
    coverImage: row.coverImage ?? null,
    author: row.author ?? "Patashala.Dev Team",
    readingTime: row.readingTime ?? null,
    published: row.published,
    date: row.date,
    metaTitle: row.metaTitle ?? null,
    metaDescription: row.metaDescription ?? null,
    ogImage: row.ogImage ?? null,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    _count: count ?? { likes: 0, shares: 0 },
  };
}

/**
 * Build maps of like/share counts keyed by postId for the given post ids, using
 * one aggregation per collection (replaces Prisma's `_count`).
 */
async function countsFor(
  postIds: string[],
): Promise<Map<string, { likes: number; shares: number }>> {
  const result = new Map<string, { likes: number; shares: number }>();
  postIds.forEach((id) => result.set(id, { likes: 0, shares: 0 }));
  if (postIds.length === 0) return result;

  const [likeAgg, shareAgg] = await Promise.all([
    BlogLike.aggregate<{ _id: string; n: number }>([
      { $match: { postId: { $in: postIds } } },
      { $group: { _id: "$postId", n: { $sum: 1 } } },
    ]),
    BlogShare.aggregate<{ _id: string; n: number }>([
      { $match: { postId: { $in: postIds } } },
      { $group: { _id: "$postId", n: { $sum: 1 } } },
    ]),
  ]);

  for (const row of likeAgg) {
    const entry = result.get(row._id);
    if (entry) entry.likes = row.n;
  }
  for (const row of shareAgg) {
    const entry = result.get(row._id);
    if (entry) entry.shares = row.n;
  }
  return result;
}

/**
 * For public listing: prefer DB when available, fall back to config posts.
 * Config posts get synthetic IDs to keep the interface consistent.
 */
export async function getPublishedPosts(): Promise<DbBlogPost[]> {
  if (databaseConfigured) {
    try {
      await connectDB();
      const rows = (await BlogPost.find({ published: true })
        .sort({ date: -1 })
        .lean()) as unknown as LeanBlogPost[];
      const counts = await countsFor(rows.map((r) => r._id.toString()));
      return rows.map((r) => mapDb(r, counts.get(r._id.toString())));
    } catch {
      // DB unreachable — fall through to config fallback
    }
  }
  return configPosts.map(configToDb);
}

export async function getPostBySlug(slug: string): Promise<DbBlogPost | null> {
  if (databaseConfigured) {
    try {
      await connectDB();
      const row = (await BlogPost.findOne({
        slug,
        published: true,
      }).lean()) as unknown as LeanBlogPost | null;
      if (row) {
        const counts = await countsFor([row._id.toString()]);
        return mapDb(row, counts.get(row._id.toString()));
      }
      return null;
    } catch {
      // DB unreachable — fall through to config fallback
    }
  }
  const p = configPosts.find((x) => x.slug === slug);
  return p ? configToDb(p) : null;
}

export async function getAllPostsAdmin(): Promise<DbBlogPost[]> {
  if (!databaseConfigured) return [];
  try {
    await connectDB();
    const rows = (await BlogPost.find()
      .sort({ createdAt: -1 })
      .lean()) as unknown as LeanBlogPost[];
    const counts = await countsFor(rows.map((r) => r._id.toString()));
    return rows.map((r) => mapDb(r, counts.get(r._id.toString())));
  } catch {
    return [];
  }
}

export async function getPostByIdAdmin(id: string): Promise<DbBlogPost | null> {
  if (!databaseConfigured) return null;
  try {
    await connectDB();
    if (!isValidObjectId(id)) return null;
    const row = (await BlogPost.findById(id).lean()) as unknown as LeanBlogPost | null;
    if (!row) return null;
    const counts = await countsFor([row._id.toString()]);
    return mapDb(row, counts.get(row._id.toString()));
  } catch {
    return null;
  }
}

export async function getLikeCount(postId: string): Promise<number> {
  if (!databaseConfigured) return 0;
  await connectDB();
  return BlogLike.countDocuments({ postId });
}

export async function hasLiked(postId: string, visitorHash: string): Promise<boolean> {
  if (!databaseConfigured) return false;
  await connectDB();
  const like = await BlogLike.exists({ postId, visitorHash });
  return like !== null;
}

export async function toggleLike(
  postId: string,
  visitorHash: string,
): Promise<{ liked: boolean; count: number }> {
  if (!databaseConfigured) {
    return { liked: false, count: 0 };
  }

  await connectDB();
  const existing = await BlogLike.findOne({ postId, visitorHash });

  if (existing) {
    await BlogLike.deleteOne({ _id: existing._id });
  } else {
    await BlogLike.create({ postId, visitorHash });
  }

  const count = await BlogLike.countDocuments({ postId });
  return { liked: !existing, count };
}

export async function recordShare(
  postId: string,
  channel: string,
  visitorHash?: string,
): Promise<void> {
  if (!databaseConfigured) return;
  await connectDB();
  await BlogShare.create({ postId, channel, visitorHash: visitorHash ?? null });
}

// ── Config-to-DB adapter ──────────────────────────────────────────────────────

function configToDb(p: ConfigPost): DbBlogPost {
  return {
    id: `config:${p.slug}`,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    tags: [],
    content: p.sections
      .map((s) =>
        [s.heading ? `## ${s.heading}` : "", ...s.paragraphs.map((x) => x)].filter(Boolean).join("\n\n"),
      )
      .join("\n\n"),
    coverImage: null,
    author: p.author,
    readingTime: p.readingTime,
    published: true,
    date: new Date(p.date),
    metaTitle: null,
    metaDescription: null,
    ogImage: null,
    createdAt: new Date(p.date),
    updatedAt: new Date(p.date),
    _count: { likes: 0, shares: 0 },
  };
}

/** Compute a reading-time estimate from plain text. */
export function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
