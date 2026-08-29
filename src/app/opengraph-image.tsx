import { getSiteMetaSync } from "@/lib/data";
import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

/* Module scope: Next reads `alt` statically, so this can't await. */
const site = getSiteMetaSync();

export const alt = site.name;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({ title: site.tagline });
}
