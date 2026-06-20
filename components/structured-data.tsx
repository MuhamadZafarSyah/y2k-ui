import { seoConfig } from "@/lib/seo";

interface StructuredDataProps {
  type?: "website" | "article" | "software" | "faq";
  title?: string;
  description?: string;
  url?: string;
  datePublished?: string;
  dateModified?: string;
}

export function StructuredData({
  type = "website",
  title,
  description,
  url,
  datePublished,
  dateModified,
}: StructuredDataProps) {
  const baseUrl = seoConfig.siteUrl;

  const schemas: Record<string, object> = {
    website: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: seoConfig.siteName,
      alternateName: "Y2KUI",
      url: baseUrl,
      description: seoConfig.siteDescription,
      publisher: {
        "@type": "Organization",
        name: seoConfig.siteName,
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/favicon.svg`,
          width: 64,
          height: 64,
        },
        sameAs: ["https://github.com/MuhamadZafarSyah/y2k-ui"],
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}/docs?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en-US",
    },
    software: {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: "Y2K UI",
      description: seoConfig.siteDescription,
      url: baseUrl,
      codeRepository: "https://github.com/MuhamadZafarSyah/y2k-ui",
      programmingLanguage: "TypeScript",
      runtimePlatform: "Next.js",
      license: "https://opensource.org/licenses/MIT",
      author: {
        "@type": "Organization",
        name: seoConfig.siteName,
        url: baseUrl,
      },
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Cross-platform",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    article: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: title || seoConfig.siteName,
      description: description || seoConfig.siteDescription,
      url: url || baseUrl,
      datePublished: datePublished || new Date().toISOString(),
      dateModified: dateModified || new Date().toISOString(),
      author: {
        "@type": "Organization",
        name: seoConfig.siteName,
        url: baseUrl,
      },
      publisher: {
        "@type": "Organization",
        name: seoConfig.siteName,
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/favicon.svg`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url || baseUrl,
      },
      about: {
        "@type": "Thing",
        name: "Y2K UI Component Library",
      },
    },
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Y2K UI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Y2K UI is a modern Y2K / kawaii-retro component library built on shadcn and Radix UI. It features flat windows, thick navy outlines, and pastel fills for a retro-future aesthetic.",
          },
        },
        {
          "@type": "Question",
          name: "How to install Y2K UI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Install Y2K UI using the CLI command: npx y2kui@latest init. Then add components with: npx y2kui@latest add <component-name>.",
          },
        },
        {
          "@type": "Question",
          name: "Is Y2K UI compatible with Next.js?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Y2K UI is fully compatible with Next.js 14+ using the App Router. It also works with any React framework that supports Tailwind CSS.",
          },
        },
        {
          "@type": "Question",
          name: "Is Y2K UI free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Y2K UI is open-source and free to use under the MIT license. You can use it in personal and commercial projects.",
          },
        },
        {
          "@type": "Question",
          name: "How many components does Y2K UI have?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Y2K UI currently has 30+ components including buttons, inputs, dialogs, forms, navigation, and more — all styled with the Y2K retro-future aesthetic.",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas[type]),
      }}
    />
  );
}
