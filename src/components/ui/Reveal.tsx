"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/useInView";
import { LINE_DRAW, REVEAL_FADE_UP, REVEAL_ZOOM_IN, THRESHOLD } from "@/lib/motion";

type RevealVariant = "fade" | "fade-up" | "zoom-in" | "draw";


export function Reveal({
  children,
  delay = 0,
  variant = "fade",
  className,
  style: styleOverride,
}: {
  children: React.ReactNode;
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  /** Merged after the reveal's own custom properties, never replacing them. */
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(THRESHOLD.reveal);

  const style: React.CSSProperties = { "--reveal-delay": `${delay}ms` } as React.CSSProperties;
  let revealClass = "reveal";

  if (variant === "fade-up") {
    revealClass = "reveal-fade-up";
    Object.assign(style, {
      "--reveal-distance": `${REVEAL_FADE_UP.distance}px`,
      "--reveal-duration": `${REVEAL_FADE_UP.duration}ms`,
      "--reveal-easing": REVEAL_FADE_UP.easing,
    });
  } else if (variant === "zoom-in") {
    revealClass = "reveal-zoom-in";
    Object.assign(style, {
      "--reveal-scale": REVEAL_ZOOM_IN.scale,
      "--reveal-duration": `${REVEAL_ZOOM_IN.duration}ms`,
      "--reveal-easing": REVEAL_ZOOM_IN.easing,
    });
  } else if (variant === "draw") {
    revealClass = "reveal-draw";
    Object.assign(style, {
      "--draw-duration": `${LINE_DRAW.duration}ms`,
    });
  }

  return (
    <div
      ref={ref}
      className={cn(revealClass, inView && "is-visible", className)}
      style={{ ...style, ...styleOverride }}
    >
      {children}
    </div>
  );
}
