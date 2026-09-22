"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "@/content/clinic";

gsap.registerPlugin(ScrollTrigger);

export function ServicesCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Desktop/tablet largo: rolagem horizontal pinada.
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const scrollAmount = () => track.scrollWidth - section.clientWidth;
      const tween = gsap.to(track, {
        x: () => -scrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollAmount()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.scrollTrigger?.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="servicos" ref={sectionRef} className="relative overflow-hidden bg-cream py-20 lg:h-screen lg:py-0">
      <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-5 md:px-8">
        <div className="mb-10 flex items-end justify-between gap-4 lg:mb-8">
          <div>
            <p className="font-mono-label mb-3 text-xs uppercase text-amber-dark">— Especialidades</p>
            <h2 className="font-display text-4xl font-bold text-navy sm:text-5xl">
              Cuidado que trata <br className="hidden sm:block" />a causa.
            </h2>
          </div>
          <p className="hidden font-mono-label text-xs uppercase text-ink-muted lg:block">→ Scroll</p>
        </div>

        <div className="overflow-x-auto scrollbar-none lg:overflow-visible">
          <div ref={trackRef} className="flex gap-5 pb-2 lg:w-max">
            {services.map((s) => (
              <article
                key={s.slug}
                className="w-[78vw] shrink-0 snap-start rounded-3xl border border-border bg-white p-7 sm:w-[360px]"
              >
                <p className="font-mono-label text-xs text-amber-dark">
                  {s.category} · {services.findIndex((x) => x.slug === s.slug) + 1 < 10 ? "0" : ""}
                  {services.findIndex((x) => x.slug === s.slug) + 1}
                </p>
                <h3 className="mt-4 font-display text-2xl font-bold text-navy">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.short}</p>
                <Link
                  href={`/especialidades/${s.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-amber-dark"
                >
                  Saiba mais <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
