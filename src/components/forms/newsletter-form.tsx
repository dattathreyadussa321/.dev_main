"use client";

import * as React from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

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
      setMessage("You're subscribed. Welcome aboard!");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <p className="flex items-center gap-2 rounded-xl bg-success/10 px-4 py-3 text-sm font-medium text-success">
        <Check className="size-4" /> {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder={compact ? "your@email.com" : "you@company.com"}
          autoComplete="email"
          className={compact ? "h-9 text-sm" : "h-11"}
        />
        <button
          type="submit"
          aria-label="Subscribe"
          disabled={status === "loading"}
          className={`grid shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform hover:scale-105 disabled:opacity-60 ${compact ? "size-9" : "size-11"}`}
        >
          {status === "loading" ? (
            <Loader2 className={compact ? "size-3.5 animate-spin" : "size-4 animate-spin"} />
          ) : (
            <ArrowRight className={compact ? "size-3.5" : "size-4"} />
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
