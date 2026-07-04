"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [message, setMessage] = React.useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (new FormData(form).get("email") as string)?.trim();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="inline-flex items-center gap-3 rounded-xl border border-primary/40 bg-primary/[0.07] px-6 py-3.5 text-[15px] font-bold text-primary">
        ✓ You&apos;re on the list
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex flex-wrap gap-2.5">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          autoComplete="email"
          className={
            compact
              ? "min-w-0 flex-1 rounded-xl border border-white/[0.14] bg-white/[0.04] px-4 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:bg-primary/[0.04]"
              : "min-w-[220px] flex-1 rounded-xl border border-white/[0.14] bg-white/[0.04] px-[18px] py-3.5 text-[15px] text-foreground outline-none transition-colors focus:border-primary focus:bg-primary/[0.04] sm:min-w-[260px]"
          }
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={
            compact
              ? "rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 disabled:opacity-60"
              : "rounded-xl bg-primary px-6 py-3.5 text-[15px] font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(83,243,207,0.4)] disabled:opacity-60"
          }
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" aria-label="Subscribing…" />
          ) : (
            "Subscribe →"
          )}
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="text-xs font-medium text-destructive">
          {message}
        </p>
      )}
    </form>
  );
}
