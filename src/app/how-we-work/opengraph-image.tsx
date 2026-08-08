import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "How Hexary Labs works";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "How we work",
    title: "The same four steps, on every engagement",
  });
}
