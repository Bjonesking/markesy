"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { clinic } from "@/content/clinic";
import { useBooking } from "@/lib/booking-context";

const Spine3D = dynamic(() => import("@/components/hero/Spine3D").then((m) => m.Spine3D), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden="true" />,
});

export function Hero() {
  const { open } = useBooking();
  const line1 = useRef<HTMLSpanElement>(null);
  const line2 = useRef<HTMLSpanElement>(null);
  const rest = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      [line1.current, line2.current].forEach((el, i) => {
        if (!el) return;
        const words = el.querySelectorAll(".word");
        tl.fromTo(
          words,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: "power4.out" },
          i * 0.15
        );
      });
      tl.fromTo(rest.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.3");
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/95 to-navy-soft/70" />
        <div className="absolute right-0 top-0 h-full w-full opacity-90 sm:w-2/3">
          <Spine3D />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-40 md:px-8 md:pb-28">
        <p className="font-mono-label mb-4 text-xs uppercase text-amber sm:text-sm">
          Osteopatia &amp; Fisioterapia · {clinic.city}, {clinic.state}
        </p>
        <h1 className="max-w-3xl font-display text-[13vw] font-bold uppercase leading-[0.92] text-white sm:text-6xl md:text-7xl lg:text-8xl">
          <span ref={line1} className="block overflow-hidden">
            <span className="word inline-block">Equilíbrio</span>
          </span>
          <span ref={line2} className="block overflow-hidden text-amber">
            <span className="word inline-block">que</span>{" "}
            <span className="word inline-block">transforma.</span>
          </span>
        </h1>

        <div ref={rest} className="mt-8 max-w-lg">
          <p className="text-base text-white/75 sm:text-lg">{clinic.tagline}</p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button
              onClick={open}
              className="rounded-full bg-amber px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-navy transition hover:bg-amber-dark"
            >
              Agendar avaliação
            </button>
            <a href="#servicos" className="group flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white">
              Ver especialidades
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
