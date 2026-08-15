import { NextRequest, NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { getSessionEmail } from "@/lib/adminAuth";

export async function GET() {
  const email = await getSessionEmail();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pool = getPool();
  const [rows] = await pool.execute(
    "SELECT id, email, name, phone FROM admins WHERE email = ? LIMIT 1",
    [email]
  );
  const admin = (rows as Record<string, unknown>[])[0];
  if (!admin) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ admin });
}

export async function PATCH(req: NextRequest) {
  const email = await getSessionEmail();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, phone } = await req.json();
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  // Email is intentionally never accepted from the request body — it's
  // the fixed identity for this admin account and can't be changed here.
  const pool = getPool();
  await pool.execute(
    "UPDATE admins SET name = ?, phone = ? WHERE email = ?",
    [name, phone || null, email]
  );

  return NextResponse.json({ ok: true });
}
