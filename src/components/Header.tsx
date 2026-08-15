"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Our Services" },
  { href: "/upcoming-tournaments", label: "Upcoming Tournaments", dropdown: true },
  { href: "/experience", label: "The Experience" },
];

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/playmakerz.sportsandevents", label: "Instagram" },
  { href: "https://www.linkedin.com/", label: "LinkedIn" },
  { href: "https://www.youtube.com/", label: "YouTube" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tournamentsOpen, setTournamentsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-black text-amber text-center text-xs sm:text-sm py-2 px-4 tracking-wide">
        STARTED: Trials for Faridabad Premier League
      </div>
      <div className="bg-black text-white">
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Playmakerz"
              width={140}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-8 font-medium">
            {NAV_LINKS.map((link) => (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => link.dropdown && setTournamentsOpen(true)}
                onMouseLeave={() => link.dropdown && setTournamentsOpen(false)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 transition-colors hover:text-amber ${
                    pathname === link.href ? "text-amber" : "text-white"
                  }`}
                >
                  {link.label}
                  {link.dropdown && (
                    <svg
                      viewBox="0 0 12 8"
                      className="h-2.5 w-2.5 fill-current"
                      aria-hidden
                    >
                      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                  )}
                </Link>
                {link.dropdown && tournamentsOpen && (
                  <ul className="absolute left-0 top-full mt-2 w-48 rounded-lg bg-black py-2 shadow-lg ring-1 ring-white/10">
                    <li>
                      <Link href="/upcoming-tournaments" className="block px-4 py-2 text-sm hover:text-amber">
                        Faridabad Premier League
                      </Link>
                    </li>
                    <li>
                      <Link href="/upcoming-tournaments" className="block px-4 py-2 text-sm hover:text-amber">
                        Playmakerz Champions League
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-5">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-white/80 hover:text-amber"
              >
                <span className="sr-only">{s.label}</span>
                <span aria-hidden className="text-lg">
                  {s.label === "Instagram" ? "◎" : s.label === "LinkedIn" ? "in" : "▶"}
                </span>
              </a>
            ))}
            <Link
              href="/register-for-trials"
              className={`font-semibold underline underline-offset-4 transition-colors ${
                pathname === "/register-for-trials" ? "text-amber" : "text-amber/90 hover:text-amber"
              }`}
            >
              Register for Trials
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="h-0.5 w-6 bg-white" />
            <span className="h-0.5 w-6 bg-white" />
            <span className="h-0.5 w-6 bg-white" />
          </button>
        </nav>

        {open && (
          <div className="lg:hidden border-t border-white/10 px-6 py-4">
            <ul className="flex flex-col gap-4 font-medium">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block ${
                      pathname === link.href ? "text-amber" : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/register-for-trials"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center rounded-full bg-amber px-6 py-3 font-semibold text-black"
                >
                  Register for Trials
                </Link>
              </li>
              <li className="flex gap-5 pt-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80"
                  >
                    {s.label}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
