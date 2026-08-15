import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  verifySessionToken,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/session";

export async function setSessionCookie(email: string) {
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, createSessionToken(email), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
}

export async function getSessionEmail() {
  const store = await cookies();
  const session = verifySessionToken(store.get(ADMIN_SESSION_COOKIE)?.value);
  return session?.email ?? null;
}
