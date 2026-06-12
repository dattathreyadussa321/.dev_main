import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { getPostBySlug, recordShare } from "@/lib/blog-db";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { z } from "zod";

type Params = Promise<{ slug: string }>;

const shareSchema = z.object({
  channel: z.enum(["native", "copy", "twitter", "linkedin", "whatsapp"]),
});

export async function POST(req: Request, { params }: { params: Params }) {
  const ip = clientIp(req);
  if (!rateLimit(`share:${ip}`, 20, 60_000)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return NextResponse.json({ error: "Not found." }, { status: 404 });

  const body = await req.json().catch(() => null);
  const parsed = shareSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid channel." }, { status: 400 });
  }

  const ua = req.headers.get("user-agent") ?? "";
  const visitorHash = createHash("sha256").update(`${ip}:${ua}`).digest("hex").slice(0, 24);
  await recordShare(post.id, parsed.data.channel, visitorHash);

  return NextResponse.json({ ok: true });
}
