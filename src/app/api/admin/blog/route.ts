import { NextResponse } from "next/server";
import { blogPostSchema } from "@/lib/validations";
import { connectDB, databaseConfigured } from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllPostsAdmin } from "@/lib/blog-db";
import { estimateReadingTime } from "@/lib/blog-db";

export async function GET() {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  if (!databaseConfigured) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  try {
    const posts = await getAllPostsAdmin();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("[admin/blog] GET error:", error);
    return NextResponse.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  if (!databaseConfigured) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const parsed = blogPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  try {
    await connectDB();

    // Check slug uniqueness
    const existing = await BlogPost.findOne({ slug: data.slug });
    if (existing) {
      return NextResponse.json(
        { error: "Validation failed.", fieldErrors: { slug: ["Slug already in use."] } },
        { status: 422 },
      );
    }

    const created = await BlogPost.create({
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      tags: data.tags ?? [],
      content: data.content,
      coverImage: data.coverImage || null,
      author: data.author ?? "Patashala.Dev Team",
      readingTime: data.readingTime || estimateReadingTime(data.content),
      published: data.published ?? false,
      date: data.date ? new Date(data.date) : new Date(),
      metaTitle: data.metaTitle || null,
      metaDescription: data.metaDescription || null,
      ogImage: data.ogImage || null,
    });

    // Expose `id` (the form redirects to /admin/blog/${post.id}/edit on create).
    const post = { ...created.toObject(), id: created._id.toString() };
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error("[admin/blog] POST error:", error);
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
  }
}
