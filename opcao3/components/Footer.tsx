"use client";

import Link from "next/link";
import { clinic, services } from "@/content/clinic";
import { useBooking } from "@/lib/booking-context";

export function Footer() {
  const { open } = useBooking();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-amber bg-navy text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:px-8 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold text-white">Markésy</p>
          <p className="mt-3 max-w-xs text-sm text-white/60">{clinic.tagline}</p>
          <a
            href={clinic.instagram.url}
            target="_blank"
            rel="noopener"
            className="mt-4 inline-block text-sm text-amber hover:underline"
          >
            {clinic.instagram.handle}
          </a>
        </div>

        <div>
          <p className="font-mono-label mb-4 text-xs uppercase text-amber">Especialidades</p>
          <ul className="space-y-2 text-sm">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href={`/especialidades/${s.slug}`} className="transition-colors hover:text-white">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono-label mb-4 text-xs uppercase text-amber">Clínica</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#clinica" className="transition-colors hover:text-white">
                A clínica
              </Link>
            </li>
            <li>
              <Link href="/#equipe" className="transition-colors hover:text-white">
                Equipe
              </Link>
            </li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/politica-de-privacidade" className="transition-colors hover:text-white">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-mono-label mb-4 text-xs uppercase text-amber">Onde estamos</p>
          <p className="text-sm text-white/70">{clinic.address.full}</p>
          <a href={clinic.phone.href} className="mt-2 block text-sm text-white/70 hover:text-white">
            {clinic.phone.display}
          </a>
          <a
            href={`https://wa.me/${clinic.whatsapp.number}`}
            target="_blank"
            rel="noopener"
            className="block text-sm text-white/70 hover:text-white"
          >
            {clinic.whatsapp.display} · WhatsApp
          </a>
          <button
            onClick={open}
            className="mt-5 inline-flex items-center gap-1.5 font-mono-label text-xs font-bold uppercase text-amber hover:underline"
          >
            Agendar consulta →
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-6 text-center text-xs text-white/40 md:px-8">
        © {year} Markésy. Todos os direitos reservados.
      </div>
    </footer>
  );
}
