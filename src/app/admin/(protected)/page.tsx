"use client";

import { useEffect, useState } from "react";

type Stats = {
  totalRegistrations: number;
  totalRevenue: number;
  whatsappSent: number;
  whatsappFailed: number;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((body) => setStats(body));
  }, []);

  const cards = [
    { label: "Total Registrations", value: stats?.totalRegistrations },
    {
      label: "Total Revenue",
      value: stats ? `₹${stats.totalRevenue.toLocaleString("en-IN")}` : undefined,
    },
    { label: "WhatsApp Sent", value: stats?.whatsappSent },
    { label: "WhatsApp Failed", value: stats?.whatsappFailed },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl bg-[#1a1b1e] p-6">
            <p className="text-sm text-white/50">{c.label}</p>
            <p className="mt-2 font-heading text-3xl font-bold text-amber">
              {c.value ?? "—"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
