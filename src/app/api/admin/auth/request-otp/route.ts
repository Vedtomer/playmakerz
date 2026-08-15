import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { generateOtp, hashOtp } from "@/lib/otp";
import { sendOtpEmail } from "@/lib/mailer";
import { sendWhatsAppOtp } from "@/lib/whatsapp";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const pool = getPool();
  const [rows] = await pool.execute(
    "SELECT id, email, phone FROM admins WHERE email = ? LIMIT 1",
    [email]
  );
  const admin = (rows as Record<string, unknown>[])[0];

  // Same response whether or not the email matches, so login can't be
  // used to probe which emails are registered as admins.
  if (!admin) {
    return NextResponse.json({ ok: true });
  }

  const otp = generateOtp();
  await pool.execute(
    `INSERT INTO admin_otps (email, otp_hash, channel, expires_at)
     VALUES (?, ?, 'both', DATE_ADD(NOW(), INTERVAL 10 MINUTE))`,
    [email, hashOtp(otp)]
  );

  await Promise.all([
    sendOtpEmail(email, otp),
    admin.phone
      ? sendWhatsAppOtp(String(admin.phone), otp).catch((err) =>
          console.error("WhatsApp OTP send failed", err)
        )
      : null,
  ]);

  return NextResponse.json({ ok: true });
}
