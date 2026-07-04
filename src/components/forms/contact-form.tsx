"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Input, Textarea, Label, FieldError } from "@/components/ui/input";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { cn } from "@/lib/utils";

/* Interest chips from the redesign prototype — submitted as `serviceInterest`. */
const interestOptions = [
  "A project / platform",
  "Ekkalavya (students)",
  "Training programs",
  "LMS / CRM",
  "Something else",
] as const;

/** Map ?service=lms style params to an interest chip for pre-selection. */
const serviceParamMap: Record<string, (typeof interestOptions)[number]> = {
  saas: "A project / platform",
  fullstack: "A project / platform",
  lms: "LMS / CRM",
  crm: "LMS / CRM",
  edtech: "A project / platform",
  uiux: "A project / platform",
  backend: "A project / platform",
  mvp: "A project / platform",
  modernization: "A project / platform",
  cloud: "A project / platform",
  training: "Training programs",
  agritech: "Something else",
  ekkalavya: "Ekkalavya (students)",
};

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = React.useState<Status>("idle");
  const [serverError, setServerError] = React.useState("");
  const [sentName, setSentName] = React.useState("");

  const preselected = serviceParamMap[searchParams.get("service") ?? ""] ?? interestOptions[0];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      serviceInterest: preselected,
      website: "",
    },
  });

  const interest = watch("serviceInterest");

  async function onSubmit(data: ContactInput) {
    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? "Something went wrong.");
      setSentName(data.name);
      setStatus("success");
      reset({ serviceInterest: preselected, website: "" });
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="px-4 py-16 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full border-[1.5px] border-primary bg-primary/[0.12] text-[26px] text-primary">
          ✓
        </div>
        <div className="mt-6 font-display text-[26px] font-semibold">Message sent</div>
        <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/60">
          Thanks, {sentName || "friend"}. We&apos;ll reply within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 rounded-xl border border-white/[0.16] bg-white/[0.06] px-[22px] py-3 text-sm font-bold text-foreground transition-colors hover:border-primary/50"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-[18px]">
      <div className="font-display text-[22px] font-semibold">Start the conversation</div>

      {/* Honeypot — hidden from real users, traps naive bots */}
      <div className="absolute -left-[9999px] top-auto" aria-hidden>
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {/* Interest chips → serviceInterest */}
      <div className="grid gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/50">
          I&apos;m interested in
        </span>
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="I'm interested in">
          {interestOptions.map((label) => {
            const on = interest === label;
            return (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() =>
                  setValue("serviceInterest", label, { shouldValidate: true })
                }
                className={cn(
                  "rounded-full px-4 py-[9px] text-[13.5px] transition-colors",
                  on
                    ? "border border-primary/70 bg-primary/[0.12] font-bold text-primary"
                    : "border border-white/[0.14] bg-white/[0.03] font-normal text-foreground/70 hover:border-primary/50",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
        <FieldError message={errors.serviceInterest?.message} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name" className="mb-0">
            Name
          </Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email" className="mb-0">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="phone" className="mb-0">
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 ..."
            aria-invalid={!!errors.phone}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company" className="mb-0">
            Company <span className="normal-case text-foreground/35">(optional)</span>
          </Label>
          <Input
            id="company"
            autoComplete="organization"
            placeholder="Your organization"
            {...register("company")}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message" className="mb-0">
          Message
        </Label>
        <Textarea
          id="message"
          rows={5}
          className="min-h-0"
          placeholder="Tell us about your product, institute, or placement goals…"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="rounded-[10px] border border-destructive/30 bg-destructive/[0.08] px-3.5 py-2.5 text-[13.5px] text-destructive"
        >
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-primary p-4 text-base font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(83,243,207,0.4)] disabled:pointer-events-none disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          <>Send message →</>
        )}
      </button>
      <p className="text-center text-xs text-foreground/40">
        Replies within one business day. No spam, ever.
      </p>
    </form>
  );
}
