import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { getSessionEmail } from "@/lib/adminAuth";

export async function GET() {
  const email = await getSessionEmail();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pool = getPool();
  const [rows] = await pool.execute(`
    SELECT
      COUNT(*) AS total_registrations,
      COALESCE(SUM(CASE WHEN payment_status = 'paid' THEN amount_inr ELSE 0 END), 0) AS total_revenue,
      SUM(CASE WHEN payment_status = 'paid' AND whatsapp_sent = 1 THEN 1 ELSE 0 END) AS whatsapp_sent,
      SUM(CASE WHEN payment_status = 'paid' AND whatsapp_sent = 0 THEN 1 ELSE 0 END) AS whatsapp_failed
    FROM trial_registrations
  `);
  const stats = (rows as Record<string, unknown>[])[0];

  return NextResponse.json({
    totalRegistrations: Number(stats.total_registrations),
    totalRevenue: Number(stats.total_revenue),
    whatsappSent: Number(stats.whatsapp_sent),
    whatsappFailed: Number(stats.whatsapp_failed),
  });
}
