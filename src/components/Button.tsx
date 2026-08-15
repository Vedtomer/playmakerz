import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "dark" | "light";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-amber text-black hover:bg-amber-dark border border-amber-dark",
  dark: "bg-black text-white border border-lime hover:bg-black/80",
  light: "bg-mist text-black hover:bg-black hover:text-white",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-7 py-3.5 font-semibold transition-colors ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
