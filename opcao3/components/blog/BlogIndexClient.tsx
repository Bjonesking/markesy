"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

export function BlogIndexClient({ posts, categories }: { posts: PostMeta[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory = !category || p.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, category]);

  const [featured, ...rest] = filtered;

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory(null)}
            className={`rounded-full border px-4 py-2 text-xs font-medium uppercase transition ${
              category === null ? "border-navy bg-navy text-white" : "border-border text-ink-muted hover:border-navy"
            }`}
          >
            Todos
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full border px-4 py-2 text-xs font-medium uppercase transition ${
                category === c ? "border-navy bg-navy text-white" : "border-border text-ink-muted hover:border-navy"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar artigo…"
          className="w-full rounded-full border border-border px-4 py-2.5 text-sm outline-none focus:border-navy sm:w-64"
        />
      </div>

      {filtered.length === 0 && <p className="text-ink-muted">Nenhum artigo encontrado.</p>}

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mb-10 block rounded-3xl border border-border bg-white p-8 transition hover:shadow-lg sm:p-10"
        >
          <span className="font-mono-label inline-block rounded-full bg-amber-soft px-3 py-1 text-[10px] uppercase text-amber-dark">
            {featured.category}
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold text-navy group-hover:text-amber-dark sm:text-4xl">
            {featured.title}
          </h2>
          <p className="mt-3 max-w-2xl text-ink-muted">{featured.description}</p>
          <p className="mt-4 text-xs text-ink-muted">
            {featured.author} · {featured.readingTime}
          </p>
        </Link>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="font-mono-label inline-block rounded-full bg-border px-3 py-1 text-[10px] uppercase text-ink-muted">
              {post.category}
            </span>
            <h3 className="mt-4 font-display text-lg font-bold leading-snug text-navy group-hover:text-amber-dark">
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
