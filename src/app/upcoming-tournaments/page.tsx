import Image from "next/image";
import Button from "@/components/Button";

export default function UpcomingTournamentsPage() {
  return (
    <>
      <section className="relative bg-black text-white overflow-hidden">
        <Image
          src="/images/hero-tournaments-bg.png"
          alt="Faridabad Premier League"
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="relative mx-auto max-w-7xl px-6 py-28">
          <h1 className="max-w-2xl font-heading text-4xl sm:text-5xl font-bold leading-tight">
            Faridabad Premier League (FPL)
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/80 italic">
            &ldquo;An immersive corporate sporting experience bringing
            together Faridabad &amp; NCR&apos;s business community through
            the power of cricket.&rdquo;
          </p>
          <Button href="/register-for-trials" variant="primary" className="mt-8">
            Learn More
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 grid gap-10 lg:grid-cols-2 items-center">
        <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden order-2 lg:order-1">
          <Image
            src="/images/pcl-hero.jpg"
            alt="Playmakerz Champions League"
            fill
            className="object-cover"
          />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            Playmakerz Champions League
          </h2>
          <p className="mt-2 text-amber-dark font-semibold">October 2026</p>
          <p className="mt-4 text-black/70 leading-relaxed">
            Cricket meets travel. PCL takes corporate teams and cricket
            enthusiasts to iconic stadiums across the globe, turning every
            tournament into a sporting getaway to remember.
          </p>
          <Button href="/register-for-trials" variant="dark" className="mt-6">
            Learn More
          </Button>
        </div>
      </section>
    </>
  );
}
