import { Reveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { team } from "@/content/clinic";

export function Team() {
  return (
    <section id="equipe" className="relative overflow-hidden bg-cream py-24">
      <Marquee
        text="EQUIPE · MARKÉSY · CUIDADO · "
        className="absolute bottom-6 left-0 w-full rotate-2 text-navy/[0.04]"
      />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-14 max-w-xl">
          <p className="font-mono-label mb-3 text-xs uppercase text-amber-dark">— Quem cuida de você</p>
          <h2 className="font-display text-4xl font-bold text-navy sm:text-5xl">Uma equipe, um só objetivo.</h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.05}>
              <div
                className={`group rounded-2xl border bg-white p-5 text-center transition-shadow hover:shadow-lg ${
                  member.lead ? "border-amber" : "border-border"
                }`}
              >
                <div
                  className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full font-display text-xl font-bold text-white grayscale transition-all duration-300 group-hover:scale-110 group-hover:grayscale-0"
                  style={{ background: "linear-gradient(160deg, #0a1128, #16213f)" }}
                >
                  <span className="text-amber">{member.initials}</span>
                </div>
                <p className="text-sm font-semibold leading-snug text-navy">{member.name}</p>
                <p className="mt-1 text-xs text-ink-muted">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
