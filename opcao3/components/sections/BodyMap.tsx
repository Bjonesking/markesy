"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { bodyRegions, services } from "@/content/clinic";
import { useBooking } from "@/lib/booking-context";

export function BodyMap() {
  const [activeId, setActiveId] = useState<string>(bodyRegions[2].id);
  const { open } = useBooking();
  const active = bodyRegions.find((r) => r.id === activeId)!;
  const relatedService = services.find((s) => s.slug === active.serviceSlug);

  return (
    <section className="bg-navy py-24 text-white">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mb-12 max-w-xl">
          <p className="font-mono-label mb-3 text-xs uppercase text-amber">— Onde dói?</p>
          <h2 className="font-display text-4xl font-bold sm:text-5xl">Toque na região que incomoda.</h2>
          <p className="mt-4 text-white/60">
            Um jeito rápido de ver o que costumamos tratar em cada parte do corpo — antes de marcar sua
            avaliação real.
          </p>
        </Reveal>

        <div className="grid items-center gap-10 lg:grid-cols-[0.7fr_1fr]">
          <Reveal className="mx-auto w-full max-w-[260px]">
            <svg viewBox="0 0 100 100" className="w-full" role="img" aria-label="Silhueta do corpo humano com regiões clicáveis">
              {/* Silhueta simplificada em linhas */}
              <g fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.2">
                <circle cx="50" cy="9" r="6" />
                <path d="M50 15 V32" />
                <path d="M50 20 L32 26 M50 20 L68 26" />
                <path d="M32 26 L28 42 M68 26 L72 42" />
                <path d="M50 32 Q34 40 38 54 Q40 62 42 74 L40 94" />
                <path d="M50 32 Q66 40 62 54 Q60 62 58 74 L60 94" />
                <path d="M38 54 L62 54" />
              </g>
              {bodyRegions.map((region) => (
                <g key={region.id}>
                  {activeId === region.id && (
                    <circle cx={region.cx} cy={region.cy} r={region.r + 3} fill="rgba(227,165,72,0.18)" />
                  )}
                  <circle
                    cx={region.cx}
                    cy={region.cy}
                    r={region.r}
                    fill={activeId === region.id ? "#e3a548" : "rgba(255,255,255,0.12)"}
                    stroke={activeId === region.id ? "#e3a548" : "rgba(255,255,255,0.4)"}
                    strokeWidth="0.6"
                    className="cursor-pointer transition-colors"
                    onClick={() => setActiveId(region.id)}
                  />
                  <foreignObject x={region.cx - 6} y={region.cy - 6} width="12" height="12">
                    <button
                      type="button"
                      aria-label={region.label}
                      onClick={() => setActiveId(region.id)}
                      className="h-full w-full cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber"
                    />
                  </foreignObject>
                </g>
              ))}
            </svg>
          </Reveal>

          <Reveal delay={0.1} className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <p className="font-mono-label text-xs uppercase text-amber">{active.label}</p>
            <h3 className="mt-2 font-display text-2xl font-bold">Queixas comuns nessa região</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {active.complaints.map((c) => (
                <li key={c} className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-white/80">
                  {c}
                </li>
              ))}
            </ul>

            {relatedService && (
              <p className="mt-6 text-sm text-white/60">
                Serviço indicado:{" "}
                <Link href={`/especialidades/${relatedService.slug}`} className="font-semibold text-amber hover:underline">
                  {relatedService.name} ↗
                </Link>
              </p>
            )}

            <button
              onClick={open}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-bold text-navy hover:bg-amber-dark"
            >
              Agendar avaliação →
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
