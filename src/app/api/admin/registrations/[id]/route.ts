import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { getSessionEmail } from "@/lib/adminAuth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const email = await getSessionEmail();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const pool = getPool();
  const [rows] = await pool.execute(
    "SELECT * FROM trial_registrations WHERE id = ? LIMIT 1",
    [id]
  );
  const registration = (rows as Record<string, unknown>[])[0];

  if (!registration) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ registration });
}
