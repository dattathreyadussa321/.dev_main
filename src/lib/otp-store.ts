import { randomBytes } from "crypto";

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 3;

interface PendingEntry {
  otp: string;
  expiresAt: number;
  attempts: number;
}

// In-memory store — survives for the lifetime of the Node.js process.
// Single-admin systems only; swap for Redis when running multiple instances.
const store = new Map<string, PendingEntry>();

/** Generate a cryptographically random 6-digit OTP string. */
export function generateOtp(): string {
  // Use random bytes to avoid Math.random() bias
  const n = randomBytes(3).readUIntBE(0, 3) % 1_000_000;
  return n.toString().padStart(6, "0");
}

/**
 * Store the OTP and return a one-time pending token the client must echo back.
 * The token is opaque — it carries no OTP information.
 */
export function createPendingToken(otp: string): string {
  const token = randomBytes(32).toString("hex");
  store.set(token, { otp, expiresAt: Date.now() + OTP_TTL_MS, attempts: 0 });
  // Opportunistic cleanup of expired entries
  if (store.size > 500) {
    const now = Date.now();
    for (const [k, v] of store) {
      if (v.expiresAt < now) store.delete(k);
    }
  }
  return token;
}

export type OtpResult = "valid" | "invalid" | "expired" | "locked";

/**
 * Verify OTP against the pending token.
 * - Deletes the entry on success (single-use).
 * - Deletes after MAX_ATTEMPTS wrong guesses (brute-force lock).
 * - Returns "expired" for unknown / timed-out tokens.
 */
export function verifyPendingOtp(token: string, otp: string): OtpResult {
  const entry = store.get(token);
  if (!entry) return "expired";

  if (Date.now() > entry.expiresAt) {
    store.delete(token);
    return "expired";
  }

  if (entry.attempts >= MAX_ATTEMPTS) {
    store.delete(token);
    return "locked";
  }

  entry.attempts++;

  if (entry.otp !== otp) {
    if (entry.attempts >= MAX_ATTEMPTS) store.delete(token);
    return "invalid";
  }

  store.delete(token); // consume — no replay
  return "valid";
}

/** Returns the milliseconds remaining for a pending token, or 0 if gone. */
export function tokenTtlMs(token: string): number {
  const entry = store.get(token);
  if (!entry) return 0;
  return Math.max(0, entry.expiresAt - Date.now());
}
