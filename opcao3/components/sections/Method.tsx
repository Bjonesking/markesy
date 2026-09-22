"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/Reveal";
import { method } from "@/content/clinic";

gsap.registerPlugin(ScrollTrigger);

export function Method() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const fill = fillRef.current;
    if (!section || !fill) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(fill, { height: "100%" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="metodo" ref={sectionRef} className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <Reveal className="mb-16 text-center">
          <p className="font-mono-label mb-3 text-xs uppercase text-amber-dark">— Como funciona</p>
          <h2 className="font-display text-4xl font-bold text-navy sm:text-5xl">
            Três etapas. <br />
            Zero achismo.
          </h2>
        </Reveal>

        <div className="relative pl-10 sm:pl-16">
          <div className="absolute left-3 top-1 h-full w-[2px] bg-border sm:left-6">
            <div ref={fillRef} className="w-full bg-amber" style={{ height: "0%" }} />
          </div>

          <ol className="space-y-14">
            {method.map((step) => (
              <Reveal key={step.number} as="li">
                <div className="relative">
                  <span className="absolute -left-10 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-navy font-mono-label text-[11px] text-amber sm:-left-16 sm:h-9 sm:w-9">
                    {step.number}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-navy">{step.title}</h3>
                  <p className="mt-2 max-w-lg text-ink-muted">{step.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="font-mono-label rounded-full bg-amber-soft px-3 py-1 text-[10px] uppercase text-amber-dark">
                      {step.duration}
                    </span>
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-label rounded-full border border-border px-3 py-1 text-[10px] uppercase text-ink-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
