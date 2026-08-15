import Image from "next/image";
import Button from "@/components/Button";

const SERVICES = [
  {
    title: "Corporate Sports Tournaments",
    body: "Organize competitive and engaging sports tournaments for businesses to foster teamwork, healthy competition, and employee well-being.",
  },
  {
    title: "Domestic Sports Tours",
    body: "Curated sports travel experiences across India, combining matches, training, and exploration for teams and enthusiasts.",
  },
  {
    title: "International Sports Tours",
    body: "Global sports travel packages, including match tickets, accommodations, and itineraries for international tournaments and events.",
  },
  {
    title: "Corporate Offsites and Team Building",
    body: "Fun and strategic offsite retreats with team-building activities to enhance collaboration, leadership, and employee engagement.",
  },
  {
    title: "Event Management",
    body: "End-to-end management of sports events, award ceremonies, and brand activations, ensuring seamless execution from planning to execution.",
  },
  {
    title: "Sports Travel Packages",
    body: "Customized travel solutions for sports lovers, featuring match tickets, group tours, and exclusive experiences at major sporting events.",
  },
];

const STATS = [
  { value: "30+", label: "Matches delivered" },
  { value: "50+", label: "Happy clients" },
  { value: "1200+", label: "Participants engaged" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative bg-black text-white overflow-hidden">
        <Image
          src="/images/hero-tournaments-bg.png"
          alt=""
          fill
          priority
          className="object-cover opacity-30"
        />
        <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-16">
          <p className="text-amber font-semibold tracking-widest text-sm uppercase">
            Our Services
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl sm:text-5xl font-bold leading-tight">
            End-to-end sports hospitality — from the first whistle to the
            final highlight
          </h1>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div key={s.title} className="rounded-xl bg-black/60 backdrop-blur-sm p-8 ring-1 ring-white/10">
              <h2 className="font-heading text-xl font-bold">{s.title}</h2>
              <p className="mt-3 text-sm text-white/60 leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="font-heading text-3xl font-bold">Our Story</h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              Playmakerz was built on a simple idea: sports, travel, and
              memorable experiences belong together. What started as a way to
              make sports more engaging has grown into a platform connecting
              teams, travelers, and sports lovers through events and journeys
              worth remembering.
            </p>
            <Button href="/experience" variant="primary" className="mt-6">
              Learn more
            </Button>
          </div>
          <div className="relative h-72 rounded-2xl overflow-hidden">
            <Image
              src="/images/story-image.jpg"
              alt="Playmakerz corporate cricket league"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-20 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl font-bold">
              Mission and Vision
            </h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              To create sports and travel experiences that inspire teamwork,
              energy, and connection — and to become a trusted name in sports
              tourism and sports-based experiences across India and beyond.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold">Why Playmakerz?</h2>
            <p className="mt-4 text-white/60 leading-relaxed">
              We combine sports expertise, travel planning, and event execution
              in one team, with a focus on quality, customization, and smooth
              coordination — so every event and tour feels effortless.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0c0c0d] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 grid gap-8 sm:grid-cols-3 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-heading text-5xl font-bold text-amber">
                {s.value}
              </p>
              <p className="mt-2 text-white/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="font-heading text-3xl font-bold text-center">
            Meet the Team
          </h2>
          <p className="mt-2 text-center text-white/60">
            Get to know the people behind Playmakerz
          </p>

          <div className="mt-10 mx-auto max-w-md rounded-2xl bg-[#1a1b1e] p-8 text-center">
            <div className="relative mx-auto h-32 w-32 rounded-full overflow-hidden">
              <Image
                src="/images/team-kunal.png"
                alt="Kunal Grover, Founder and Owner, Playmakerz"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 font-heading text-xl font-bold">
              Kunal Grover
            </h3>
            <p className="text-sm text-white/50">
              Founder and Owner, Playmakerz Sports and Events
            </p>
            <p className="mt-4 text-sm italic text-white/70">
              &ldquo;At Playmakerz, we want every corporate employee to live the
              life of a sportstar, even if just for a day.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="bg-amber">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h2 className="font-heading text-3xl font-bold">
            Ready for FPL?
          </h2>
          <p className="mt-2 text-black/80">
            Faridabad Premier League is waiting to see your potential
            explode.
          </p>
          <Button href="/register-for-trials" variant="dark" className="mt-6">
            Get Ready for Trials
          </Button>
        </div>
      </section>
    </>
  );
}
