import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "Hexary Labs case studies";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Work",
    title: "Selected Work",
  });
}
