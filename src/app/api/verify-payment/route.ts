import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getPool } from "@/lib/db";
import { sendRegistrationEmails } from "@/lib/mailer";
import { sendWhatsAppConfirmation } from "@/lib/whatsapp";

export async function POST(req: NextRequest) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    return NextResponse.json({ error: "Payments are not configured" }, { status: 503 });
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = await req.json();

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing payment fields" }, { status: 400 });
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  const pool = getPool();

  if (expectedSignature !== razorpay_signature) {
    await pool.query(
      `UPDATE trial_registrations SET payment_status = 'failed' WHERE razorpay_order_id = $1`,
      [razorpay_order_id]
    );
    return NextResponse.json({ error: "Signature verification failed" }, { status: 400 });
  }

  await pool.query(
    `UPDATE trial_registrations
       SET payment_status = 'paid', razorpay_payment_id = $1
     WHERE razorpay_order_id = $2`,
    [razorpay_payment_id, razorpay_order_id]
  );

  const { rows } = await pool.query(
    `SELECT * FROM trial_registrations WHERE razorpay_order_id = $1 LIMIT 1`,
    [razorpay_order_id]
  );
  const reg = rows[0];

  if (!reg) {
    return NextResponse.json({ error: "Registration not found" }, { status: 404 });
  }

  const details = {
    fullName: String(reg.full_name),
    age: Number(reg.age),
    phone: String(reg.phone),
    email: String(reg.email),
    playingStyle: String(reg.playing_style),
    trialLocation: String(reg.trial_location),
    packageLabel: String(reg.package_label),
    amountInr: Number(reg.amount_inr),
    paymentId: razorpay_payment_id,
  };

  try {
    await sendRegistrationEmails(details);
    await pool.query(
      `UPDATE trial_registrations SET email_sent = TRUE WHERE razorpay_order_id = $1`,
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
      await pool.query(
        `UPDATE trial_registrations SET whatsapp_sent = TRUE WHERE razorpay_order_id = $1`,
        [razorpay_order_id]
      );
    }
  } catch (err) {
    console.error("WhatsApp send failed", err);
  }

  return NextResponse.json({ ok: true });
}
