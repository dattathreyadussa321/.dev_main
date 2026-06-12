"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, ShieldCheck, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";

// ── OTP 6-box input ───────────────────────────────────────────────────────────

function OtpBoxes({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  function focus(i: number) {
    refs.current[i]?.focus();
  }

  function handleChange(i: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1);
    const next = (value + "      ").slice(0, 6).split("");
    next[i] = digit;
    const joined = next.join("").trimEnd();
    onChange(joined.slice(0, 6));
    if (digit && i < 5) focus(i + 1);
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (!value[i] && i > 0) {
        // erase previous box
        const next = value.split("");
        next[i - 1] = "";
        onChange(next.join("").slice(0, 6));
        focus(i - 1);
      } else {
        const next = value.split("");
        next[i] = "";
        onChange(next.join("").slice(0, 6));
      }
      e.preventDefault();
    }
    if (e.key === "ArrowLeft" && i > 0) focus(i - 1);
    if (e.key === "ArrowRight" && i < 5) focus(i + 1);
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted);
    focus(Math.min(pasted.length, 5));
  }

  return (
    <div className="flex justify-center gap-2.5">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] ?? ""}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={i === 0 ? handlePaste : undefined}
          onClick={() => focus(i)}
          autoFocus={i === 0}
          className={`
            h-12 w-10 rounded-xl border text-center text-lg font-bold tabular-nums
            bg-background text-foreground
            focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all
            ${value[i] ? "border-primary/60" : "border-border"}
          `}
        />
      ))}
    </div>
  );
}

// ── Countdown timer ───────────────────────────────────────────────────────────

function Countdown({
  seconds,
  onExpire,
}: {
  seconds: number;
  onExpire: () => void;
}) {
  const [remaining, setRemaining] = React.useState(seconds);
  const expiredRef = React.useRef(false);

  React.useEffect(() => {
    expiredRef.current = false;
    setRemaining(seconds);
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!expiredRef.current) {
            expiredRef.current = true;
            onExpire();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
  const secs = String(remaining % 60).padStart(2, "0");
  const urgent = remaining <= 60;

  return (
    <span className={urgent ? "text-destructive font-semibold" : "text-muted-foreground"}>
      {mins}:{secs}
    </span>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

type Phase = "password" | "otp";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/admin";

  // Phase 1
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);

  // Phase 2
  const [otp, setOtp] = React.useState("");
  const [pendingToken, setPendingToken] = React.useState("");
  const [otpExpired, setOtpExpired] = React.useState(false);

  const [phase, setPhase] = React.useState<Phase>("password");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  // ── Step 1: password ──────────────────────────────────────────────────────

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        step?: string;
        pendingToken?: string;
        error?: string;
      };
      if (!res.ok || data.error) {
        setError(data.error ?? "Invalid password.");
        return;
      }
      if (data.step === "otp" && data.pendingToken) {
        setPendingToken(data.pendingToken);
        setOtpExpired(false);
        setOtp("");
        setPhase("otp");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // ── Step 2: OTP ───────────────────────────────────────────────────────────

  async function handleOtpSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (otp.length !== 6) { setError("Enter all 6 digits."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pendingToken, otp }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Invalid OTP.");
        // If expired/locked on server, also expire locally
        if (data.error?.toLowerCase().includes("start over")) resetToPassword();
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function resetToPassword() {
    setPhase("password");
    setPassword("");
    setPendingToken("");
    setOtp("");
    setOtpExpired(false);
    setError("");
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-primary/10">
            {phase === "otp" ? (
              <ShieldCheck className="size-7 text-primary" aria-hidden />
            ) : (
              <Lock className="size-7 text-primary" aria-hidden />
            )}
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {phase === "otp" ? "Verify your identity" : "Admin Login"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {phase === "otp"
              ? "Enter the 6-digit code sent to your admin email."
              : "Patashala.Dev · Admin Panel"}
          </p>
        </div>

        {/* ── Phase 1: password ── */}
        {phase === "password" && (
          <form
            onSubmit={handlePasswordSubmit}
            className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lg"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                  Admin password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoFocus
                    autoComplete="current-password"
                    aria-describedby={error ? "login-error" : undefined}
                    aria-invalid={!!error}
                    className="pr-11"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    aria-label={show ? "Hide password" : "Show password"}
                    onClick={() => setShow((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p id="login-error" role="alert" className="text-sm font-medium text-destructive">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !password}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:pointer-events-none disabled:opacity-50"
              >
                {loading && <Loader2 className="size-4 animate-spin" />}
                {loading ? "Sending OTP…" : "Continue"}
              </button>
            </div>
          </form>
        )}

        {/* ── Phase 2: OTP ── */}
        {phase === "otp" && (
          <form
            onSubmit={handleOtpSubmit}
            className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lg"
          >
            <div className="space-y-5">
              {/* Countdown */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Code expires in</span>
                {otpExpired ? (
                  <span className="font-semibold text-destructive">Expired</span>
                ) : (
                  <Countdown seconds={300} onExpire={() => setOtpExpired(true)} />
                )}
              </div>

              {otpExpired ? (
                <div className="rounded-xl bg-destructive/10 p-4 text-center text-sm text-destructive">
                  Your OTP has expired. Click &quot;Start over&quot; to request a new code.
                </div>
              ) : (
                <OtpBoxes value={otp} onChange={setOtp} disabled={loading} />
              )}

              {error && (
                <p role="alert" className="text-center text-sm font-medium text-destructive">
                  {error}
                </p>
              )}

              {!otpExpired && (
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:pointer-events-none disabled:opacity-50"
                >
                  {loading && <Loader2 className="size-4 animate-spin" />}
                  {loading ? "Verifying…" : "Verify & Log in"}
                </button>
              )}

              <button
                type="button"
                onClick={resetToPassword}
                className="flex w-full items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="size-3.5" aria-hidden />
                Start over
              </button>
            </div>
          </form>
        )}

        {/* Step indicator */}
        <div className="mt-5 flex items-center justify-center gap-2">
          <div className={`h-1.5 w-6 rounded-full transition-colors ${phase === "password" ? "bg-primary" : "bg-muted"}`} />
          <div className={`h-1.5 w-6 rounded-full transition-colors ${phase === "otp" ? "bg-primary" : "bg-muted"}`} />
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Step {phase === "password" ? "1" : "2"} of 2
        </p>
      </div>
    </div>
  );
}
