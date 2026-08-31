"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { WorkCard } from "@/components/cards/WorkCard";
import { prefersReducedMotion } from "@/lib/motion";
import type { CaseStudy } from "@/lib/data/types";

export type WorkCarouselItem = { study: CaseStudy; eyebrow: string };

/**
 * The work carousel: a row of category chips over a full-bleed track of cards
 * that peek in from both edges, with the centred card highlighted.
 *
 * The two are one control, not two. Choosing a chip scrolls its card to the
 * centre; scrolling the track moves the chip. That is why this is a single
 * client component holding one index rather than a filter and a slider that
 * would each need to know about the other.
 *
 * The track is native scrolling with CSS scroll-snap, not a JS slider: it
 * inherits touch, trackpad, keyboard and screen-reader behaviour for free, and
 * with JavaScript unavailable it degrades to a scrollable row of cards that all
 * still work. The only script here reads the scroll position to keep the chips
 * in sync, and writes it when a chip is pressed.
 *
 * Full-bleed by construction — the design's track runs from -820 to 2260 on a
 * 1440 frame — so the centring padding is half the container minus half a card
 * rather than a container gutter.
 */
export function WorkCarousel({ items }: { items: WorkCarouselItem[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  /* Which card is nearest the centre of the viewport, so the chips follow a
     scroll the user drove themselves. Read on a rAF so a flung track does not
     schedule a state update per scroll event. */
  const syncFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const centre = track.scrollLeft + track.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;

    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const distance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });

    setActive(nearest);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(syncFromScroll);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    /* The track starts scrolled to its first card, but a restored scroll
       position or a narrower viewport can land elsewhere. */
    syncFromScroll();

    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [syncFromScroll]);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;

    setActive(index);
    track.scrollTo({
      left: card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <div>
      {/* The chip row overflows on every viewport — six pills on 94px of
          padding are wider than the content column by design — so it scrolls
          inside the gutter rather than bleeding to the edge like the track. */}
      <Container className="no-scrollbar overflow-x-auto">
        <div className="flex w-max gap-0.5">
          {items.map((item, i) => (
            <button
              key={item.study.slug}
              type="button"
              aria-pressed={i === active}
              onClick={() => scrollTo(i)}
              className="rounded-full focus-visible:outline-offset-4"
            >
              <Chip size="filter" active={i === active}>
                {item.study.category}
              </Chip>
            </button>
          ))}
        </div>
      </Container>

      <ul
        ref={trackRef}
        /* `--card` is read by both the card width and the centring padding, so
           the two can never disagree and leave the active card off-centre. */
        style={{ "--card": "min(600px, 85vw)" } as React.CSSProperties}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1rem,calc(50%-var(--card)/2))] py-1"
      >
        {items.map((item, i) => (
          <li
            key={item.study.slug}
            className="w-[var(--card)] shrink-0 snap-center"
          >
            <WorkCard
              study={item.study}
              eyebrow={item.eyebrow}
              active={i === active}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
