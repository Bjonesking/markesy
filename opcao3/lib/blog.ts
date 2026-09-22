import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string; // ISO
  author: string; // nome de alguém da equipe real
  readingTime: string;
};

function readingTimeFromText(text: string) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min de leitura`;
}

export function getAllPostsMeta(): PostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title as string,
      description: data.description as string,
      category: data.category as string,
      date: data.date as string,
      author: data.author as string,
      readingTime: readingTimeFromText(content),
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostSource(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title as string,
      description: data.description as string,
      category: data.category as string,
      date: data.date as string,
      author: data.author as string,
      readingTime: readingTimeFromText(content),
    } satisfies PostMeta,
    content,
  };
}

export function getAllCategories() {
  const posts = getAllPostsMeta();
  return Array.from(new Set(posts.map((p) => p.category)));
}
