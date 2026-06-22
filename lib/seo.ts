const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://y2kui.web.id";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Y2K UI";
const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  "Modern Y2K / kawaii-retro component library — flat windows, thick navy outlines, pastel fills. Built on shadcn + Radix UI.";

export const seoConfig = {
  siteUrl,
  siteName,
  siteDescription,
  twitterHandle: "@y2kui",
  ogImage: `${siteUrl}/og.png`,
  keywords: [
    "y2k ui",
    "y2k component library",
    "y2k design system",
    "kawaii ui",
    "retro ui components",
    "retro future ui",
    "pastel ui library",
    "shadcn alternative",
    "radix ui components",
    "react component library",
    "next.js ui kit",
    "flat design ui",
    "y2k aesthetic web design",
    "kawaii retro web",
    "y2k web components",
    "retro web design",
    "pastel color ui",
    "y2k css framework",
    "modern y2k design",
    "y2k frontend",
  ],
} as const;

export type SeoConfig = typeof seoConfig;
