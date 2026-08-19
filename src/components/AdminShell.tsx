"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

type Profile = { name: string; phone: string | null; email: string };

type PaymentSettings = {
  mode: "test" | "live";
  testKeyId: string | null;
  testKeySecret: string | null;
  liveKeyId: string | null;
  liveKeySecret: string | null;
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/registrations", label: "Registrations" },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [payment, setPayment] = useState<PaymentSettings>({
    mode: "test",
    testKeyId: "",
    testKeySecret: "",
    liveKeyId: "",
    liveKeySecret: "",
  });
  const [paymentSaving, setPaymentSaving] = useState(false);
  const [paymentMsg, setPaymentMsg] = useState("");

  useEffect(() => {
    fetch("/api/admin/profile")
      .then((r) => r.json())
      .then((body) => {
        if (body.admin) {
          setProfile(body.admin);
          setName(body.admin.name ?? "");
          setPhone(body.admin.phone ?? "");
        }
      });
  }, []);

  useEffect(() => {
    if (!paymentOpen) return;
    fetch("/api/admin/payment-settings")
      .then((r) => r.json())
      .then((body) => {
        if (body.settings) setPayment(body.settings);
      });
  }, [paymentOpen]);

  async function savePaymentSettings(e: React.FormEvent) {
    e.preventDefault();
    setPaymentSaving(true);
    setPaymentMsg("");
    try {
      const res = await fetch("/api/admin/payment-settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payment),
      });
      if (!res.ok) throw new Error("Could not save");
      setPaymentMsg("Saved");
      setTimeout(() => setPaymentOpen(false), 600);
    } catch {
      setPaymentMsg("Failed to save");
    } finally {
      setPaymentSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveMsg("");
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
      if (!res.ok) throw new Error("Could not save");
      setProfile((p) => (p ? { ...p, name, phone } : p));
      setSaveMsg("Saved");
      setTimeout(() => setProfileOpen(false), 600);
    } catch {
      setSaveMsg("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0c0c0d] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <p className="font-heading text-lg font-bold">
            playmakerz <span className="text-amber">admin</span>
          </p>
          <nav className="flex items-center gap-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-amber ${
                  pathname === item.href ? "text-amber" : "text-white/70"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => setPaymentOpen(true)}
              className="text-sm font-medium text-white/70 hover:text-amber"
            >
              Payment Gateway
            </button>
            <button
              onClick={() => setProfileOpen(true)}
              className="text-sm font-medium text-white/70 hover:text-amber"
            >
              {profile?.name ?? "Profile"}
            </button>
            <button
              onClick={logout}
              className="rounded-full border border-white/20 px-4 py-1.5 text-sm hover:border-amber hover:text-amber transition-colors"
            >
              Log Out
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

      {profileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <form
            onSubmit={saveProfile}
            className="w-full max-w-sm rounded-2xl bg-[#1a1b1e] p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold">Your Profile</h2>
              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <label className="mt-4 flex flex-col gap-1.5 text-sm font-medium">
              Email (fixed)
              <input
                disabled
                value={profile?.email ?? ""}
                className="rounded-lg border border-white/10 bg-black/30 px-4 py-2.5 text-white/50"
              />
            </label>

            <label className="mt-3 flex flex-col gap-1.5 text-sm font-medium">
              Name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 outline-none focus:border-amber"
              />
            </label>

            <label className="mt-3 flex flex-col gap-1.5 text-sm font-medium">
              Phone (for WhatsApp OTP)
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile"
                className="rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 outline-none focus:border-amber"
              />
            </label>

            <button
              type="submit"
              disabled={saving}
              className="mt-5 w-full rounded-full bg-amber px-6 py-2.5 font-semibold text-black hover:bg-amber-dark disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
            {saveMsg && (
              <p className="mt-2 text-center text-xs text-white/60">{saveMsg}</p>
            )}
          </form>
        </div>
      )}

      {paymentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 overflow-y-auto py-10">
          <form
            onSubmit={savePaymentSettings}
            className="w-full max-w-md rounded-2xl bg-[#1a1b1e] p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold">Payment Gateway</h2>
              <button
                type="button"
                onClick={() => setPaymentOpen(false)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            <fieldset className="mt-4">
              <legend className="text-sm font-medium mb-2">Active Mode</legend>
              <div className="grid grid-cols-2 gap-2">
                {(["test", "live"] as const).map((m) => (
                  <label
                    key={m}
                    className="flex items-center gap-2 rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 text-sm cursor-pointer capitalize"
                  >
                    <input
                      type="radio"
                      name="mode"
                      checked={payment.mode === m}
                      onChange={() => setPayment((p) => ({ ...p, mode: m }))}
                      className="accent-amber"
                    />
                    {m}
                  </label>
                ))}
              </div>
              <p className="mt-2 text-xs text-white/50">
                {payment.mode === "live"
                  ? "Live mode — real payments will be charged."
                  : "Test mode — no real charges occur."}
              </p>
            </fieldset>

            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-amber">
              Test Keys
            </p>
            <label className="mt-2 flex flex-col gap-1.5 text-sm font-medium">
              Test Key ID
              <input
                value={payment.testKeyId ?? ""}
                onChange={(e) => setPayment((p) => ({ ...p, testKeyId: e.target.value }))}
                placeholder="rzp_test_..."
                className="rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 outline-none focus:border-amber font-mono text-xs"
              />
            </label>
            <label className="mt-3 flex flex-col gap-1.5 text-sm font-medium">
              Test Key Secret
              <input
                value={payment.testKeySecret ?? ""}
                onChange={(e) => setPayment((p) => ({ ...p, testKeySecret: e.target.value }))}
                className="rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 outline-none focus:border-amber font-mono text-xs"
              />
            </label>

            <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-amber">
              Live Keys
            </p>
            <label className="mt-2 flex flex-col gap-1.5 text-sm font-medium">
              Live Key ID
              <input
                value={payment.liveKeyId ?? ""}
                onChange={(e) => setPayment((p) => ({ ...p, liveKeyId: e.target.value }))}
                placeholder="rzp_live_..."
                className="rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 outline-none focus:border-amber font-mono text-xs"
              />
            </label>
            <label className="mt-3 flex flex-col gap-1.5 text-sm font-medium">
              Live Key Secret
              <input
                value={payment.liveKeySecret ?? ""}
                onChange={(e) => setPayment((p) => ({ ...p, liveKeySecret: e.target.value }))}
                className="rounded-lg border border-white/15 bg-black/30 px-4 py-2.5 outline-none focus:border-amber font-mono text-xs"
              />
            </label>

            <button
              type="submit"
              disabled={paymentSaving}
              className="mt-5 w-full rounded-full bg-amber px-6 py-2.5 font-semibold text-black hover:bg-amber-dark disabled:opacity-60"
            >
              {paymentSaving ? "Saving…" : "Save Changes"}
            </button>
            {paymentMsg && (
              <p className="mt-2 text-center text-xs text-white/60">{paymentMsg}</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
}
