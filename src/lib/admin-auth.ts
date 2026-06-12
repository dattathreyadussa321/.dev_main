import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "pdadmin";
const SESSION_MSG = "admin:authenticated:v1";

/** Sign a session token using ADMIN_TOKEN as the HMAC key. */
export function signAdminSession(adminToken: string): string {
  return createHmac("sha256", adminToken).update(SESSION_MSG).digest("hex");
}

/** Timing-safe verification for Node runtime (API routes). */
export function verifyAdminSession(cookie: string | undefined, adminToken: string | undefined): boolean {
  if (!cookie || !adminToken) return false;
  const expected = signAdminSession(adminToken);
  try {
    const a = Buffer.from(cookie, "hex");
    const b = Buffer.from(expected, "hex");
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/** Server-action/route helper: reads cookie and verifies in Node runtime. */
export async function requireAdmin(): Promise<boolean> {
  const adminToken = process.env.ADMIN_TOKEN;
  if (!adminToken) return false;
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSession(cookie, adminToken);
}

/** Returns false when ADMIN_TOKEN env var is missing. */
export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_TOKEN);
}
