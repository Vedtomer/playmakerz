import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getPool } from "@/lib/db";
import { findPackage, totalWithGst, packageLabel } from "@/lib/pricing";
import { getActiveRazorpayCredentials } from "@/lib/paymentSettings";

export async function POST(req: NextRequest) {
  const { mode, keyId, keySecret } = await getActiveRazorpayCredentials();

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

  const pkg = findPackage(packageId);
  if (!fullName || !phone || !email || !pkg) {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const amountInr = totalWithGst(pkg.basePrice);

  const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
  const order = await razorpay.orders.create({
    amount: amountInr * 100,
    currency: "INR",
    receipt: `fpl_${Date.now()}`,
  });

  const pool = getPool();
  await pool.execute(
    `INSERT INTO trial_registrations
      (full_name, age, phone, email, playing_style, trial_location, package_id, package_label, amount_inr, razorpay_order_id, payment_mode, payment_status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'created')`,
    [fullName, age, phone, email, playingStyle, trialLocation, packageId, packageLabel(pkg), amountInr, order.id, mode]
  );

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId,
  });
}
