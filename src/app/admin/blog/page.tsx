import { getAllPostsAdmin } from "@/lib/blog-db";
import { AdminShell } from "@/components/admin/admin-shell";
import { PostList } from "@/components/admin/post-list";
import { databaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  if (!databaseConfigured) {
    return (
      <AdminShell>
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <p className="font-semibold text-foreground">Database not configured</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Set <code className="rounded bg-muted px-1 font-mono text-xs">MONGODB_URI</code> to
            enable the admin blog editor.
          </p>
        </div>
      </AdminShell>
    );
  }

  const posts = await getAllPostsAdmin();
  const publishedCount = posts.filter((p) => p.published).length;

  return (
    <AdminShell>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {posts.length} total · {publishedCount} published · {posts.length - publishedCount} drafts
          </p>
        </div>
      </div>

      <PostList posts={posts} />
    </AdminShell>
  );
}
