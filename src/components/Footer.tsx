import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 flex flex-col gap-10 sm:flex-row sm:justify-between">
        <div>
          <p className="font-heading text-2xl font-bold">playmakerz</p>
          <p className="mt-3 text-sm text-white/60 max-w-xs">
            End-to-end production for corporate sports leagues.
          </p>
        </div>

        <div className="sm:text-right">
          <p className="font-semibold text-amber">Get Stadium-Ready</p>
          <ul className="mt-3 space-y-1.5 text-sm text-white/70">
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
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-white/50">
          <p>
            © {new Date().getFullYear()} Playmakerz — End-to-end production
            for corporate sports leagues.
          </p>
          <Link href="/" className="underline hover:text-white">
            Home
          </Link>
        </div>
      </div>
    </footer>
  );
}
