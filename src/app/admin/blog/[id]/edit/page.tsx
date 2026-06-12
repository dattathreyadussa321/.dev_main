import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { PostForm } from "@/components/admin/post-form";
import { getPostByIdAdmin } from "@/lib/blog-db";
import { databaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  if (!databaseConfigured) {
    return (
      <AdminShell>
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center">
          <p className="font-semibold text-foreground">Database not configured</p>
        </div>
      </AdminShell>
    );
  }

  const post = await getPostByIdAdmin(id);
  if (!post) notFound();

  return (
    <AdminShell>
      <PostForm post={post} />
    </AdminShell>
  );
}
