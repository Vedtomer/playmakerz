import Image from "next/image";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";

const SERVICES = [
  {
    title: "Corporate Sports Tournaments",
    body: "Fully produced cricket leagues and multi-sport tournaments for corporates — custom fixtures, live scoreboards, commentary, stadium-grade venues, and broadcast coverage that turns a company outing into a turnkey sporting event.",
  },
  {
    title: "Domestic Sports Tours",
    body: "Weekend cricket tours, friendly matches, and team getaways across India. Travel, stays, ground bookings, scheduling, and hospitality are all handled — your team just shows up and plays.",
  },
  {
    title: "International Sports Tours",
    body: "Overseas cricket tours, friendly series, and cultural experiences. Visas, flights, accommodation, fixtures, local coordination, and sightseeing are packaged into one complete trip for clubs, corporates, and academies.",
  },
  {
    title: "Corporate Offsites and Team Building",
    body: "Retreats and offsite experiences that pair fun activities with leadership and collaboration exercises, built to lift morale and strengthen team bonds.",
  },
  {
    title: "Event Management",
    body: "Full production for sports days, award ceremonies, and brand activations — venue setup, sound, lights, hospitality, and on-ground coordination.",
  },
  {
    title: "Sports Travel and Packages",
    body: "Curated trips for sports enthusiasts — match tickets, hotel stays, group tours to international stadiums, and custom itineraries.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative bg-black text-white overflow-hidden">
        <Image
          src="/images/hero-home.png"
          alt="Playmakerz corporate cricket tournament"
          fill
          priority
          className="object-cover opacity-50"
        />
        <Reveal className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
          <p className="text-amber font-semibold tracking-widest text-sm uppercase">
            Stadium-Ready Tournaments
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Play like a <span className="text-amber">professional sportstar</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Playmakerz conceptualizes, plans, manages, and executes
            end-to-end sporting experiences for corporates — because every
            sports lover deserves their moment to feel like a star.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/register-for-trials" variant="primary">
              Explore Our Events
            </Button>
            <Button href="/services" variant="dark">
              Partner With Us
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 80} className="rounded-xl bg-[#1a1b1e] p-8">
              <h2 className="font-heading text-xl font-bold">{s.title}</h2>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-black via-amber-dark/40 to-black">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p className="font-heading text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
            Featured Events
          </p>
          <p className="text-white/70 text-sm">
            Upcoming Tournaments from Playmakerz
          </p>
        </div>
      </section>

      <section className="bg-black text-white">
        <Reveal className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-2 items-center">
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
            <Image
              src="/images/fpl-crest.png"
              alt="Faridabad Premier League"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">
              Faridabad Premier League is here!!
            </h3>
            <p className="mt-3 text-white/70 leading-relaxed">
              FPL is Faridabad&apos;s own franchise-based Premier League — 12
              teams, one tournament. The first edition kicks off in
              October 2026, and trials are open now.
            </p>
            <Button href="/upcoming-tournaments#fpl" variant="primary" className="mt-6">
              Be a part of FPL
            </Button>
          </div>
        </Reveal>

        <Reveal className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold">
              Playmakerz Champions League.{" "}
              <span className="text-amber">Cricket meets Travel.</span>
            </h3>
            <p className="mt-3 text-white/70 leading-relaxed">
              PCL brings together the excitement of competitive cricket and
              the joy of travel, taking corporate teams and cricket
              enthusiasts to iconic stadiums across the globe.
            </p>
            <Button href="/upcoming-tournaments#pcl" variant="primary" className="mt-6">
              Be a part of PCL
            </Button>
          </div>
          <div className="order-1 lg:order-2 relative aspect-[32/19] rounded-xl overflow-hidden">
            <Image
              src="/images/pcl-collage.jpg"
              alt="Playmakerz Champions League — team travel and matches"
              fill
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="bg-[#0c0c0d] text-white">
        <Reveal className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Catch the Excitement on Social Media
          </h2>

          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <a
              href="https://www.instagram.com/playmakerz.sportsandevents"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-xl overflow-hidden ring-1 ring-white/10"
            >
              <Image
                src="/images/social-promo.webp"
                alt="Playmakerz Tribe announcement"
                fill
                className="object-cover"
              />
            </a>
            <div className="relative aspect-square rounded-xl overflow-hidden ring-1 ring-white/10">
              <video
                src="/videos/social-01.mp4"
                poster="/images/social-01-poster.jpg"
                controls
                preload="metadata"
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden ring-1 ring-white/10">
              <video
                src="/videos/social-02.mp4"
                poster="/images/social-02-poster.jpg"
                controls
                preload="metadata"
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden ring-1 ring-white/10">
              <video
                src="/videos/social-03.mp4"
                controls
                preload="metadata"
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://www.instagram.com/playmakerz.sportsandevents"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 font-semibold hover:border-amber hover:text-amber transition-colors"
            >
              @playmakerz.sportsandevents
            </a>
            <Button href="/register-for-trials" variant="primary">
              Register for FPL
            </Button>
          </div>
        </Reveal>
      </section>

      <section className="relative bg-black text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,184,0,0.2),transparent_65%)]" />
        <Reveal className="relative mx-auto max-w-7xl px-6 py-24 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Ready to Create Your Next Sporting Legacy?
          </h2>
          <p className="mt-4 text-white/60">
            Let&apos;s bring your sports vision to life.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/register-for-trials" variant="dark">
              Register for FPL
            </Button>
            <Button href="/register-for-trials" variant="dark">
              Plan Your Sports Tour
            </Button>
            <Button href="/register-for-trials" variant="dark">
              Corporate Inquiry
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
