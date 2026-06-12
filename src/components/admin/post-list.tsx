"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit2, Eye, Trash2, Globe, EyeOff, Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DbBlogPost } from "@/lib/blog-db";

interface PostListProps {
  posts: DbBlogPost[];
}

function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        published
          ? "bg-success/10 text-success"
          : "bg-muted text-muted-foreground",
      )}
    >
      {published ? (
        <Globe className="size-3" aria-hidden />
      ) : (
        <EyeOff className="size-3" aria-hidden />
      )}
      {published ? "Published" : "Draft"}
    </span>
  );
}

export function PostList({ posts }: PostListProps) {
  const router = useRouter();
  const [deleting, setDeleting] = React.useState<string | null>(null);
  const [toggling, setToggling] = React.useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = React.useState<string | null>(null);

  async function handleTogglePublish(post: DbBlogPost) {
    setToggling(post.id);
    try {
      await fetch(`/api/admin/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: !post.published }),
      });
      router.refresh();
    } finally {
      setToggling(null);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(id);
    try {
      await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
      setConfirmDelete(null);
      router.refresh();
    } finally {
      setDeleting(null);
    }
  }

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
        <p className="font-medium">No posts yet</p>
        <p className="mt-1 text-sm">Create your first post to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/30">
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Title</th>
            <th className="hidden px-4 py-3 text-left font-medium text-muted-foreground sm:table-cell">Category</th>
            <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
            <th className="hidden px-4 py-3 text-right font-medium text-muted-foreground lg:table-cell">Likes</th>
            <th className="px-4 py-3 text-right font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, i) => (
            <tr
              key={post.id}
              className={cn(
                "border-b border-border transition-colors last:border-0",
                i % 2 === 0 ? "bg-card" : "bg-muted/10",
              )}
            >
              <td className="max-w-xs px-4 py-3">
                <p className="truncate font-medium text-foreground">{post.title}</p>
                <p className="truncate text-xs text-muted-foreground">/blog/{post.slug}</p>
              </td>
              <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                {post.category}
              </td>
              <td className="px-4 py-3">
                <StatusBadge published={post.published} />
              </td>
              <td className="hidden px-4 py-3 text-right text-muted-foreground lg:table-cell">
                <span className="inline-flex items-center gap-1">
                  <Heart className="size-3.5 text-rose-400" aria-hidden />
                  {post._count?.likes ?? 0}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  {post.published && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      aria-label="View post"
                      className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <Eye className="size-3.5" aria-hidden />
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => handleTogglePublish(post)}
                    disabled={toggling === post.id}
                    aria-label={post.published ? "Unpublish post" : "Publish post"}
                    className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
                  >
                    {toggling === post.id ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : post.published ? (
                      <EyeOff className="size-3.5" aria-hidden />
                    ) : (
                      <Globe className="size-3.5" aria-hidden />
                    )}
                  </button>
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    aria-label="Edit post"
                    className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                  >
                    <Edit2 className="size-3.5" aria-hidden />
                  </Link>
                  {confirmDelete === post.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleDelete(post.id)}
                        disabled={deleting === post.id}
                        className="rounded-lg bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive transition-colors hover:bg-destructive/20 disabled:opacity-50"
                      >
                        {deleting === post.id ? <Loader2 className="size-3 animate-spin" /> : "Confirm"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDelete(null)}
                        className="rounded-lg px-2 py-1 text-xs text-muted-foreground hover:bg-muted"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(post.id)}
                      aria-label="Delete post"
                      className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="size-3.5" aria-hidden />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
