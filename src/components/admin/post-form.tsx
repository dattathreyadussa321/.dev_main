"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, Save, Globe, EyeOff } from "lucide-react";
import { blogPostSchema, type BlogPostInput } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { DbBlogPost } from "@/lib/blog-db";

interface PostFormProps {
  post?: DbBlogPost;
}

const BLOG_CATEGORIES = ["Consulting", "Engineering", "Training", "LMS", "CRM", "AgriTech", "SaaS", "Full-Stack", "Case Notes"] as const;

/** Format a Date as YYYY-MM-DDTHH:mm in IST for datetime-local inputs. */
function toISTLocal(date: Date | string): string {
  return new Date(date)
    .toLocaleString("sv-SE", { timeZone: "Asia/Kolkata" })
    .replace(" ", "T")
    .slice(0, 16);
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 200);
}

function Field({
  label,
  error,
  required,
  children,
  hint,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-destructive" aria-hidden>*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p role="alert" className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const isEdit = Boolean(post);
  const [serverError, setServerError] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [saveStatus, setSaveStatus] = React.useState<"idle" | "saved" | "error">("idle");
  const [preview, setPreview] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<BlogPostInput>({
    resolver: zodResolver(blogPostSchema) as Resolver<BlogPostInput>,
    defaultValues: post
      ? {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          category: post.category,
          tags: post.tags,
          content: post.content,
          coverImage: post.coverImage ?? "",
          author: post.author,
          readingTime: post.readingTime ?? "",
          published: post.published,
          date: toISTLocal(post.date),
          metaTitle: post.metaTitle ?? "",
          metaDescription: post.metaDescription ?? "",
          ogImage: post.ogImage ?? "",
        }
      : {
          author: "Patashala.Dev Team",
          published: false,
          tags: [],
          date: toISTLocal(new Date()),
        },
  });

  const titleValue = useWatch({ control, name: "title" });
  const contentValue = useWatch({ control, name: "content" });
  const excerptValue = useWatch({ control, name: "excerpt" });
  const published = useWatch({ control, name: "published" });

  // Auto-generate slug from title (new posts only, disabled once user edits slug)
  const [autoSlugEnabled, setAutoSlugEnabled] = React.useState(!isEdit);
  React.useEffect(() => {
    if (autoSlugEnabled && titleValue) {
      setValue("slug", slugify(titleValue), { shouldValidate: false });
    }
  }, [titleValue, autoSlugEnabled, setValue]);

  async function onSubmit(data: BlogPostInput, publishNow?: boolean) {
    setSaving(true);
    setServerError("");
    const payload = { ...data, published: publishNow ?? data.published };

    try {
      const url = isEdit ? `/api/admin/blog/${post!.id}` : "/api/admin/blog";
      const method = isEdit ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; post?: unknown; error?: string; fieldErrors?: Record<string, string[]> };

      if (!res.ok) {
        if (json.fieldErrors) {
          for (const [field, msgs] of Object.entries(json.fieldErrors)) {
            setError(field as keyof BlogPostInput, { message: msgs[0] });
          }
        }
        setServerError(json.error ?? "Failed to save post.");
        setSaveStatus("error");
        return;
      }

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);

      if (!isEdit && json.post) {
        const newPost = json.post as { id: string };
        router.push(`/admin/blog/${newPost.id}/edit`);
        router.refresh();
      } else {
        router.refresh();
      }
    } catch {
      setServerError("Network error. Please try again.");
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit((d) => onSubmit(d))} className="space-y-8" noValidate>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold">{isEdit ? "Edit post" : "New post"}</h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreview((v) => !v)}
            className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-4 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Eye className="size-4" aria-hidden />
            {preview ? "Edit" : "Preview"}
          </button>

          <button
            type="submit"
            disabled={saving}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-all",
              "bg-card border border-border text-foreground hover:-translate-y-0.5 hover:shadow-md",
              saving && "pointer-events-none opacity-60",
            )}
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" aria-hidden />}
            {saveStatus === "saved" ? "Saved!" : saveStatus === "error" ? "Error" : "Save draft"}
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={handleSubmit((d) => onSubmit(d, !published))}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium transition-all",
              published
                ? "bg-muted text-muted-foreground hover:bg-muted/80"
                : "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:-translate-y-0.5",
              saving && "pointer-events-none opacity-60",
            )}
          >
            {published ? (
              <><EyeOff className="size-4" aria-hidden /> Unpublish</>
            ) : (
              <><Globe className="size-4" aria-hidden /> Publish</>
            )}
          </button>
        </div>
      </div>

      {serverError && (
        <p role="alert" className="rounded-xl bg-destructive/10 p-3 text-sm font-medium text-destructive">
          {serverError}
        </p>
      )}

      {preview ? (
        /* Preview panel */
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-10">
          <h2 className="mb-2 text-2xl font-bold">{titleValue || "Untitled"}</h2>
          <div className="mb-4 text-sm text-muted-foreground">{excerptValue}</div>
          <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm text-muted-foreground">
            {contentValue}
          </div>
        </div>
      ) : (
        /* Edit fields */
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div className="space-y-5">
            <Field label="Title" required error={errors.title?.message}>
              <Input
                {...register("title")}
                placeholder="Article title"
                aria-invalid={!!errors.title}
                className="text-lg font-medium"
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Slug"
                required
                error={errors.slug?.message}
                hint="URL-safe, lowercase, hyphens only"
              >
                <Input
                  {...register("slug", {
                    onChange: () => setAutoSlugEnabled(false),
                  })}
                  placeholder="my-article-slug"
                  aria-invalid={!!errors.slug}
                />
              </Field>
              <Field label="Category" required error={errors.category?.message}>
                <select
                  {...register("category")}
                  aria-invalid={!!errors.category}
                  className={cn(
                    "flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0",
                    "disabled:cursor-not-allowed disabled:opacity-50",
                  )}
                >
                  <option value="">Select category</option>
                  {BLOG_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Excerpt" required error={errors.excerpt?.message} hint="Shown in listings and meta description. 1–2 sentences.">
              <textarea
                {...register("excerpt")}
                rows={3}
                placeholder="A short, compelling summary of this article…"
                aria-invalid={!!errors.excerpt}
                className={cn(
                  "flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm leading-relaxed",
                  "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                  "resize-none",
                  errors.excerpt && "border-destructive focus:ring-destructive",
                )}
              />
            </Field>

            <Field label="Content" required error={errors.content?.message} hint="Markdown headings (## Heading) will create sections.">
              <textarea
                {...register("content")}
                rows={20}
                placeholder="Write your article content here…&#10;&#10;## Section heading&#10;&#10;Paragraph text…"
                aria-invalid={!!errors.content}
                className={cn(
                  "flex w-full rounded-xl border border-input bg-background px-3 py-2 font-mono text-sm leading-relaxed",
                  "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                  "resize-y",
                  errors.content && "border-destructive focus:ring-destructive",
                )}
              />
            </Field>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Settings</p>
              <div className="space-y-4">
                <Field label="Cover image URL" error={errors.coverImage?.message}>
                  <Input {...register("coverImage")} placeholder="https://…" />
                </Field>
                <Field label="Author" error={errors.author?.message}>
                  <Input {...register("author")} />
                </Field>
                <Field label="Reading time" error={errors.readingTime?.message} hint="Auto-calculated if blank">
                  <Input {...register("readingTime")} placeholder="5 min read" />
                </Field>
                <Field label="Publish date" error={errors.date?.message}>
                  <Input {...register("date")} type="datetime-local" />
                </Field>
                <Field label="Tags" hint="Comma-separated">
                  <Input
                    placeholder="LMS, performance, Next.js"
                    defaultValue={post?.tags.join(", ") ?? ""}
                    onChange={(e) => {
                      const tags = e.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean);
                      setValue("tags", tags);
                    }}
                  />
                </Field>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">SEO</p>
              <div className="space-y-4">
                <Field label="Meta title" hint="Defaults to title if blank" error={errors.metaTitle?.message}>
                  <Input {...register("metaTitle")} placeholder="SEO title (max 120 chars)" />
                </Field>
                <Field label="Meta description" hint="Defaults to excerpt if blank" error={errors.metaDescription?.message}>
                  <textarea
                    {...register("metaDescription")}
                    rows={3}
                    placeholder="SEO description (max 320 chars)"
                    className={cn(
                      "flex w-full rounded-xl border border-input bg-background px-3 py-2 text-sm",
                      "placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none",
                    )}
                  />
                </Field>
                <Field label="OG image URL" error={errors.ogImage?.message}>
                  <Input {...register("ogImage")} placeholder="https://… (1200×630)" />
                </Field>
              </div>
            </div>

            {/* Status summary */}
            <div className={cn(
              "rounded-2xl border p-4 text-sm",
              published ? "border-success/30 bg-success/5 text-success" : "border-border bg-muted/30 text-muted-foreground",
            )}>
              {published
                ? "✓ This post is publicly visible."
                : "This post is saved as a draft and not publicly visible."}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
