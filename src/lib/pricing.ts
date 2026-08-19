export const GST_RATE = 0.18;

export const PACKAGES = [
  { id: "bat-bowl", name: "Bat / Bowl", basePrice: 800 },
  { id: "all-rounder", name: "All Rounder", basePrice: 1200 },
] as const;

export type PackageId = (typeof PACKAGES)[number]["id"];

export function gstAmount(basePrice: number) {
  return Math.round(basePrice * GST_RATE);
}

export function totalWithGst(basePrice: number) {
  return basePrice + gstAmount(basePrice);
}

export function findPackage(id: string) {
  return PACKAGES.find((p) => p.id === id);
}

export function packageLabel(pkg: { name: string; basePrice: number }) {
  return `${pkg.name} Trial — ₹${totalWithGst(pkg.basePrice)} (incl. 18% GST)`;
}
