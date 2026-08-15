"use client";

import Image from "next/image";
import { useState } from "react";

const PLAYING_STYLES = ["Batsman", "Bowler", "All Rounder"];
const TRIAL_LOCATIONS = ["Faridabad", "Delhi", "Gurugram"];
const PACKAGES = [
  { id: "bat-bowl", label: "₹800 Trial (Bat / Bowl)" },
  { id: "all-rounder", label: "₹1200 Trial (All Rounder)" },
];

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
  const [playingStyle, setPlayingStyle] = useState(PLAYING_STYLES[0]);
  const [location, setLocation] = useState(TRIAL_LOCATIONS[0]);
  const [pkg, setPkg] = useState(PACKAGES[0].id);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
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

            {submitted ? (
              <div className="rounded-2xl bg-white p-10 text-center text-black">
                <h2 className="font-heading text-2xl font-bold">
                  Thanks — you&apos;re in!
                </h2>
                <p className="mt-2 text-black/70">
                  We&apos;ve received your details. Our team will reach out
                  with trial timings and venue information shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
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
                      className="rounded-lg border border-black/10 bg-mist px-4 py-3 outline-none focus:border-amber"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm font-medium">
                    Email Address
                    <input
                      required
                      type="email"
                      placeholder="Enter email"
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
                          className="flex items-center gap-2 rounded-lg border border-black/10 bg-mist px-4 py-2.5 text-sm cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="package"
                            checked={pkg === p.id}
                            onChange={() => setPkg(p.id)}
                            className="accent-amber"
                          />
                          {p.label}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center rounded-full bg-amber-dark px-7 py-3.5 font-bold uppercase tracking-wide text-white transition-colors hover:bg-amber"
                  >
                    Pay Now &amp; Register
                  </button>
                  <p className="text-center text-xs text-black/50">
                    Secure checkout via{" "}
                    <span className="font-semibold text-black/70">
                      Razorpay
                    </span>
                    {" "}— payment gateway to be connected.
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
