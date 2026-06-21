export function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Y2K UI",
    url: "https://y2k-ui.web.id",
    description:
      "Modern Y2K / kawaii-retro React component library built on shadcn + Radix UI",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://y2k-ui.web.id/docs?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    hasPart: [
      {
        "@type": "WebPage",
        name: "Installation",
        url: "https://y2k-ui.web.id/docs/installation",
      },
      {
        "@type": "WebPage",
        name: "Components",
        url: "https://y2k-ui.web.id/docs",
      },
      {
        "@type": "WebPage",
        name: "Button",
        url: "https://y2k-ui.web.id/docs/button",
      },
      {
        "@type": "WebPage",
        name: "Dialog",
        url: "https://y2k-ui.web.id/docs/dialog",
      },
      {
        "@type": "WebPage",
        name: "Input",
        url: "https://y2k-ui.web.id/docs/input",
      },
      {
        "@type": "WebPage",
        name: "Accordion",
        url: "https://y2k-ui.web.id/docs/accordion",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
