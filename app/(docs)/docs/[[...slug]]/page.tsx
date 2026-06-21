import { source } from "@/lib/source";
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/mdx-components";
import { Y2kStickers } from "@/components/docs/y2k-stickers";

function BreadcrumbJsonLd({ title, slug }: { title: string; slug: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://y2k-ui.web.id",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Docs",
        item: "https://y2k-ui.web.id/docs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `https://y2k-ui.web.id/docs/${slug}`,
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

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const { body, toc } = page.data;
  const MDX = body;
  const slug = params.slug?.join("/") || "";

  return (
    <DocsPage toc={toc}>
      <BreadcrumbJsonLd title={page.data.title} slug={slug} />
      <Y2kStickers />
      {/* <DocsTitle>{page.data.title}</DocsTitle> */}
      {/* <DocsDescription>{page.data.description}</DocsDescription> */}
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams("slug");
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) return {};
  return {
    title: page.data.title,
    description: page.data.description,
  };
}
