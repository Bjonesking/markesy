import type { MetadataRoute } from "next";

// Opção 3 é material de aprovação interna — bloqueando indexação/crawling
// de propósito. Trocar para Allow quando (e se) virar o site oficial.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
