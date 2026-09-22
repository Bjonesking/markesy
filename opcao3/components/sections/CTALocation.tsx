"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { clinic } from "@/content/clinic";
import { useBooking } from "@/lib/booking-context";

export function CTALocation() {
  const { open } = useBooking();
  const [showMap, setShowMap] = useState(false);

  return (
    <section className="bg-navy py-24 text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-14 max-w-2xl">
          <p className="font-mono-label mb-3 text-xs uppercase text-amber">— Pronto para começar?</p>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Agende em menos de 2 minutos.</h2>
          <p className="mt-4 text-white/70">
            Escolha data, horário e profissional, e sua mensagem para o WhatsApp é gerada automaticamente.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={open}
              className="rounded-full bg-amber px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-navy hover:bg-amber-dark"
            >
              Agendar consulta
            </button>
            <a
              href={`https://wa.me/${clinic.whatsapp.number}`}
              target="_blank"
              rel="noopener"
              className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-medium text-white hover:border-amber hover:text-amber"
            >
              Prefere o WhatsApp direto?
            </a>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-[repeat(3,minmax(0,1fr))_1.4fr]">
          <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="font-mono-label text-xs uppercase text-amber">Endereço</p>
            <p className="mt-3 text-sm text-white/80">{clinic.address.full}</p>
            <a
              href={clinic.address.mapsUrl}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-block text-sm font-medium text-amber hover:underline"
            >
              Como chegar →
            </a>
          </Reveal>

          <Reveal delay={0.05} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="font-mono-label text-xs uppercase text-amber">Contato</p>
            <a href={clinic.phone.href} className="mt-3 block text-sm text-white/80 hover:text-white">
              {clinic.phone.display}
            </a>
            <a
              href={`https://wa.me/${clinic.whatsapp.number}`}
              target="_blank"
              rel="noopener"
              className="mt-1 block text-sm text-white/80 hover:text-white"
            >
              {clinic.whatsapp.display}
            </a>
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="font-mono-label text-xs uppercase text-amber">Instagram</p>
            <a
              href={clinic.instagram.url}
              target="_blank"
              rel="noopener"
              className="mt-3 block text-sm text-white/80 hover:text-white"
            >
              {clinic.instagram.handle}
            </a>
          </Reveal>

          <Reveal delay={0.15} className="min-h-[260px] overflow-hidden rounded-2xl border border-white/10 lg:row-span-1">
            {showMap ? (
              <iframe
                title={`Localização da ${clinic.name} em ${clinic.city}, ${clinic.state}`}
                src={clinic.address.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 260 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <button
                onClick={() => setShowMap(true)}
                className="flex h-full min-h-[260px] w-full flex-col items-center justify-center gap-2 bg-white/5 text-white/70 transition hover:bg-white/10"
              >
                <span aria-hidden="true" className="text-2xl">
                  🗺️
                </span>
                <span className="text-sm font-medium">Ver mapa</span>
              </button>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
