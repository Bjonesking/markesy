import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { getAllPostsMeta } from "@/lib/blog";

const CATEGORY_COLORS: Record<string, string> = {
  Osteopatia: "bg-amber-soft text-amber-dark",
  Coluna: "bg-navy/10 text-navy",
  Postura: "bg-amber-soft text-amber-dark",
  "Pós-cirúrgico": "bg-navy/10 text-navy",
};

export function BlogTeaser() {
  const posts = getAllPostsMeta().slice(0, 3);

  return (
    <section className="bg-cream py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono-label mb-3 text-xs uppercase text-amber-dark">— No blog</p>
            <h2 className="font-display text-4xl font-bold text-navy sm:text-5xl">Pra entender antes de vir.</h2>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-navy hover:text-amber-dark">
            Ver todos os artigos →
          </Link>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  className={`font-mono-label inline-block rounded-full px-3 py-1 text-[10px] uppercase ${
                    CATEGORY_COLORS[post.category] ?? "bg-border text-ink-muted"
                  }`}
                >
                  {post.category}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold leading-snug text-navy group-hover:text-amber-dark">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted line-clamp-2">{post.description}</p>
                <p className="mt-4 text-xs text-ink-muted">{post.readingTime}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
