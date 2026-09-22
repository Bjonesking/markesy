"use client";

import { useBooking } from "@/lib/booking-context";

export function BookingCTA({ label = "Quer conversar sobre o seu caso?" }: { label?: string }) {
  const { open } = useBooking();
  return (
    <div className="my-10 flex flex-col items-start gap-4 rounded-2xl bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between">
      <p className="font-medium">{label}</p>
      <button
        onClick={open}
        className="shrink-0 rounded-full bg-amber px-5 py-2.5 text-sm font-bold text-navy hover:bg-amber-dark"
      >
        Agendar avaliação →
      </button>
    </div>
  );
}
