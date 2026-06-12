import Link from "next/link";
import { Inbox, PenLine, BarChart3, ArrowRight } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { connectDB, databaseConfigured } from "@/lib/db";
import { Lead } from "@/lib/models/Lead";
import { BlogPost } from "@/lib/models/BlogPost";

export const dynamic = "force-dynamic";

async function getStats() {
  if (!databaseConfigured) return null;
  try {
    await connectDB();
    const [submissions, posts, published] = await Promise.all([
      Lead.countDocuments(),
      BlogPost.countDocuments(),
      BlogPost.countDocuments({ published: true }),
    ]);
    return { submissions, posts, published };
  } catch {
    return null;
  }
}

const dashCards = [
  {
    href: "/admin/contact-submissions",
    icon: Inbox,
    title: "Contact Submissions",
    description: "View all contact form enquiries from the website.",
    accent: "from-blue-500/10 to-blue-500/5 border-blue-500/20 hover:border-blue-500/40",
    iconColor: "text-blue-500",
    badge: "submissions" as const,
  },
  {
    href: "/admin/blog/new",
    icon: PenLine,
    title: "New Blog Post",
    description: "Write and publish a new article or case note.",
    accent: "from-primary/10 to-primary/5 border-primary/20 hover:border-primary/40",
    iconColor: "text-primary",
    badge: null,
  },
  {
    href: "/admin/blog",
    icon: BarChart3,
    title: "Blog Activity",
    description: "Manage, publish, and review all blog posts.",
    accent: "from-violet-500/10 to-violet-500/5 border-violet-500/20 hover:border-violet-500/40",
    iconColor: "text-violet-500",
    badge: "posts" as const,
  },
];

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const badgeValue = (key: "submissions" | "posts" | null) => {
    if (!stats || !key) return null;
    return key === "submissions" ? stats.submissions : stats.posts;
  };

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your content and track enquiries from one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {dashCards.map(({ href, icon: Icon, title, description, accent, iconColor, badge }) => {
          const count = badgeValue(badge);
          return (
            <Link
              key={href}
              href={href}
              className={`group relative flex flex-col rounded-2xl border bg-gradient-to-br p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${accent}`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className={`rounded-xl bg-background/60 p-3 ${iconColor}`}>
                  <Icon className="size-6" aria-hidden />
                </div>
                {count != null && (
                  <span className="rounded-full bg-background/70 px-2.5 py-1 text-xs font-semibold tabular-nums text-foreground">
                    {count}
                  </span>
                )}
              </div>

              <h2 className="font-semibold text-foreground">{title}</h2>
              <p className="mt-1 flex-1 text-sm text-muted-foreground">{description}</p>

              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                Open
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </div>
            </Link>
          );
        })}
      </div>

      {!databaseConfigured && (
        <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 text-sm text-amber-700 dark:text-amber-400">
          <strong>Database not connected.</strong> Set{" "}
          <code className="rounded bg-muted px-1 font-mono text-xs">MONGODB_URI</code> in your
          environment to enable submission storage and live counts.
        </div>
      )}
    </AdminShell>
  );
}
