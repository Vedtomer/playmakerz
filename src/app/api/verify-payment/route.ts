import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getPool } from "@/lib/db";
import { sendRegistrationEmails } from "@/lib/mailer";
import { sendWhatsAppConfirmation } from "@/lib/whatsapp";
import { getPaymentSettings, credentialsForMode } from "@/lib/paymentSettings";

export async function POST(req: NextRequest) {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = await req.json();

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
  }

  const pool = getPool();

  // Look the registration up first so we verify with whichever mode
  // (test/live) its order was actually created under, even if the admin
  // has switched the active mode since then.
  const [existingRows] = await pool.execute(
    `SELECT * FROM trial_registrations WHERE razorpay_order_id = ? LIMIT 1`,
    [razorpay_order_id]
  );
  const existing = (existingRows as Record<string, unknown>[])[0];

  if (!existing) {
    return NextResponse.json({ error: "Registration not found" }, { status: 404 });
  }

  const settings = await getPaymentSettings();
  const orderMode = (existing.payment_mode as "test" | "live") ?? settings.mode;
  const { keySecret } = credentialsForMode(settings, orderMode);

  if (!keySecret) {
    return NextResponse.json({ error: "Payments are not configured" }, { status: 503 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    await pool.execute(
      `UPDATE trial_registrations SET payment_status = 'failed' WHERE razorpay_order_id = ?`,
      [razorpay_order_id]
    );
    return NextResponse.json({ error: "Signature verification failed" }, { status: 400 });
  }

  await pool.execute(
    `UPDATE trial_registrations
       SET payment_status = 'paid', razorpay_payment_id = ?
     WHERE razorpay_order_id = ?`,
    [razorpay_payment_id, razorpay_order_id]
  );

  const details = {
    fullName: String(existing.full_name),
    age: Number(existing.age),
    phone: String(existing.phone),
    email: String(existing.email),
    playingStyle: String(existing.playing_style),
    trialLocation: String(existing.trial_location),
    packageLabel: String(existing.package_label),
    amountInr: Number(existing.amount_inr),
    paymentId: razorpay_payment_id,
  };

  try {
    await sendRegistrationEmails(details);
    await pool.execute(
      `UPDATE trial_registrations SET email_sent = 1 WHERE razorpay_order_id = ?`,
      [razorpay_order_id]
    );
  } catch (err) {
    console.error("Email send failed", err);
  }

  try {
    const result = await sendWhatsAppConfirmation({
      phone: details.phone,
      fullName: details.fullName,
      trialLocation: details.trialLocation,
      packageLabel: details.packageLabel,
    });
    if (!("skipped" in result)) {
      await pool.execute(
        `UPDATE trial_registrations SET whatsapp_sent = 1 WHERE razorpay_order_id = ?`,
        [razorpay_order_id]
      );
    }
  } catch (err) {
    console.error("WhatsApp send failed", err);
  }

  return NextResponse.json({ ok: true });
}
