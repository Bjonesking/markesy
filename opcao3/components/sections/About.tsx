import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";

export function About() {
  return (
    <section id="clinica" className="relative overflow-hidden bg-navy py-24 text-white">
      <Marquee
        text="MARKÉSY · OSTEOPATIA · MOVIMENTO · EQUILÍBRIO · "
        className="absolute left-0 top-10 w-full -rotate-3 text-white/5"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src="/images/about.jpg"
              alt="Osteopata avaliando a coluna de uma paciente durante consulta"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              priority={false}
            />
          </div>
          <div className="absolute -bottom-6 -right-4 rounded-2xl bg-amber px-5 py-4 text-navy shadow-xl sm:-right-8">
            <p className="font-display text-2xl font-bold leading-none">100%</p>
            <p className="mt-1 text-xs font-medium">tratamento individual</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="font-mono-label mb-4 text-xs uppercase text-amber">— Sobre a clínica</p>
          <h2 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            O corpo é <em className="text-amber not-italic">um só sistema</em>, não partes soltas.
          </h2>
          <p className="mt-6 max-w-lg text-white/70">
            Muitas dores crônicas, tensões e fadigas não têm uma causa óbvia. Na Markésy trabalhamos o
            corpo como um todo, usando terapia manual e osteopatia para reequilibrar o que está por
            trás do problema — não só aliviar o sintoma.
          </p>
          <a
            href="#metodo"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition hover:border-amber hover:text-amber"
          >
            Como funciona o método →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
