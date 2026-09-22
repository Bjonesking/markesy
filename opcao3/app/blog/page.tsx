import type { Metadata } from "next";
import { getAllPostsMeta, getAllCategories } from "@/lib/blog";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artigos sobre osteopatia, fisioterapia e recuperação, escritos pela equipe da Markésy.",
};

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <p className="font-mono-label mb-3 text-xs uppercase text-amber-dark">— Blog</p>
      <h1 className="mb-10 font-display text-4xl font-bold text-navy sm:text-5xl">
        Pra entender antes de vir.
      </h1>
      <BlogIndexClient posts={posts} categories={categories} />
    </div>
  );
}
