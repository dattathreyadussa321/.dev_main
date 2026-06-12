import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { connectDB, databaseConfigured } from "@/lib/db";
import { NewsletterSubscriber } from "@/lib/models/NewsletterSubscriber";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const ip = clientIp(req);
    if (!rateLimit(`newsletter:${ip}`, 3)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 },
      );
    }

    const body = await req.json().catch(() => null);
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
    }

    if (databaseConfigured) {
      await connectDB();
      await NewsletterSubscriber.findOneAndUpdate(
        { email: parsed.data.email },
        { active: true },
        { upsert: true, setDefaultsOnInsert: true },
      );
    } else {
      console.warn("[newsletter] MONGODB_URI not configured; subscription not persisted");
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[newsletter] unexpected error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
