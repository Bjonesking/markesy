"use client";

import { useState } from "react";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard indisponível — ignora silenciosamente */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-mono-label text-xs uppercase text-ink-muted">Compartilhar</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener"
        className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink-muted hover:border-navy hover:text-navy"
      >
        WhatsApp
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener"
        className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink-muted hover:border-navy hover:text-navy"
      >
        LinkedIn
      </a>
      <button
        onClick={copyLink}
        className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-ink-muted hover:border-navy hover:text-navy"
      >
        {copied ? "Link copiado!" : "Copiar link"}
      </button>
    </div>
  );
}
