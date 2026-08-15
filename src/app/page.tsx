import Image from "next/image";
import Button from "@/components/Button";

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
];

const MORE_SERVICES = [
  {
    title: "Corporate Offsites & Team Building",
    body: "Retreats and offsite experiences that pair fun activities with leadership and collaboration exercises, built to lift morale and strengthen team bonds.",
  },
  {
    title: "Event Management",
    body: "Full production for sports days, award ceremonies, and brand activations — venue setup, sound, lights, hospitality, and on-ground coordination.",
  },
  {
    title: "Sports Travel & Packages",
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
          className="object-cover opacity-60"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-36">
          <p className="text-amber font-semibold tracking-widest text-sm uppercase">
            Stadium-Ready Tournaments
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Play like a professional sportstar
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-2xl bg-mist p-8">
              <h2 className="font-heading text-xl font-bold">{s.title}</h2>
              <p className="mt-3 text-sm text-black/70 leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20 grid gap-8 lg:grid-cols-3">
          {MORE_SERVICES.map((s) => (
            <div key={s.title} className="rounded-2xl bg-white p-8">
              <h2 className="font-heading text-xl font-bold">{s.title}</h2>
              <p className="mt-3 text-sm text-black/70 leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-amber-dark font-semibold tracking-widest text-sm uppercase">
          Featured Events
        </p>
        <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold">
          Upcoming Tournaments from Playmakerz
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl overflow-hidden border border-black/10">
            <div className="relative h-56">
              <Image
                src="/images/fpl-crest.png"
                alt="Faridabad Premier League"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="font-heading text-2xl font-bold">
                Faridabad Premier League is here!!
              </h3>
              <p className="mt-3 text-sm text-black/70">
                FPL is Faridabad&apos;s own franchise-based Premier League — 12
                teams, one tournament. The first edition kicks off in
                October 2026, and trials are open now.
              </p>
              <Button href="/upcoming-tournaments" variant="light" className="mt-6">
                Be a part of FPL
              </Button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-black/10">
            <div className="relative h-56">
              <Image
                src="/images/pcl-card.jpg"
                alt="Playmakerz Champions League"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8">
              <h3 className="font-heading text-2xl font-bold">
                Playmakerz Champions League — cricket meets travel
              </h3>
              <p className="mt-3 text-sm text-black/70">
                PCL brings competitive cricket and travel together for
                corporates and cricket enthusiasts, taking teams to iconic
                stadiums around the world.
              </p>
              <Button href="/upcoming-tournaments" variant="light" className="mt-6">
                Be a part of PCL
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Catch the Excitement on Social Media
          </h2>
          <div className="mt-8">
            <Button href="/register-for-trials" variant="primary">
              Register for FPL
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold">
          Ready to Create Your Next Sporting Legacy?
        </h2>
        <p className="mt-4 text-black/70">Let&apos;s bring your sports vision to life.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/register-for-trials" variant="light">
            Plan Your Sports Tour
          </Button>
          <Button href="/register-for-trials" variant="dark">
            Corporate Inquiry
          </Button>
        </div>
      </section>
    </>
  );
}
