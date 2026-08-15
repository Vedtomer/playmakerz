import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { getSessionEmail } from "@/lib/adminAuth";

export async function GET() {
  const email = await getSessionEmail();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pool = getPool();
  const [rows] = await pool.execute(
    `SELECT id, full_name, phone, email, trial_location, package_label,
            amount_inr, payment_status, whatsapp_sent, email_sent, created_at
     FROM trial_registrations
     ORDER BY created_at DESC`
  );

  return NextResponse.json({ registrations: rows });
}
