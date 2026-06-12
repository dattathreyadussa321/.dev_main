import { NextResponse } from "next/server";
import { getPublishedPosts } from "@/lib/blog-db";

export async function GET() {
  try {
    const posts = await getPublishedPosts();
    return NextResponse.json({ posts });
  } catch (err) {
    console.error("[api/blog] GET error:", err);
    return NextResponse.json({ error: "Failed to load posts." }, { status: 500 });
  }
}
