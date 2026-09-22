import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { services, testimonials, faq, clinic } from "@/content/clinic";
import { getAllPostsMeta } from "@/lib/blog";
import { BookingCTA } from "@/components/blog/BookingCTA";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} em ${clinic.city}, ${clinic.state}`,
    description: service.short,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const relatedTestimonials = testimonials.slice(0, 2);
  const relatedPosts = getAllPostsMeta().slice(0, 2);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name: service.name,
    description: service.short,
  };

  return (
    <div className="pb-24 pt-32 md:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <p className="font-mono-label mb-4 text-xs uppercase text-amber-dark">{service.category}</p>
        <h1 className="font-display text-4xl font-bold leading-[0.95] text-navy sm:text-6xl">
          {service.name.split(" ")[0]}
          <span className="text-amber-dark">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink-muted">{service.short}</p>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-navy">Quando é indicada</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {service.whenIndicated.map((item) => (
              <li key={item} className="flex items-start gap-2 rounded-xl border border-border bg-white p-4 text-sm text-ink">
                <span className="text-amber-dark" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-navy">Como é uma sessão</h2>
          <ol className="mt-4 space-y-4">
            {service.howItWorks.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="font-mono-label flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] text-amber">
                  {i + 1}
                </span>
                <p className="text-ink-muted">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <BookingCTA label={`Pronto pra começar com ${service.name.toLowerCase()}?`} />

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-navy">Quem já passou por aqui</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            {relatedTestimonials.map((t) => (
              <blockquote key={t.name} className="rounded-2xl border-t-4 border-amber bg-white p-6">
                <p className="text-sm text-ink">{t.quote}</p>
                <footer className="mt-3 text-xs text-ink-muted">
                  <strong className="text-navy">{t.name}</strong> — {t.context}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold text-navy">Perguntas frequentes</h2>
          <div className="mt-4 divide-y divide-border border-y border-border">
            {faq.slice(0, 3).map((item) => (
              <details key={item.question} className="group py-4">
                <summary className="cursor-pointer list-none font-medium text-navy">{item.question}</summary>
                <p className="mt-2 text-sm text-ink-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold text-navy">Leia também</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="rounded-xl border border-border p-4 text-sm font-medium text-navy hover:border-amber"
                >
                  {p.title}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
