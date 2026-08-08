import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "Hexary Labs integrations";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Integrations",
    title: "Systems that already talk to each other",
  });
}
