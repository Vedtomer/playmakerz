"use client";

import Image from "next/image";
import Script from "next/script";
import { useState } from "react";
import { PACKAGES, gstAmount, totalWithGst, packageLabel, type PackageId } from "@/lib/pricing";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

const PLAYING_STYLES = ["Batsman", "Bowler", "All Rounder"];
const TRIAL_LOCATIONS = ["Faridabad", "Delhi", "Gurugram"];

const FAQS = [
  {
    q: "Which stadiums are available?",
    a: "We secure professional-grade stadiums, first-class complexes, and elite venues nationwide, matched to your tournament's scale and audience.",
  },
  {
    q: "When should we book?",
    a: "We recommend booking at least 3 to 4 weeks in advance to secure permits, coordinate schedules, and finalize broadcast plans.",
  },
  {
    q: "Do you handle sponsor activations?",
    a: "Yes — our production team runs on-ground sponsor branding, digital stream overlays, VIP hospitality lounges, and custom prize ceremonies.",
  },
  {
    q: "What does the production include?",
    a: "Every tournament comes with broadcast-grade live streaming, professional umpires and referees, live PA announcers, and premium hospitality catering.",
  },
];

export default function RegisterForTrialsPage() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [playingStyle, setPlayingStyle] = useState(PLAYING_STYLES[0]);
  const [location, setLocation] = useState(TRIAL_LOCATIONS[0]);
  const [pkg, setPkg] = useState<PackageId>(PACKAGES[0].id);

  const [status, setStatus] = useState<
    "idle" | "loading" | "verifying" | "paid" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          age: Number(age),
          phone,
          email,
          playingStyle,
          trialLocation: location,
          packageId: pkg,
        }),
      });

      if (!orderRes.ok) {
        const body = await orderRes.json().catch(() => ({}));
        throw new Error(body.error || "Could not start payment");
      }

      const order = await orderRes.json();

      const razorpay = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "Playmakerz — FPL 2026 Trials",
        description: (() => {
          const selected = PACKAGES.find((p) => p.id === pkg);
          return selected ? packageLabel(selected) : undefined;
        })(),
        prefill: { name: fullName, email, contact: phone },
        theme: { color: "#FFB800" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          setStatus("verifying");
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });
            if (!verifyRes.ok) throw new Error("Payment verification failed");
            setStatus("paid");
          } catch (err) {
            setStatus("error");
            setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
          }
        },
        modal: {
          ondismiss: () => setStatus("idle"),
        },
      });
      razorpay.open();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <section className="relative bg-[#0b1330] text-white overflow-hidden">
        <Image
          src="/images/hero-tournaments-bg.png"
          alt=""
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-20">
          <div className="text-center">
            <p className="text-amber font-semibold tracking-widest text-sm uppercase">
              Secure Your Spot
            </p>
            <h1 className="mt-3 font-heading text-4xl sm:text-5xl font-bold">
              Trials are on for Faridabad Premier League
            </h1>
            <p className="mt-3 text-amber/90 font-medium">
              Fill in the form right away!!
            </p>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 items-center">
            <div className="relative mx-auto h-72 w-72 sm:h-96 sm:w-96">
              <Image
                src="/images/fpl-crest.png"
                alt="Faridabad Premier League crest"
                fill
                className="object-contain"
              />
            </div>

            {status === "verifying" ? (
              <div className="rounded-2xl bg-white p-10 text-center text-black">
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-black/10 border-t-amber-dark" />
                <h2 className="mt-5 font-heading text-2xl font-bold">
                  Confirming your payment…
                </h2>
                <p className="mt-2 text-black/70">
                  Payment received! We&apos;re locking in your trial slot and
                  sending your confirmation — this takes just a few seconds.
                </p>
              </div>
            ) : status === "paid" ? (
              <div className="rounded-2xl bg-white p-10 text-center text-black">
                <h2 className="font-heading text-2xl font-bold">
                  Thanks — you&apos;re in!
                </h2>
                <p className="mt-2 text-black/70">
                  Payment received and your FPL trial slot is confirmed. A
                  confirmation email is on its way, and we&apos;ll message you
                  on WhatsApp with the venue and timing.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl bg-white p-6 sm:p-8 text-black"
              >
                <h2 className="font-heading text-xl font-bold">
                  FPL 2026 Trial Registration
                </h2>
                <p className="mt-1 text-xs font-semibold tracking-wide text-black/50 uppercase">
                  Fill your details and preferences
                </p>

                <div className="mt-6 grid gap-4">
                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    Full Name
                    <input
                      required
                      type="text"
                      placeholder="Enter name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="rounded-lg border border-black/10 bg-mist px-4 py-3 outline-none focus:border-amber"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    Age
                    <input
                      required
                      type="number"
                      min={1}
                      placeholder="Enter age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="rounded-lg border border-black/10 bg-mist px-4 py-3 outline-none focus:border-amber"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    Phone Number
                    <input
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      placeholder="10-digit mobile"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-lg border border-black/10 bg-mist px-4 py-3 outline-none focus:border-amber"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    Email Address
                    <input
                      required
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-lg border border-black/10 bg-mist px-4 py-3 outline-none focus:border-amber"
                    />
                  </label>

                  <fieldset>
                    <legend className="text-sm font-medium mb-2">
                      Playing Style
                    </legend>
                    <div className="grid gap-2">
                      {PLAYING_STYLES.map((style) => (
                        <label
                          key={style}
                          className="flex items-center gap-2 rounded-lg border border-black/10 bg-mist px-4 py-2.5 text-sm cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="playingStyle"
                            checked={playingStyle === style}
                            onChange={() => setPlayingStyle(style)}
                            className="accent-amber"
                          />
                          {style}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-medium mb-2">
                      Trial Location
                    </legend>
                    <div className="grid gap-2">
                      {TRIAL_LOCATIONS.map((loc) => (
                        <label
                          key={loc}
                          className="flex items-center gap-2 rounded-lg border border-black/10 bg-mist px-4 py-2.5 text-sm cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="location"
                            checked={location === loc}
                            onChange={() => setLocation(loc)}
                            className="accent-amber"
                          />
                          {loc}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="text-sm font-medium mb-2">
                      Select Package
                    </legend>
                    <div className="grid gap-2">
                      {PACKAGES.map((p) => (
                        <label
                          key={p.id}
                          className="flex items-center justify-between gap-2 rounded-lg border border-black/10 bg-mist px-4 py-2.5 text-sm cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="package"
                              checked={pkg === p.id}
                              onChange={() => setPkg(p.id)}
                              className="accent-amber"
                            />
                            {p.name}
                          </span>
                          <span className="font-semibold">
                            ₹{totalWithGst(p.basePrice)}
                          </span>
                        </label>
                      ))}
                    </div>

                    {(() => {
                      const selected = PACKAGES.find((p) => p.id === pkg);
                      if (!selected) return null;
                      return (
                        <div className="mt-3 rounded-lg bg-mist px-4 py-3 text-xs text-black/70">
                          <div className="flex justify-between">
                            <span>Trial fee</span>
                            <span>₹{selected.basePrice}</span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span>GST (18%)</span>
                            <span>₹{gstAmount(selected.basePrice)}</span>
                          </div>
                          <div className="flex justify-between mt-1.5 pt-1.5 border-t border-black/10 font-semibold text-black">
                            <span>Total payable</span>
                            <span>₹{totalWithGst(selected.basePrice)}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </fieldset>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-2 inline-flex items-center justify-center rounded-full bg-amber-dark px-7 py-3.5 font-bold uppercase tracking-wide text-white transition-colors hover:bg-amber disabled:opacity-60"
                  >
                    {status === "loading" ? "Starting payment…" : "Pay Now & Register"}
                  </button>
                  {status === "error" && (
                    <p className="text-center text-xs font-medium text-red-600">
                      {errorMsg}
                    </p>
                  )}
                  <p className="text-center text-xs text-black/50">
                    Secure checkout via{" "}
                    <span className="font-semibold text-black/70">Razorpay</span>
                  </p>
                </div>
              </form>
            )}
          </div>

          <div className="mt-10 text-center">
            <a
              href="/upcoming-tournaments"
              className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Check out more details about FPL
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#111214] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-amber-dark font-semibold tracking-widest text-sm uppercase">
            General
          </p>
          <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold">
            Frequently Asked Questions
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-xl bg-[#1a1b1e] p-6">
                <h3 className="font-heading text-xl font-bold">{faq.q}</h3>
                <p className="mt-3 text-sm text-white/60 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111214] text-white">
        <div className="mx-auto max-w-7xl px-6 pb-20 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="text-amber-dark font-semibold tracking-widest text-sm uppercase">
              Headquarters
            </p>
            <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold">
              Command Center
            </h2>
            <p className="mt-4 max-w-md text-white/60">
              Playmakerz operates nationwide. Visit our office and let&apos;s
              plan your game.
            </p>
            <div className="mt-4 h-px w-24 bg-amber" />
            <p className="mt-4 font-medium">
              Playmakerz HQ, Sector 16, Faridabad, Haryana 121002
            </p>
          </div>
          <div className="h-72 rounded-2xl overflow-hidden">
            <iframe
              title="Playmakerz HQ location"
              src="https://maps.google.com/maps?q=sector%2016%20faridabad&t=m&z=13&ie=UTF8&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
