import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPostsMeta, getAllCategories } from "@/lib/blog";
import { slugify } from "@/lib/slugify";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: slugify(c) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getAllCategories().find((c) => slugify(c) === slug);
  return { title: category ? `Blog · ${category}` : "Blog" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getAllCategories().find((c) => slugify(c) === slug);
  if (!category) notFound();

  const posts = getAllPostsMeta().filter((p) => p.category === category);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <Link href="/blog" className="text-sm text-ink-muted hover:text-navy">
        ← Todos os artigos
      </Link>
      <p className="font-mono-label mb-3 mt-4 text-xs uppercase text-amber-dark">Categoria</p>
      <h1 className="mb-10 font-display text-4xl font-bold text-navy sm:text-5xl">{category}</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="font-display text-lg font-bold leading-snug text-navy group-hover:text-amber-dark">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-ink-muted line-clamp-2">{post.description}</p>
            <p className="mt-4 text-xs text-ink-muted">{post.readingTime}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
