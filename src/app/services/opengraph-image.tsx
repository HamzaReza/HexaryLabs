import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "Hexary Labs services";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Services",
    title: "Four ways we help you build the right thing, and build it well",
  });
}
