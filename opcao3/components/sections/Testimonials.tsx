"use client";

import { useEffect, useRef } from "react";
import { Reveal } from "@/components/Reveal";
import { testimonials } from "@/content/clinic";

export function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let paused = false;
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);
    track.addEventListener("touchstart", onEnter, { passive: true });

    const interval = setInterval(() => {
      if (paused || !track) return;
      const card = track.querySelector<HTMLElement>("[data-card]");
      const step = card ? card.offsetWidth + 20 : 320;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: "smooth" });
    }, 3800);

    return () => {
      clearInterval(interval);
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
      track.removeEventListener("touchstart", onEnter);
    };
  }, []);

  return (
    <section id="depoimentos" className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-4">
          <p className="font-mono-label mb-3 text-xs uppercase text-amber-dark">— Quem já passou por aqui</p>
          <h2 className="font-display text-4xl font-bold text-navy sm:text-5xl">Histórias reais de pacientes.</h2>
        </Reveal>

        <div
          ref={trackRef}
          className="scrollbar-none mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        >
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              data-card
              className="w-[85vw] shrink-0 snap-start rounded-3xl border-t-4 border-amber bg-white p-7 shadow-sm sm:w-[380px]"
            >
              <p className="font-display text-3xl text-amber-dark">&ldquo;</p>
              <p className="text-ink">{t.quote}</p>
              <footer className="mt-5 text-sm text-ink-muted">
                <strong className="text-navy">{t.name}</strong> — {t.context}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
