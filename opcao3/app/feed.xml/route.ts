import { getAllPostsMeta } from "@/lib/blog";
import { clinic } from "@/content/clinic";

const BASE_URL = `https://${clinic.domain}`;

export async function GET() {
  const posts = getAllPostsMeta();

  const items = posts
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${BASE_URL}/blog/${p.slug}</link>
      <guid>${BASE_URL}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.description}]]></description>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${clinic.name} — Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Artigos sobre osteopatia, fisioterapia e recuperação.</description>
    <language>pt-br</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
