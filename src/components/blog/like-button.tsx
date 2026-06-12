"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  slug: string;
  initialCount?: number;
  className?: string;
}

export function LikeButton({ slug, initialCount = 0, className }: LikeButtonProps) {
  const [liked, setLiked] = React.useState(false);
  const [count, setCount] = React.useState(initialCount);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  // Fetch current state once on mount
  React.useEffect(() => {
    fetch(`/api/blog/${slug}/like`)
      .then((r) => r.json())
      .then((d: { liked?: boolean; count?: number }) => {
        if (typeof d.liked === "boolean") setLiked(d.liked);
        if (typeof d.count === "number") setCount(d.count);
      })
      .catch(() => {});
  }, [slug]);

  async function handleLike() {
    if (loading) return;
    setLoading(true);
    setError(false);

    // Optimistic update
    const prevLiked = liked;
    const prevCount = count;
    setLiked(!liked);
    setCount((c) => c + (liked ? -1 : 1));

    try {
      const res = await fetch(`/api/blog/${slug}/like`, { method: "POST" });
      if (!res.ok) throw new Error("failed");
      const data = (await res.json()) as { liked: boolean; count: number };
      setLiked(data.liked);
      setCount(data.count);
    } catch {
      // Revert
      setLiked(prevLiked);
      setCount(prevCount);
      setError(true);
      setTimeout(() => setError(false), 2500);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <motion.button
        type="button"
        onClick={handleLike}
        disabled={loading}
        whileTap={{ scale: 0.85 }}
        aria-label={liked ? "Unlike this post" : "Like this post"}
        aria-pressed={liked}
        className={cn(
          "group flex size-10 items-center justify-center rounded-full border transition-all duration-200",
          liked
            ? "border-rose-400/60 bg-rose-500/10 text-rose-500"
            : "border-border bg-card text-muted-foreground hover:border-rose-400/40 hover:bg-rose-500/5 hover:text-rose-500",
          loading && "pointer-events-none opacity-60",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={liked ? "liked" : "idle"}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <Heart
              className="size-4"
              fill={liked ? "currentColor" : "none"}
              aria-hidden
            />
          </motion.div>
        </AnimatePresence>
      </motion.button>
      <span
        className={cn("text-xs font-medium tabular-nums transition-colors", error ? "text-destructive" : "text-muted-foreground")}
        aria-live="polite"
      >
        {error ? "Error" : count > 0 ? count : "Like"}
      </span>
    </div>
  );
}
