import { getPool } from "@/lib/db";

export type PaymentSettings = {
  mode: "test" | "live";
  testKeyId: string | null;
  testKeySecret: string | null;
  liveKeyId: string | null;
  liveKeySecret: string | null;
};

export async function getPaymentSettings(): Promise<PaymentSettings> {
  const pool = getPool();
  const [rows] = await pool.execute(
    "SELECT mode, test_key_id, test_key_secret, live_key_id, live_key_secret FROM payment_settings WHERE id = 1 LIMIT 1"
  );
  const row = (rows as Record<string, unknown>[])[0];

  return {
    mode: (row?.mode as "test" | "live") ?? "test",
    testKeyId: (row?.test_key_id as string) ?? null,
    testKeySecret: (row?.test_key_secret as string) ?? null,
    liveKeyId: (row?.live_key_id as string) ?? null,
    liveKeySecret: (row?.live_key_secret as string) ?? null,
  };
}

export async function updatePaymentSettings(settings: PaymentSettings) {
  const pool = getPool();
  await pool.execute(
    `UPDATE payment_settings
       SET mode = ?, test_key_id = ?, test_key_secret = ?, live_key_id = ?, live_key_secret = ?
     WHERE id = 1`,
    [
      settings.mode,
      settings.testKeyId,
      settings.testKeySecret,
      settings.liveKeyId,
      settings.liveKeySecret,
    ]
  );
}

export function credentialsForMode(
  settings: PaymentSettings,
  mode: "test" | "live"
) {
  return mode === "live"
    ? { keyId: settings.liveKeyId, keySecret: settings.liveKeySecret }
    : { keyId: settings.testKeyId, keySecret: settings.testKeySecret };
}

/** Active mode's credentials — what new orders should be created with. */
export async function getActiveRazorpayCredentials() {
  const settings = await getPaymentSettings();
  return { mode: settings.mode, ...credentialsForMode(settings, settings.mode) };
}
