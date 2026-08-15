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
  {
    href: "https://www.instagram.com/playmakerz.sportsandevents",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="7.2" cy="7.5" r="1.4" />
        <rect x="6.1" y="10.2" width="2.2" height="8" />
        <path d="M11.4 10.2h2.1v1.2c.6-.9 1.6-1.5 2.9-1.5 2.2 0 3.5 1.4 3.5 4.1v4.2h-2.2v-3.8c0-1.4-.5-2.3-1.8-2.3-1 0-1.6.7-1.9 1.3-.1.2-.1.6-.1.9v3.9h-2.2v-8z" />
      </svg>
    ),
  },
  {
    href: "https://www.youtube.com/",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000" />
        <path d="M10 8.5l6 3.5-6 3.5z" fill="white" />
      </svg>
    ),
  },
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
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Playmakerz"
              width={220}
              height={220}
              className="h-20 w-20 sm:h-24 sm:w-24 object-contain"
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
                      <Link href="/upcoming-tournaments#fpl" className="block px-4 py-2 text-sm hover:text-amber">
                        Faridabad Premier League
                      </Link>
                    </li>
                    <li>
                      <Link href="/upcoming-tournaments#pcl" className="block px-4 py-2 text-sm hover:text-amber">
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
                className="text-white/80 hover:text-amber transition-colors"
              >
                <span className="sr-only">{s.label}</span>
                {s.icon}
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
                    aria-label={s.label}
                    className="text-white/80"
                  >
                    {s.icon}
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
