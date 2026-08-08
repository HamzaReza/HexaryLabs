import { site } from "@/content/site";
import { work } from "@/content/work";
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
  const study = work.find((w) => w.slug === slug);

  if (!study) {
    return renderOgImage({ title: site.tagline });
  }

  return renderOgImage({
    eyebrow: "Case Study",
    title: study.title,
  });
}
