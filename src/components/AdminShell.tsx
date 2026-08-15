"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

type Profile = { name: string; phone: string | null; email: string };

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
    </div>
  );
}
