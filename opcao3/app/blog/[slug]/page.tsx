import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostsMeta, getPostSource } from "@/lib/blog";
import { extractHeadings } from "@/lib/slugify";
import { mdxComponents } from "@/lib/mdx-components";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { BookingCTA } from "@/components/blog/BookingCTA";
import { clinic } from "@/content/clinic";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPostsMeta().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostSource(slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostSource(slug);
  if (!post) notFound();

  const { meta, content } = post;
  const headings = extractHeadings(content);
  const midpoint = Math.floor(content.length / 2);
  const splitPoint = content.indexOf("\n\n", midpoint);
  const firstHalf = splitPoint > -1 ? content.slice(0, splitPoint) : content;
  const secondHalf = splitPoint > -1 ? content.slice(splitPoint) : "";

  const related = getAllPostsMeta()
    .filter((p) => p.slug !== slug)
    .filter((p) => p.category === meta.category)
    .slice(0, 3);

  const url = `https://${clinic.domain}/blog/${slug}`;

  return (
    <div className="pb-24 pt-32 md:pt-40" id="post-content">
      <ReadingProgress targetId="post-content" />

      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <span className="font-mono-label inline-block rounded-full bg-amber-soft px-3 py-1 text-[10px] uppercase text-amber-dark">
          {meta.category}
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">{meta.title}</h1>
        <p className="mt-4 text-ink-muted">{meta.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-border py-4 text-sm text-ink-muted">
          <span>
            Por <strong className="text-navy">{meta.author}</strong>
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {new Date(meta.date).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
              timeZone: "UTC", // datas do frontmatter são "YYYY-MM-DD" (meia-noite UTC);
              // sem isso, toLocaleDateString converte pro fuso local e o dia sai errado
            })}
          </span>
          <span aria-hidden="true">·</span>
          <span>{meta.readingTime}</span>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-[220px_1fr]">
        <TableOfContents headings={headings} />

        <article className="max-w-3xl">
          <div className="prose-content">
            <MDXRemote source={firstHalf} components={mdxComponents} />
          </div>

          <BookingCTA label="Sua dor tem uma causa. Vamos encontrá-la juntos?" />

          <div className="prose-content">
            <MDXRemote source={secondHalf} components={mdxComponents} />
          </div>

          <BookingCTA label="Quer conversar sobre o seu caso?" />

          <div className="mt-10 border-t border-border pt-8">
            <ShareButtons url={url} title={meta.title} />
          </div>

          {related.length > 0 && (
            <div className="mt-14">
              <p className="font-mono-label mb-4 text-xs uppercase text-amber-dark">Relacionados</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="rounded-xl border border-border p-4 text-sm font-medium text-navy transition hover:border-amber hover:shadow-sm"
                  >
                    {p.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
