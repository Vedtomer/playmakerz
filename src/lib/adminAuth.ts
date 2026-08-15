import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  createSessionToken,
  verifySessionToken,
  sessionMaxAgeSeconds,
} from "@/lib/session";

export async function setSessionCookie(email: string, rememberMe: boolean) {
  const store = await cookies();
  const token = await createSessionToken(email, rememberMe);
  store.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: sessionMaxAgeSeconds(rememberMe),
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
}

export async function getSessionEmail() {
  const store = await cookies();
  const session = await verifySessionToken(store.get(ADMIN_SESSION_COOKIE)?.value);
  return session?.email ?? null;
}
