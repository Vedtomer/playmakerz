"use client";

import { Fragment, useEffect, useState } from "react";

type Registration = {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  trial_location: string;
  package_label: string;
  amount_inr: number;
  payment_status: "created" | "paid" | "failed";
  whatsapp_sent: 0 | 1;
  email_sent: 0 | 1;
  created_at: string;
};

const STATUS_STYLES: Record<Registration["payment_status"], string> = {
  paid: "bg-green-500/15 text-green-400",
  created: "bg-white/10 text-white/60",
  failed: "bg-red-500/15 text-red-400",
};

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[] | null>(null);
  const [selected, setSelected] = useState<Record<string, unknown> | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    fetch("/api/admin/registrations")
      .then((r) => r.json())
      .then((body) => setRegistrations(body.registrations ?? []));
  }, []);

  async function viewDetails(id: number) {
    setLoadingDetail(true);
    setSelected({});
    try {
      const res = await fetch(`/api/admin/registrations/${id}`);
      const body = await res.json();
      setSelected(body.registration ?? null);
    } finally {
      setLoadingDetail(false);
    }
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Registrations</h1>

      <div className="mt-6 overflow-x-auto rounded-xl bg-[#1a1b1e]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-white/50">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Package</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {registrations === null && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-white/50">
                  Loading…
                </td>
              </tr>
            )}
            {registrations?.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-white/50">
                  No registrations yet.
                </td>
              </tr>
            )}
            {registrations?.map((r) => (
              <tr key={r.id} className="border-b border-white/5">
                <td className="px-4 py-3">{r.full_name}</td>
                <td className="px-4 py-3 text-white/70">{r.phone}</td>
                <td className="px-4 py-3 text-white/70">{r.package_label}</td>
                <td className="px-4 py-3 text-white/70">₹{r.amount_inr}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STATUS_STYLES[r.payment_status]}`}
                  >
                    {r.payment_status}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/50">
                  {new Date(r.created_at).toLocaleDateString("en-IN")}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => viewDetails(r.id)}
                    className="text-amber hover:text-amber-dark font-medium"
                  >
                    View details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="w-full max-w-lg rounded-2xl bg-[#1a1b1e] p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold">Registration Details</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-white/50 hover:text-white"
              >
                ✕
              </button>
            </div>

            {loadingDetail ? (
              <p className="mt-6 text-center text-white/50">Loading…</p>
            ) : (
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                {Object.entries(selected).map(([key, value]) => (
                  <Fragment key={key}>
                    <dt className="capitalize text-white/50">
                      {key.replace(/_/g, " ")}
                    </dt>
                    <dd className="text-white break-all">
                      {String(value ?? "—")}
                    </dd>
                  </Fragment>
                ))}
              </dl>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
