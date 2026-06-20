import type { Metadata } from "next";
import { seoConfig } from "@/lib/seo";

export function generateSiteMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(seoConfig.siteUrl),
    title: {
      default: `${seoConfig.siteName} — Y2K Component Library | Retro-Future React UI`,
      template: `%s — ${seoConfig.siteName}`,
    },
    description: seoConfig.siteDescription,
    keywords: [...seoConfig.keywords],
    authors: [{ name: "Y2K UI Contributors" }],
    creator: "Y2K UI",
    publisher: "Y2K UI",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: seoConfig.siteUrl,
      siteName: seoConfig.siteName,
      title: `${seoConfig.siteName} — Y2K Component Library | Retro-Future React UI`,
      description: seoConfig.siteDescription,
      images: [
        {
          url: seoConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${seoConfig.siteName} — Modern Y2K / kawaii-retro component library`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${seoConfig.siteName} — Y2K Component Library | Retro-Future React UI`,
      description: seoConfig.siteDescription,
      images: [seoConfig.ogImage],
      creator: seoConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: seoConfig.siteUrl,
      languages: {
        "en-US": seoConfig.siteUrl,
      },
    },
    verification: {
      // Add your Google Search Console verification token here
      // google: "your-verification-token",
    },
    ...overrides,
  };
}
