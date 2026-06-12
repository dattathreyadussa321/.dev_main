import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { blogPostUpdateSchema } from "@/lib/validations";
import { connectDB, databaseConfigured } from "@/lib/db";
import { BlogPost } from "@/lib/models/BlogPost";
import { requireAdmin } from "@/lib/admin-auth";
import { estimateReadingTime } from "@/lib/blog-db";

type Params = Promise<{ id: string }>;

export async function GET(_req: Request, { params }: { params: Params }) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  if (!databaseConfigured) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  const { id } = await params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await connectDB();
  const doc = await BlogPost.findById(id).lean();
  if (!doc) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const post = { ...doc, id: doc._id.toString() };
  return NextResponse.json({ post });
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  if (!databaseConfigured) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  const { id } = await params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Not found." }, { status: 404 });

  await connectDB();
  const existing = await BlogPost.findById(id);
  if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = blogPostUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const data = parsed.data;

  try {
    // Slug uniqueness check if slug is being changed
    if (data.slug && data.slug !== existing.slug) {
      const slugConflict = await BlogPost.findOne({ slug: data.slug });
      if (slugConflict) {
        return NextResponse.json(
          { error: "Validation failed.", fieldErrors: { slug: ["Slug already in use."] } },
          { status: 422 },
        );
      }
    }

    const update: Record<string, unknown> = {
      ...(data.slug && { slug: data.slug }),
      ...(data.title !== undefined && { title: data.title }),
      ...(data.excerpt !== undefined && { excerpt: data.excerpt }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.tags !== undefined && { tags: data.tags }),
      ...(data.content !== undefined && {
        content: data.content,
        readingTime: data.readingTime || estimateReadingTime(data.content),
      }),
      ...(data.coverImage !== undefined && { coverImage: data.coverImage || null }),
      ...(data.author !== undefined && { author: data.author }),
      ...(data.readingTime !== undefined && { readingTime: data.readingTime || null }),
      ...(data.published !== undefined && { published: data.published }),
      ...(data.date !== undefined && { date: new Date(data.date) }),
      ...(data.metaTitle !== undefined && { metaTitle: data.metaTitle || null }),
      ...(data.metaDescription !== undefined && { metaDescription: data.metaDescription || null }),
      ...(data.ogImage !== undefined && { ogImage: data.ogImage || null }),
    };

    const updatedDoc = await BlogPost.findByIdAndUpdate(id, update, { new: true }).lean();
    const post = updatedDoc ? { ...updatedDoc, id: updatedDoc._id.toString() } : null;

    return NextResponse.json({ post });
  } catch (error) {
    console.error("[admin/blog] PATCH error:", error);
    return NextResponse.json({ error: "Failed to update post." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Params }) {
  const ok = await requireAdmin();
  if (!ok) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  if (!databaseConfigured) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  const { id } = await params;
  if (!isValidObjectId(id)) return NextResponse.json({ error: "Not found." }, { status: 404 });

  try {
    await connectDB();
    const existing = await BlogPost.findById(id);
    if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });

    // Soft delete: set published=false and archive by prepending "archived:" to slug
    const archivedSlug = existing.slug.startsWith("archived:")
      ? existing.slug
      : `archived:${existing._id.toString().slice(-8)}:${existing.slug}`;

    await BlogPost.findByIdAndUpdate(id, {
      published: false,
      slug: archivedSlug.slice(0, 200),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[admin/blog] DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete post." }, { status: 500 });
  }
}
