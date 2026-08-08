"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";
import { THRESHOLD } from "@/lib/motion";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Counts 0 → `value` once, when scrolled into view (the reference's only
 * scroll-triggered animation). 1.6s easeOutExpo.
 *
 * Reduced motion → renders the final value immediately, never animates.
 * SSR renders the final value too, so the number is always in the HTML.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1600,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  // Triggers as the band enters the viewport, so the first frame (≈0) lands
  // before the number is comfortably readable.
  const { ref, inView } = useInView<HTMLSpanElement>(THRESHOLD.countUp);

  // SSR and first paint render the real figure — so the number is in the HTML
  // for crawlers and no-JS readers. The animation's first frame takes it to 0.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || prefersReduced()) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * t); // easeOutExpo
      setDisplay(Math.round(value * (t === 1 ? 1 : eased)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
