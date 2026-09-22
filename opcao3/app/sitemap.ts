import type { MetadataRoute } from "next";
import { services, clinic } from "@/content/clinic";
import { getAllPostsMeta } from "@/lib/blog";

const BASE_URL = `https://${clinic.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/blog", "/politica-de-privacidade"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${BASE_URL}/especialidades/${s.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPostsMeta().map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}
