import { AdminShell } from "@/components/admin/admin-shell";
import { connectDB, databaseConfigured } from "@/lib/db";
import { Lead } from "@/lib/models/Lead";
import { Inbox, Mail, Phone, Building2, Calendar, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATUS_STYLES: Record<string, string> = {
  NEW: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  CONTACTED: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  QUALIFIED: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  PROPOSAL_SENT: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  WON: "bg-success/10 text-success",
  LOST: "bg-muted text-muted-foreground",
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceInterest: string;
  budget: string | null;
  timeline: string | null;
  message: string;
  status: string;
  createdAt: Date;
}

async function getSubmissions(): Promise<Submission[] | null> {
  if (!databaseConfigured) return [];
  try {
    await connectDB();
    const rows = await Lead.find()
      .sort({ createdAt: -1 })
      .select("name email phone company serviceInterest budget timeline message status createdAt")
      .lean();
    return rows.map((r) => ({
      id: r._id.toString(),
      name: r.name,
      email: r.email,
      phone: r.phone ?? null,
      company: r.company ?? null,
      serviceInterest: r.serviceInterest,
      budget: r.budget ?? null,
      timeline: r.timeline ?? null,
      message: r.message,
      status: r.status ?? "NEW",
      createdAt: r.createdAt,
    }));
  } catch {
    return null; // signals a DB error
  }
}

export default async function ContactSubmissionsPage() {
  if (!databaseConfigured) {
    return (
      <AdminShell>
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <p className="font-semibold">Database not configured</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Set{" "}
            <code className="rounded bg-muted px-1 font-mono text-xs">MONGODB_URI</code> to view
            contact submissions.
          </p>
        </div>
      </AdminShell>
    );
  }

  const submissions = await getSubmissions();

  if (submissions === null) {
    return (
      <AdminShell>
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <p className="font-semibold">Failed to load submissions</p>
          <p className="mt-2 text-sm text-muted-foreground">
            A database error occurred. Check server logs.
          </p>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contact Submissions</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {submissions.length === 0
              ? "No submissions yet."
              : `${submissions.length} submission${submissions.length !== 1 ? "s" : ""} — newest first`}
          </p>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center text-muted-foreground">
          <Inbox className="mb-4 size-10 opacity-40" aria-hidden />
          <p className="font-medium">No enquiries yet</p>
          <p className="mt-1 text-sm">
            Submissions from the contact form will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((s, i) => (
            <div
              key={s.id}
              className={cn(
                "rounded-2xl border border-border bg-card p-5 sm:p-6",
                i === 0 && "border-primary/20 ring-1 ring-primary/10",
              )}
            >
              {/* Header row */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-foreground">{s.name}</h2>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide",
                        STATUS_STYLES[s.status] ?? "bg-muted text-muted-foreground",
                      )}
                    >
                      {s.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm font-medium text-primary">{s.serviceInterest}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="size-3.5" aria-hidden />
                  {formatDate(s.createdAt)}
                </div>
              </div>

              {/* Contact grid */}
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <a
                  href={`mailto:${s.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="size-3.5 shrink-0" aria-hidden />
                  <span className="truncate">{s.email}</span>
                </a>

                {s.phone && (
                  <a
                    href={`tel:${s.phone}`}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone className="size-3.5 shrink-0" aria-hidden />
                    {s.phone}
                  </a>
                )}

                {s.company && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="size-3.5 shrink-0" aria-hidden />
                    <span className="truncate">{s.company}</span>
                  </div>
                )}
              </div>

              {/* Budget + timeline pills */}
              {(s.budget ?? s.timeline) && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.budget && (
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      Budget: {s.budget}
                    </span>
                  )}
                  {s.timeline && (
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      Timeline: {s.timeline}
                    </span>
                  )}
                </div>
              )}

              {/* Message */}
              <div className="mt-4 rounded-xl bg-muted/40 p-4">
                <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  <MessageSquare className="size-3" aria-hidden />
                  Message
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {s.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
