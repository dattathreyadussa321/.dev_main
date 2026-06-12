"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Label, FieldError } from "@/components/ui/input";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { serviceInterestOptions, budgetOptions, timelineOptions } from "@/config/content";

/** Map ?service=lms style params to dropdown values for pre-selection. */
const serviceParamMap: Record<string, (typeof serviceInterestOptions)[number]> = {
  saas: "SaaS Application Development",
  fullstack: "Full-Stack Web App Development",
  lms: "Custom LMS Development",
  crm: "Custom CRM Development",
  edtech: "EdTech Product Development",
  uiux: "UI/UX Design & Frontend",
  backend: "API / Backend Development",
  mvp: "MVP Development",
  modernization: "Product Modernization",
  cloud: "Cloud Deployment & Maintenance",
  training: "Software Training Programs",
  agritech: "AgriTech / Agri Rover",
};

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const searchParams = useSearchParams();
  const [status, setStatus] = React.useState<Status>("idle");
  const [serverError, setServerError] = React.useState("");
  const [isOtherService, setIsOtherService] = React.useState(false);
  const [isCustomBudget, setIsCustomBudget] = React.useState(false);

  const preselected = serviceParamMap[searchParams.get("service") ?? ""];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      serviceInterest: preselected,
      website: "",
    },
  });

  // Destructure to intercept onChange while keeping RHF's ref/name/onBlur
  const { onChange: onServiceSelectChange, ...serviceSelectRegister } = register("serviceInterest");
  const { onChange: onBudgetSelectChange, ...budgetSelectRegister } = register("budget");

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
      setStatus("success");
      reset();
      setIsOtherService(false);
      setIsCustomBudget(false);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-success/30 bg-success/10 p-8 text-center"
      >
        <CheckCircle2 className="mx-auto size-10 text-success" aria-hidden />
        <h3 className="mt-4 text-xl font-semibold">Message received — thank you!</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We&apos;ll review your project details and reply within one business day with an honest
          read on scope, timeline, and next steps.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — hidden from real users, traps naive bots */}
      <div className="absolute -left-[9999px] top-auto" aria-hidden>
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name *</Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone *</Label>
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
        <div>
          <Label htmlFor="company">Company / Institute (optional)</Label>
          <Input
            id="company"
            autoComplete="organization"
            placeholder="Your organization"
            {...register("company")}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="serviceInterest">What do you need? *</Label>
        {!isOtherService ? (
          <Select
            id="serviceInterest"
            aria-invalid={!!errors.serviceInterest}
            defaultValue={preselected ?? ""}
            {...serviceSelectRegister}
            onChange={(e) => {
              void onServiceSelectChange(e);
              if (e.target.value === "Other") {
                setIsOtherService(true);
                setValue("serviceInterest", "");
              }
            }}
          >
            <option value="" disabled>
              Select a service
            </option>
            {serviceInterestOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2">
              <span className="text-sm text-muted-foreground">Other – describe what you need</span>
              <button
                type="button"
                className="text-xs text-primary transition-colors hover:underline"
                onClick={() => {
                  setIsOtherService(false);
                  setValue("serviceInterest", "");
                }}
              >
                ← Back to list
              </button>
            </div>
            <Input
              id="serviceInterest"
              placeholder="e.g. AI chatbot integration, custom mobile app, data pipeline…"
              aria-invalid={!!errors.serviceInterest}
              autoFocus
              {...register("serviceInterest")}
            />
          </div>
        )}
        <FieldError message={errors.serviceInterest?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="budget">Budget range (optional)</Label>
          {!isCustomBudget ? (
            <Select
              id="budget"
              defaultValue=""
              {...budgetSelectRegister}
              onChange={(e) => {
                if (e.target.value === "__custom__") {
                  setIsCustomBudget(true);
                  setValue("budget", "");
                } else {
                  void onBudgetSelectChange(e);
                }
              }}
            >
              <option value="">Select a range</option>
              {budgetOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
              <option value="__custom__">Custom…</option>
            </Select>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-3 py-2">
                <span className="text-xs text-muted-foreground">Enter your budget</span>
                <button
                  type="button"
                  className="text-xs text-primary transition-colors hover:underline"
                  onClick={() => {
                    setIsCustomBudget(false);
                    setValue("budget", "");
                  }}
                >
                  ← Back
                </button>
              </div>
              <Input
                id="budget"
                placeholder="e.g. ₹50K–75K, equity deal, monthly retainer…"
                autoFocus
                {...register("budget")}
              />
            </div>
          )}
        </div>
        <div>
          <Label htmlFor="timeline">Timeline (optional)</Label>
          <Select id="timeline" defaultValue="" {...register("timeline")}>
            <option value="">Select a timeline</option>
            {timelineOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="message">Tell us about your project *</Label>
        <Textarea
          id="message"
          placeholder="What are you building? Who is it for? What does success look like?"
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
        >
          <TriangleAlert className="size-4 shrink-0" aria-hidden />
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden /> Sending…
          </>
        ) : (
          <>
            <Send aria-hidden /> Send Message
          </>
        )}
      </Button>
      <p className="text-xs text-muted-foreground">
        We respond within one business day. Your details stay with us — no spam, no sharing.
      </p>
    </form>
  );
}
