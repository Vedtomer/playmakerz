import crypto from "crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_DAYS = 7;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(email: string) {
  const payload = JSON.stringify({
    email,
    exp: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token: string | undefined): { email: string } | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  if (sign(encoded) !== signature) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
    if (typeof payload.exp !== "number" || Date.now() > payload.exp) return null;
    return { email: payload.email };
  } catch {
    return null;
  }
}

export const SESSION_MAX_AGE_SECONDS = SESSION_DAYS * 24 * 60 * 60;
