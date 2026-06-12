import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { connectDB, databaseConfigured } from "@/lib/db";
import { Lead } from "@/lib/models/Lead";

export const dynamic = "force-dynamic";

export async function GET() {
  const authed = await requireAdmin();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!databaseConfigured) {
    return NextResponse.json({ error: "Database not configured." }, { status: 503 });
  }

  try {
    await connectDB();
    const rows = await Lead.find()
      .sort({ createdAt: -1 })
      .select("name email phone company serviceInterest budget timeline message status createdAt")
      .lean();
    const submissions = rows.map((r) => ({ ...r, id: r._id.toString() }));

    return NextResponse.json({ submissions });
  } catch (error) {
    console.error("[admin/contact-submissions] db error:", error);
    return NextResponse.json({ error: "Failed to fetch submissions." }, { status: 500 });
  }
}
