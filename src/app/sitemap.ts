import type { MetadataRoute } from "next";
import { getCaseStudySlugs, getServiceSlugs, getSiteMeta } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, serviceSlugs, caseStudySlugs] = await Promise.all([
    getSiteMeta(),
    getServiceSlugs(),
    getCaseStudySlugs(),
  ]);

  const routes = [
    "",
    "/services",
    "/integrations",
    "/work",
    "/how-we-work",
    "/about",
    "/contact",
  ];

  return [
    ...routes.map((r) => ({
      url: `${site.url}${r}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: r === "" ? 1 : 0.8,
    })),
    ...serviceSlugs.map((slug) => ({
      url: `${site.url}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...caseStudySlugs.map((slug) => ({
      url: `${site.url}/work/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
