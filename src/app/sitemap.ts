import type { MetadataRoute } from "next";

import { source } from "@/lib/source";

export const dynamic = "force-static";

const SITE_URL = "https://dismatch.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const docPages = source.getPages().map((page) => ({
    url: `${SITE_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...docPages,
  ];
}
