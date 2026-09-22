import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { clinic } from "@/content/clinic";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${clinic.fullName} em ${clinic.city}, ${clinic.state}`,
    template: `%s | ${clinic.name}`,
  },
  description:
    "Clínica de Osteopatia & Fisioterapia em Macaé, RJ. Tratamento individual, da avaliação à alta, com foco em tratar a causa da dor.",
  robots: "noindex, nofollow", // Opção 3 é material de aprovação — remover ao publicar de verdade
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: clinic.name,
  description: "Clínica de Osteopatia & Fisioterapia em Macaé, RJ.",
  medicalSpecialty: ["Physiotherapy", "Osteopathic"],
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address.street,
    addressLocality: clinic.address.city,
    addressRegion: clinic.address.state,
    postalCode: clinic.address.zip,
    addressCountry: "BR",
  },
  telephone: [`+55 22 3083-0089`, `+55 22 99278-1960`],
  sameAs: [clinic.instagram.url],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-cream text-ink antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
