import Image from "next/image";
import Button from "@/components/Button";

const GALLERY = [
  "gallery-01.jpg",
  "gallery-02.jpg",
  "gallery-03.jpg",
  "gallery-05.jpg",
  "gallery-06.jpg",
  "gallery-08.jpg",
  "gallery-09.jpg",
  "gallery-10.jpg",
  "gallery-12.jpg",
  "gallery-14.jpg",
  "gallery-15.jpg",
  "gallery-16.jpg",
  "gallery-17.jpg",
  "gallery-18.jpg",
  "gallery-19.jpg",
  "gallery-20.jpg",
  "gallery-21.jpg",
];

export default function ExperiencePage() {
  return (
    <>
      <section className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <p className="text-amber font-semibold tracking-widest text-sm uppercase">
            The Arena Awaits
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl sm:text-5xl font-bold leading-tight">
            We&apos;re not event managers. We&apos;re experience creators.
          </h1>
          <p className="mt-6 max-w-2xl text-white/80 leading-relaxed">
            At Playmakerz, sports should be more than a game — it should be
            an experience worth remembering. Rather than just organizing
            matches, we build end-to-end productions that stay with people
            long after the final whistle.
          </p>
          <Button href="/register-for-trials" variant="primary" className="mt-8">
            Book Your Game
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-amber-dark font-semibold tracking-widest text-sm uppercase">
          Live Action
        </p>
        <h2 className="mt-2 font-heading text-3xl sm:text-4xl font-bold">
          The Championship Gallery
        </h2>
        <p className="mt-2 text-black/60 max-w-xl">
          Moments of determination, celebration, and stadium-grade
          production from our tournaments.
        </p>

        <div className="mt-10 columns-2 md:columns-3 gap-4 [&>*]:mb-4">
          {GALLERY.map((file) => (
            <div key={file} className="relative rounded-xl overflow-hidden break-inside-avoid">
              <Image
                src={`/images/${file}`}
                alt="Playmakerz tournament highlight"
                width={768}
                height={576}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-amber-dark font-semibold tracking-widest text-sm uppercase">
            Client Verdicts
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold">
            Stellar Corporate Feedback
          </h2>
          <blockquote className="mt-8 max-w-2xl rounded-2xl bg-white p-8">
            <p className="text-lg text-black/80 leading-relaxed">
              &ldquo;Our corporate tournament felt exactly like a
              professional league broadcast. The live streaming and stadium
              atmosphere exceeded every expectation.&rdquo;
            </p>
            <footer className="mt-4 text-sm font-semibold text-black/60">
              Marcus T., VP of Human Resources
            </footer>
          </blockquote>
        </div>
      </section>
    </>
  );
}
