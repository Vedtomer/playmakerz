import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getPool } from "@/lib/db";

const PACKAGE_AMOUNTS: Record<string, { amountInr: number; label: string }> = {
  "bat-bowl": { amountInr: 800, label: "₹800 Trial (Bat / Bowl)" },
  "all-rounder": { amountInr: 1200, label: "₹1200 Trial (All Rounder)" },
};

export async function POST(req: NextRequest) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Payments are not configured yet. Try again shortly." },
      { status: 503 }
    );
  }

  const body = await req.json();
  const {
    fullName,
    age,
    phone,
    email,
    playingStyle,
    trialLocation,
    packageId,
  } = body;

  const pkg = PACKAGE_AMOUNTS[packageId];
  if (!fullName || !phone || !email || !pkg) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
  const order = await razorpay.orders.create({
    amount: pkg.amountInr * 100,
    currency: "INR",
    receipt: `fpl_${Date.now()}`,
  });

  const pool = getPool();
  await pool.execute(
    `INSERT INTO trial_registrations
      (full_name, age, phone, email, playing_style, trial_location, package_id, package_label, amount_inr, razorpay_order_id, payment_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'created')`,
    [fullName, age, phone, email, playingStyle, trialLocation, packageId, pkg.label, pkg.amountInr, order.id]
  );

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId,
  });
}
