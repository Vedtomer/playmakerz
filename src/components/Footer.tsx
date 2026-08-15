import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-heading text-2xl font-bold">playmakerz</p>
          <p className="mt-3 text-sm text-white/60">
            End-to-end production for corporate sports leagues.
          </p>
        </div>

        <div>
          <p className="font-semibold text-amber">Get Stadium-Ready</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <Link href="/services" className="hover:text-white">
                Our Services
              </Link>
            </li>
            <li>
              <Link href="/upcoming-tournaments" className="hover:text-white">
                Upcoming Tournaments
              </Link>
            </li>
            <li>
              <Link href="/experience" className="hover:text-white">
                The Experience
              </Link>
            </li>
            <li>
              <Link href="/register-for-trials" className="hover:text-white">
                Register for Trials
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-amber">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a href="mailto:info@playmakerz.in" className="hover:text-white">
                info@playmakerz.in
              </a>
            </li>
            <li>
              <a href="tel:+919999474562" className="hover:text-white">
                +91-9999474562
              </a>
            </li>
            <li>Available Nationwide</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold text-amber">Follow Us</p>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li>
              <a
                href="https://www.instagram.com/playmakerz.sportsandevents"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-6 py-6 text-xs text-white/50">
          © {new Date().getFullYear()} Playmakerz — End-to-end production for
          corporate sports leagues.
        </p>
      </div>
    </footer>
  );
}
