import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "Contact Hexary Labs";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Contact",
    title: "Let's Get Started.",
  });
}
