export const ADMIN_SESSION_COOKIE = "admin_session";
const DEFAULT_SESSION_DAYS = 1;
const REMEMBER_ME_DAYS = 60;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

async function getKey() {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toHex(buf: ArrayBuffer) {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sign(value: string) {
  const key = await getKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return toHex(sig);
}

export async function createSessionToken(email: string, rememberMe: boolean) {
  const days = rememberMe ? REMEMBER_ME_DAYS : DEFAULT_SESSION_DAYS;
  const payload = JSON.stringify({
    email,
    exp: Date.now() + days * 24 * 60 * 60 * 1000,
  });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = await sign(encoded);
  return `${encoded}.${signature}`;
}

export function sessionMaxAgeSeconds(rememberMe: boolean) {
  return (rememberMe ? REMEMBER_ME_DAYS : DEFAULT_SESSION_DAYS) * 24 * 60 * 60;
}

export async function verifySessionToken(
  token: string | undefined
): Promise<{ email: string } | null> {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  if ((await sign(encoded)) !== signature) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}
