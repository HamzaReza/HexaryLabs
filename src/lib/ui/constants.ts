/**
 * Shared UI vocabulary — the variant sets primitives agree on.
 *
 * These used to be declared separately inside `Section`, `ClippedPanel`, `Button`
 * and `HexCluster`, so the same idea existed in four places and a new value had to
 * be added to each. Centralising them also means the corner treatment has exactly
 * one definition (`CLIP`), which matters when the design changes it.
 *
 * `as const` + a derived type keeps the union in sync with the runtime values:
 * add a key and the type widens automatically.
 */

/* ------------------------------------------------------------------- surface */

/** Section surface tone. Stamped as `data-tone`; descendants restyle from it. */
export const TONE = {
  light: "light",
  muted: "muted",
  dark: "dark",
} as const;

export type Tone = (typeof TONE)[keyof typeof TONE];

/** Background + text pairing per tone. */
export const TONE_CLASS: Record<Tone, string> = {
  light: "bg-base text-contrast",
  muted: "bg-base-2 text-contrast",
  dark: "bg-contrast-2 text-white",
};

/* --------------------------------------------------------------------- shape */

/**
 * The pentagonal silhouette: one clipped corner, always top-right, cut at 45°.
 * Sizes per `docs/design-system.md` — 10px on controls, 18px on cards, 28px on
 * heroes and page-level frames.
 */
export const CLIP = {
  sm: 10,
  md: 18,
  lg: 28,
} as const;

export type ClipSize = keyof typeof CLIP;

/** Tailwind arbitrary-property class that sets `--clip` for `clip-corner`. */
export const CLIP_CLASS: Record<ClipSize, string> = {
  sm: "[--clip:10px]",
  md: "[--clip:18px]",
  lg: "[--clip:28px]",
};

/* ------------------------------------------------------------------ elements */

/** Hexagon tile roles. `signal` is capped at one per composition. */
export const HEX_ROLE = {
  outline: "outline",
  ink: "ink",
  signal: "signal",
  textured: "textured",
} as const;

export type HexRole = (typeof HEX_ROLE)[keyof typeof HEX_ROLE];

/** Button appearance. `block` is the full-width row variant and stays square. */
export const BUTTON_VARIANT = {
  primary: "primary",
  secondary: "secondary",
  accent: "accent",
  block: "block",
} as const;

export type ButtonVariant = (typeof BUTTON_VARIANT)[keyof typeof BUTTON_VARIANT];

export const BUTTON_SIZE = {
  sm: "sm",
  md: "md",
  lg: "lg",
} as const;

export type ButtonSize = (typeof BUTTON_SIZE)[keyof typeof BUTTON_SIZE];
