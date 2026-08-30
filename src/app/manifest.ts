import type { MetadataRoute } from "next";
import { getSiteMetaSync } from "@/lib/data";

/**
 * Next emits <link rel="manifest"> for this automatically, same as it does the
 * <link rel="icon"> tags for favicon.ico / icon.svg / apple-icon.png. No
 * hand-written <head> wiring needed.
 *
 * Icon is referenced from /public rather than the app/icon.svg convention —
 * that convention's URL carries a build hash, which a manifest can't predict.
 */
export default function manifest(): MetadataRoute.Manifest {
  const site = getSiteMetaSync();
  return {
    name: site.name,
    short_name: "Hexary",
    description: site.description,
    start_url: "/",
    display: "standalone",
    /* Matches --color-base and the themeColor in layout.tsx; these were #ffffff,
       which flashed white against the warm canvas on PWA launch. */
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
