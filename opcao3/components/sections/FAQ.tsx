"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { faq } from "@/content/clinic";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? faq : faq.slice(0, 5);

  return (
    <section id="faq" className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal className="mb-12 text-center">
          <p className="font-mono-label mb-3 text-xs uppercase text-amber-dark">— Perguntas frequentes</p>
          <h2 className="font-display text-4xl font-bold text-navy sm:text-5xl">Ainda com dúvidas?</h2>
        </Reveal>

        <div className="divide-y divide-border border-y border-border">
          {visible.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 py-5 text-left"
                >
                  <span className="font-mono-label shrink-0 text-xs text-amber-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-medium text-navy">{item.question}</span>
                  <span
                    className={`shrink-0 text-xl text-ink-muted transition-transform ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid overflow-hidden transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pl-9 pr-6 text-sm leading-relaxed text-ink-muted">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!showAll && faq.length > 5 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-navy transition hover:border-navy"
            >
              Ver mais perguntas
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
