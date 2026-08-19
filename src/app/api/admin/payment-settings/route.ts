import { NextRequest, NextResponse } from "next/server";
import { getSessionEmail } from "@/lib/adminAuth";
import { getPaymentSettings, updatePaymentSettings } from "@/lib/paymentSettings";

export async function GET() {
  const email = await getSessionEmail();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const settings = await getPaymentSettings();
  return NextResponse.json({ settings });
}

export async function PATCH(req: NextRequest) {
  const email = await getSessionEmail();
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { mode, testKeyId, testKeySecret, liveKeyId, liveKeySecret } = await req.json();

  if (mode !== "test" && mode !== "live") {
    return NextResponse.json({ error: "Invalid mode" }, { status: 400 });
  }

  await updatePaymentSettings({
    mode,
    testKeyId: testKeyId || null,
    testKeySecret: testKeySecret || null,
    liveKeyId: liveKeyId || null,
    liveKeySecret: liveKeySecret || null,
  });

  return NextResponse.json({ ok: true });
}
