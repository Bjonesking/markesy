"use client";

import { useEffect, useState } from "react";

type Heading = { text: string; level: 2 | 3; id: string };

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Sumário do artigo" className="sticky top-28 hidden max-w-[220px] lg:block">
      <p className="font-mono-label mb-3 text-xs uppercase text-ink-muted">Neste artigo</p>
      <ul className="space-y-2 border-l border-border">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? "1.5rem" : "1rem" }}>
            <a
              href={`#${h.id}`}
              className={`block border-l-2 py-0.5 pl-3 -ml-px text-sm transition-colors ${
                activeId === h.id ? "border-amber font-medium text-navy" : "border-transparent text-ink-muted hover:text-navy"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
