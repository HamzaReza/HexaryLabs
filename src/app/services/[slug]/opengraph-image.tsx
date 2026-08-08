import { site } from "@/content/site";
import { services } from "@/content/services";
import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "Hexary Labs service";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return renderOgImage({ title: site.tagline });
  }

  return renderOgImage({
    eyebrow: service.heroEyebrow,
    title: service.heroHeadline,
  });
}
