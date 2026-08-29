import { getCaseStudyBySlug, getSiteMeta } from "@/lib/data";
import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "Hexary Labs case study";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    const site = await getSiteMeta();
    return renderOgImage({ title: site.tagline });
  }

  return renderOgImage({
    eyebrow: "Case Study",
    title: study.title,
  });
}
