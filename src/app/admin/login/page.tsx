"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Could not send code");
      setStep("otp");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, rememberMe }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Invalid code");
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-center font-heading text-2xl font-bold">
          playmakerz <span className="text-amber">admin</span>
        </p>

        {step === "email" ? (
          <form onSubmit={requestOtp} className="mt-8 grid gap-4">
            <label className="flex flex-col gap-1.5 text-sm font-medium">
              Admin Email
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="rounded-lg border border-white/15 bg-[#1a1b1e] px-4 py-3 outline-none focus:border-amber"
              />
            </label>

            <p className="text-xs text-white/50">
              We&apos;ll send a code to your email and WhatsApp.
            </p>

            <label className="flex items-center gap-2 text-sm text-white/70 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-amber"
              />
              Remember me
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-full bg-amber px-6 py-3 font-semibold text-black transition-colors hover:bg-amber-dark disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send Code"}
            </button>
            {error && <p className="text-center text-xs text-red-400">{error}</p>}
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="mt-8 grid gap-4">
            <p className="text-center text-sm text-white/60">
              Enter the 6-digit code sent to your email and WhatsApp
            </p>
            <input
              required
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              className="rounded-lg border border-white/15 bg-[#1a1b1e] px-4 py-3 text-center text-2xl tracking-[0.5em] outline-none focus:border-amber"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-amber px-6 py-3 font-semibold text-black transition-colors hover:bg-amber-dark disabled:opacity-60"
            >
              {loading ? "Verifying…" : "Verify & Log In"}
            </button>
            {error && <p className="text-center text-xs text-red-400">{error}</p>}
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setOtp("");
                setError("");
              }}
              className="text-center text-xs text-white/50 hover:text-white"
            >
              Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
