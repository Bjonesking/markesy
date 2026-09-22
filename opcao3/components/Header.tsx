"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clinic } from "@/content/clinic";
import { useBooking } from "@/lib/booking-context";

const NAV_LINKS = [
  { href: "#servicos", label: "Serviços" },
  { href: "#clinica", label: "A Clínica" },
  { href: "#equipe", label: "Equipe" },
  { href: "#metodo", label: "Método" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "/blog", label: "Blog" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const pathname = usePathname();
  const hasHeroBackdrop = pathname === "/"; // só a home tem hero escuro atrás da nav
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { open } = useBooking();
  const solid = !hasHeroBackdrop || scrolled;

  useEffect(() => {
    if (!hasHeroBackdrop) return;
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasHeroBackdrop]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid || menuOpen
            ? "bg-cream/95 backdrop-blur border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/"
            className={`font-display text-xl font-bold tracking-tight transition-colors ${
              solid || menuOpen ? "text-navy" : "text-white"
            }`}
          >
            Markésy
          </Link>

          <nav
            className={`hidden items-center gap-7 font-mono-label text-[11px] uppercase lg:flex ${
              solid ? "text-ink-muted" : "text-white/80"
            }`}
          >
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-amber">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={open}
              className="hidden items-center gap-2 rounded-full bg-amber px-5 py-2.5 font-mono-label text-[11px] font-bold uppercase text-navy transition hover:bg-amber-dark sm:inline-flex"
            >
              Agendar
            </button>
            <button
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className={`flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border transition-colors ${
                solid || menuOpen ? "border-border" : "border-white/40"
              }`}
            >
              <span
                className={`block h-[1.5px] w-5 transition-all ${solid || menuOpen ? "bg-navy" : "bg-white"} ${
                  menuOpen ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[1.5px] w-5 transition-all ${solid || menuOpen ? "bg-navy" : "bg-white"} ${
                  menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile em tela cheia */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-navy pt-24 transition-transform duration-500 ease-out lg:hidden ${
          menuOpen ? "translate-y-0" : "-translate-y-full pointer-events-none"
        }`}
      >
        <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-4 font-display text-3xl text-white transition-colors hover:text-amber"
              style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="px-8 pb-10">
          <button
            onClick={() => {
              setMenuOpen(false);
              open();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-amber px-6 py-4 font-mono-label text-sm font-bold uppercase text-navy"
          >
            Agendar avaliação →
          </button>
          <p className="mt-4 text-center text-sm text-white/50">{clinic.address.full}</p>
        </div>
      </div>
    </>
  );
}
