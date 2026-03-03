import { cookies } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";

const ADMIN_COOKIE = "admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function sessionToken(): string {
  const secret = process.env.ADMIN_PASSWORD ?? "";
  return createHash("sha256").update(secret + "sparkle-admin").digest("hex");
}

export function getAdminSessionToken(): string {
  return sessionToken();
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(ADMIN_COOKIE)?.value;
  const expected = sessionToken();
  if (!cookie || !expected || cookie.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(cookie, "utf8"), Buffer.from(expected, "utf8"));
  } catch {
    return false;
  }
}

export async function requireAdmin(): Promise<{ ok: true } | { ok: false; status: number; body: object }> {
  const ok = await isAdmin();
  if (ok) return { ok: true };
  return { ok: false, status: 401, body: { error: "Unauthorized" } };
}
