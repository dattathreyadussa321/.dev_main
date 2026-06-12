import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { getPostBySlug, toggleLike, getLikeCount, hasLiked } from "@/lib/blog-db";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { databaseConfigured } from "@/lib/db";

type Params = Promise<{ slug: string }>;

function makeVisitorHash(ip: string, ua: string, slug: string): string {
  return createHash("sha256")
    .update(`${ip}:${ua}:${slug}`)
    .digest("hex")
    .slice(0, 32);
}

/** GET – return current like count and whether visitor has liked */
export async function GET(req: Request, { params }: { params: Params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Not found." }, { status: 404 });

  if (!databaseConfigured) {
    return NextResponse.json({ count: 0, liked: false });
  }

  const ip = clientIp(req);
  const ua = req.headers.get("user-agent") ?? "";
  const visitorHash = makeVisitorHash(ip, ua, slug);

  const [count, liked] = await Promise.all([getLikeCount(post.id), hasLiked(post.id, visitorHash)]);
  return NextResponse.json({ count, liked });
}

/** POST – toggle like (idempotent) */
export async function POST(req: Request, { params }: { params: Params }) {
  const ip = clientIp(req);
  if (!rateLimit(`like:${ip}`, 30, 60_000)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Not found." }, { status: 404 });

  if (!databaseConfigured) {
    return NextResponse.json({ liked: true, count: 1 });
  }

  const ua = req.headers.get("user-agent") ?? "";
  const visitorHash = makeVisitorHash(ip, ua, slug);

  const result = await toggleLike(post.id, visitorHash);
  return NextResponse.json(result);
}
