import { AdminShell } from "@/components/admin/admin-shell";
import { PostForm } from "@/components/admin/post-form";
import { databaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  if (!databaseConfigured) {
    return (
      <AdminShell>
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <p className="font-semibold text-foreground">Database not configured</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Set <code className="rounded bg-muted px-1 font-mono text-xs">MONGODB_URI</code> to
            enable post creation.
          </p>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <PostForm />
    </AdminShell>
  );
}
