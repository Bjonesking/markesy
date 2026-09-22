"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "markesy-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage indisponível (modo privado etc.) — não bloqueia a página
      setVisible(true);
    }
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
    // NOTA: sem GA4/Meta Pixel real conectado ainda (não temos os IDs).
    // Quando existirem, o carregamento condicional dos scripts entra aqui,
    // só depois de value === "accepted".
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-border bg-cream/98 px-5 py-4 backdrop-blur md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm text-ink-muted">
          Usamos cookies essenciais para o site funcionar bem. Não vendemos seus dados. Veja a{" "}
          <a href="/politica-de-privacidade" className="text-navy underline">
            Política de Privacidade
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => choose("declined")}
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-ink-muted hover:border-navy hover:text-navy"
          >
            Recusar
          </button>
          <button
            onClick={() => choose("accepted")}
            className="rounded-full bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-navy-soft"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}
