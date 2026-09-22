"use client";

import { buildWhatsAppUrl, defaultBookingMessage } from "@/content/clinic";

export function WhatsAppFloat() {
  return (
    <a
      href={buildWhatsAppUrl(defaultBookingMessage)}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/20 transition-transform hover:scale-110"
    >
      <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-navy px-3 py-1.5 text-xs font-medium text-white group-hover:block">
        Fala com a gente
      </span>
      <svg viewBox="0 0 24 24" fill="#fff" className="h-7 w-7" aria-hidden="true">
        <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.42 1.26 4.86L2 22l5.34-1.31a9.9 9.9 0 0 0 4.7 1.2h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.83 14.2c-.25.7-1.25 1.3-2.03 1.46-.55.12-1.26.21-3.66-.78-3.07-1.27-5.05-4.38-5.2-4.58-.15-.2-1.24-1.65-1.24-3.15s.78-2.23 1.06-2.53c.28-.3.6-.38.8-.38.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.76 1.26 1.64 2.04 1.13 1 2.08 1.32 2.38 1.47.3.15.48.13.65-.07.18-.2.75-.87.95-1.17.2-.3.4-.25.65-.15.26.1 1.65.78 1.94.92.28.15.47.22.54.33.07.13.07.68-.18 1.38z" />
      </svg>
    </a>
  );
}
