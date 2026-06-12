"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Link, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  slug: string;
  title: string;
  className?: string;
}

export function ShareButton({ slug, title, className }: ShareButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${slug}`
      : `/blog/${slug}`;

  async function recordShare(channel: string) {
    fetch(`/api/blog/${slug}/share`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channel }),
    }).catch(() => {});
  }

  async function handleShare() {
    if (loading) return;
    setLoading(true);

    // Try Web Share API first (mobile/modern browsers)
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, url });
        await recordShare("native");
        setLoading(false);
        return;
      } catch {
        // User cancelled or not supported, fall through to copy
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      await recordShare("copy");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Last resort: show the URL in a prompt
      window.prompt("Copy this link:", url);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <motion.button
        type="button"
        onClick={handleShare}
        disabled={loading}
        whileTap={{ scale: 0.85 }}
        aria-label="Share this post"
        className={cn(
          "flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200",
          "hover:border-primary/40 hover:bg-primary/5 hover:text-primary",
          loading && "pointer-events-none opacity-60",
          copied && "border-success/40 bg-success/5 text-success",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={copied ? "check" : "share"}
            initial={{ scale: 0.6, opacity: 0, rotate: copied ? 0 : -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {copied ? (
              <Check className="size-4" aria-hidden />
            ) : (
              <Share2 className="size-4" aria-hidden />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>
      <span className="text-xs font-medium text-muted-foreground" aria-live="polite">
        {copied ? "Copied!" : "Share"}
      </span>
    </div>
  );
}

/** Inline variant with just a copy-link button for use inside article content */
export function CopyLinkButton({ slug, className }: { slug: string; className?: string }) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/blog/${slug}`
        : `/blog/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy link to clipboard"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium",
        "border border-border bg-card text-muted-foreground transition-colors",
        "hover:border-primary/40 hover:text-primary",
        className,
      )}
    >
      {copied ? <Check className="size-3.5" aria-hidden /> : <Link className="size-3.5" aria-hidden />}
      {copied ? "Copied!" : "Copy link"}
    </button>
  );
}
