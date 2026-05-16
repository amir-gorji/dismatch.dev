import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getMDXComponents } from "@/components/mdx";
import { source } from "@/lib/source";

const SITE_URL = "https://dismatch.dev";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const canonical = `${SITE_URL}${page.url}`;

  const techArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.data.title,
    description: page.data.description,
    url: canonical,
    author: { "@type": "Person", name: "Amir Gorji" },
    publisher: {
      "@type": "Organization",
      name: "dismatch",
      url: SITE_URL,
    },
  };

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const slug = params.slug;
  const canonical = `${SITE_URL}${page.url}`;

  const isComparison =
    slug?.length === 1 && slug[0] === "comparison";

  return {
    title: isComparison
      ? "dismatch vs ts-pattern vs neverthrow · TypeScript discriminated unions"
      : page.data.title,
    description: page.data.description,
    alternates: { canonical },
  };
}
