/**
 * Site identity and navigation.
 *
 * `getSiteMeta` is consumed by metadata, JSON-LD, the sitemap, robots, the OG
 * templates and the contact action, so it is the single most-imported thing in the
 * app — routing it through the layer means an API-sourced site record needs no
 * further changes.
 */

import { loadFooterNav, loadHeaderCta, loadNav, loadSiteMeta } from "./source";
import type { FooterNavGroup, NavItem, NavLink, SiteMeta } from "./types";

export async function getSiteMeta(): Promise<SiteMeta> {
  return loadSiteMeta();
}

export async function getNav(): Promise<NavItem[]> {
  return loadNav();
}

export async function getHeaderCta(): Promise<NavLink> {
  return loadHeaderCta();
}

export async function getFooterNav(): Promise<FooterNavGroup[]> {
  return loadFooterNav();
}

/**
 * Synchronous site accessor for the handful of call sites that cannot await:
 * `sitemap.ts`, `robots.txt`, `manifest.ts` and module-scope metadata objects
 * evaluated before any request. Same validated record as `getSiteMeta`.
 */
export function getSiteMetaSync(): SiteMeta {
  return loadSiteMeta();
}
