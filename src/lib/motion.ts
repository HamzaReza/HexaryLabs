import type { CSSProperties } from "react";

const EASE_OUT = "cubic-bezier(0, 0, 0.2, 1)";

export const EASE_BLUEPRINT = "cubic-bezier(0.22, 1, 0.36, 1)";

/* IntersectionObserver thresholds, consolidated — one per trigger kind. */
export const THRESHOLD = {
  reveal: 0.15,
  countUp: 0.25,
  heroLoop: 0.25,
} as const;

export const LINE_DRAW = {
  duration: 600, // ms per segment
  stagger: 80, // ms between segments
} as const;

export const REVEAL_FADE_UP = {
  distance: 60, // px, initial translateY
  duration: 700, // ms
  easing: EASE_OUT,
} as const;

export const REVEAL_ZOOM_IN = {
  scale: 0.85, // initial scale — reference uses 0.6, too dramatic for this site
  duration: 900, // ms
  easing: EASE_OUT,
} as const;

/** Per-child delay for staggered groups (cards, grid images). */
export const REVEAL_STAGGER_MS = 100;

export const HERO_STAGGER = {
  distance: 20, // px, initial translateY
  duration: 800, // ms
  easing: EASE_OUT,
  baseDelay: 400, // ms, first element (logo/eyebrow)
  step: 100, // ms between elements
  maxStaggered: 8, // beyond this, group remaining elements at the last delay
} as const;

/** Delay for the Nth (0-indexed) hero element in the stagger sequence. */
export function heroStaggerDelay(index: number): number {
  const cappedIndex = Math.min(index, HERO_STAGGER.maxStaggered - 1);
  return HERO_STAGGER.baseDelay + cappedIndex * HERO_STAGGER.step;
}

export function heroStaggerStyle(index: number): CSSProperties {
  return {
    "--hero-delay": `${heroStaggerDelay(index)}ms`,
    "--hero-duration": `${HERO_STAGGER.duration}ms`,
    "--hero-distance": `${HERO_STAGGER.distance}px`,
    "--hero-easing": HERO_STAGGER.easing,
  } as CSSProperties;
}

export const CARD_HOVER_ZOOM = {
  photo: 1.09,
  schematic: 1.04, // tuned down — a diagram at 1.09 reads as distorted, not intentional
  duration: 800, // ms
  easing: EASE_OUT,
} as const;

export function cardHoverZoomStyle(scale: number): CSSProperties {
  return {
    "--card-hover-scale": scale,
    "--card-hover-duration": `${CARD_HOVER_ZOOM.duration}ms`,
    "--card-hover-easing": CARD_HOVER_ZOOM.easing,
  } as CSSProperties;
}

/**
 * Whether the visitor has asked for reduced motion.
 *
 * The CSS side of this is handled by media queries; this is for the cases a
 * query cannot reach — imperative scrolling, where the choice is an argument to
 * `scrollTo` rather than a property to override. Returns `false` during server
 * rendering, where there is no visitor to ask.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
