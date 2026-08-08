"use client";

import { useCallback, useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";
import { THRESHOLD } from "@/lib/motion";

export const HERO_LOOP_EASE = "cubic-bezier(0, 0, 0.2, 1)";
export const HERO_LOOP_THRESHOLD = THRESHOLD.heroLoop;

export const pctOf = (cycleMs: number) => (ms: number) =>
  `${((ms / cycleMs) * 100).toFixed(3)}%`;

export function heroLoopBaseCss(scope: string, cycleMs: number): string {
  return `
.${scope}-loop .${scope}-el {
  animation-duration: ${cycleMs}ms;
  animation-timing-function: ${HERO_LOOP_EASE};
  animation-iteration-count: 1;
  animation-fill-mode: both;
  animation-play-state: var(--hero-loop-play, paused);
}
.${scope}-loop.is-playing { --hero-loop-play: running; }
.${scope}-loop svg .${scope}-el { transform-box: fill-box; transform-origin: center; }`;
}

/** Reduced-motion users never enter the running state, so no cycle is ever scheduled. */
function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useHeroLoop(idleMs: number, endAnimationName: string) {
  const { ref, inView } = useInView<HTMLDivElement>(HERO_LOOP_THRESHOLD, {
    once: false,
  });
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!inView || running || prefersReducedMotion()) return;
    const timer = window.setTimeout(() => setRunning(true), idleMs);
    return () => window.clearTimeout(timer);
  }, [inView, running, idleMs]);

  const onMouseEnter = useCallback(() => {
    if (prefersReducedMotion()) return;
    setRunning(true);
  }, []);

  const onAnimationEnd = useCallback(
    (event: React.AnimationEvent) => {
      if (event.animationName === endAnimationName) setRunning(false);
    },
    [endAnimationName],
  );

  return { ref, inView, running, onMouseEnter, onAnimationEnd };
}
