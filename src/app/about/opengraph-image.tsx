import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "About Hexary Labs";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "About",
    title: "Software built by people who own the outcome.",
  });
}
