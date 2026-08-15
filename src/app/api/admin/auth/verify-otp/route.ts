import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { hashOtp } from "@/lib/otp";
import { setSessionCookie } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const { email, otp, rememberMe } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ error: "Missing email or code" }, { status: 400 });
  }

  const pool = getPool();
  const [rows] = await pool.execute(
    `SELECT id FROM admin_otps
     WHERE email = ? AND otp_hash = ? AND consumed = 0 AND expires_at > NOW()
     ORDER BY id DESC LIMIT 1`,
    [email, hashOtp(otp)]
  );
  const match = (rows as Record<string, unknown>[])[0];

  if (!match) {
    return NextResponse.json({ error: "Invalid or expired code" }, { status: 401 });
  }

  await pool.execute("UPDATE admin_otps SET consumed = 1 WHERE id = ?", [Number(match.id)]);
  await setSessionCookie(email, Boolean(rememberMe));

  return NextResponse.json({ ok: true });
}
