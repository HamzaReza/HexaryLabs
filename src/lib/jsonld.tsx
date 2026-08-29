import { getSiteMetaSync } from "@/lib/data";

/** Renders a `<script type="application/ld+json">` tag, escaping `<` so embedded content can't break out of the script context. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export type BreadcrumbItem = { name: string; path: string };

/** Builds BreadcrumbList JSON-LD from a list of {name, path} pairs, in order from Home to the current page. */
export function breadcrumbList(items: BreadcrumbItem[]) {
  const site = getSiteMetaSync();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
