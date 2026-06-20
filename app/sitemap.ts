import type { MetadataRoute } from "next";
import { source } from "@/lib/source";
import { seoConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: seoConfig.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${seoConfig.siteUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${seoConfig.siteUrl}/docs/installation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const docPages: MetadataRoute.Sitemap = source
    .getPages()
    .map((page) => ({
      url: `${seoConfig.siteUrl}/docs/${page.slugs.join("/")}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...docPages];
}
