"use client";

import { cn } from "@/lib/cn";
import { heroLoopBaseCss, pctOf, useHeroLoop } from "@/lib/heroLoop";
import { KineinSceneStorefront } from "./KineinSceneStorefront";
import { KineinSceneSalesOrder } from "./KineinSceneSalesOrder";
import { KineinSceneSynced } from "./KineinSceneSynced";

const REST_IDLE_MS = 800;
const CUT_MS = 320;

const S1_QTY_AT = 420;
const S1_PRICE_AT = 680;
const S1_SUBMIT_AT = 1000;
const S1_END = 1200;

const S2_IN = S1_END + CUT_MS;
const S2_FIELD_AT = [S2_IN + 80, S2_IN + 200, S2_IN + 320];
const S2_ROW_AT = [S2_IN + 440, S2_IN + 540, S2_IN + 640];
const S2_TOTAL_AT = S2_IN + 780;
const S2_END = 2600;

const S3_IN = S2_END + CUT_MS;
const S3_STOCK_AT = S3_IN + 140;
const S3_LOG_AT = [S3_IN + 260, S3_IN + 380, S3_IN + 500];
const S3_HOLD_END = 4150;

const FADE_BACK_MS = 400;
const CYCLE_MS = S3_HOLD_END + FADE_BACK_MS;

const CARD_TRAVEL_END = S2_IN;
const CARD_OUT = S2_IN + 180;
const FIELD_IN_MS = 220;
const ELEMENT_IN_MS = 260;

const pct = pctOf(CYCLE_MS);

const css = `
${heroLoopBaseCss("kin", CYCLE_MS)}
.kin-loop svg .kin-fill { transform-origin: left center; }

.kin-loop .kin-scene-2, .kin-loop .kin-scene-3 { opacity: 0; }
.kin-loop .kin-qty-b, .kin-loop .kin-price-chip { opacity: 0; }
${[0, 1, 2].map((i) => `.kin-loop .kin-f-${i} { transform: scaleX(0); }`).join("\n")}
${[0, 1, 2].map((i) => `.kin-loop .kin-r-${i} { opacity: 0; }`).join("\n")}
.kin-loop .kin-total { transform: scaleX(0); }
.kin-loop .kin-stock-b { opacity: 0; }
${[0, 1, 2].map((i) => `.kin-loop .kin-log-${i} { opacity: 0; }`).join("\n")}
.kin-loop .kin-card, .kin-loop .kin-wipe-1, .kin-loop .kin-wipe-2 { opacity: 0; }

.kin-loop.is-running .kin-scene-1 { animation-name: kin-scene-1; }
.kin-loop.is-running .kin-scene-2 { animation-name: kin-scene-2; }
.kin-loop.is-running .kin-scene-3 { animation-name: kin-scene-3; }
.kin-loop.is-running .kin-qty-a { animation-name: kin-qty-a; }
.kin-loop.is-running .kin-qty-b { animation-name: kin-qty-b; }
.kin-loop.is-running .kin-price-chip { animation-name: kin-price-chip; }
.kin-loop.is-running .kin-submit { animation-name: kin-submit; }
${[0, 1, 2].map((i) => `.kin-loop.is-running .kin-f-${i} { animation-name: kin-f-${i}; }`).join("\n")}
${[0, 1, 2].map((i) => `.kin-loop.is-running .kin-r-${i} { animation-name: kin-r-${i}; }`).join("\n")}
.kin-loop.is-running .kin-total { animation-name: kin-total; }
.kin-loop.is-running .kin-stock-a { animation-name: kin-stock-a; }
.kin-loop.is-running .kin-stock-b { animation-name: kin-stock-b; }
${[0, 1, 2].map((i) => `.kin-loop.is-running .kin-log-${i} { animation-name: kin-log-${i}; }`).join("\n")}
.kin-loop.is-running .kin-card { animation-name: kin-card; }
.kin-loop.is-running .kin-card-track { animation-name: kin-card-track; }
.kin-loop.is-running .kin-wipe-1 { animation-name: kin-wipe-1; animation-timing-function: linear; }
.kin-loop.is-running .kin-wipe-2 { animation-name: kin-wipe-2; animation-timing-function: linear; }

@keyframes kin-scene-1 {
  0%, ${pct(S1_END)} { opacity: 1; transform: translateX(0); }
  ${pct(S1_END + CUT_MS)} { opacity: 0; transform: translateX(-6%); }
  ${pct(S3_HOLD_END)} { opacity: 0; transform: translateX(0); }
  100% { opacity: 1; transform: translateX(0); }
}
@keyframes kin-scene-2 {
  0%, ${pct(S1_END)} { opacity: 0; transform: translateX(6%); }
  ${pct(S2_IN)}, ${pct(S2_END)} { opacity: 1; transform: translateX(0); }
  ${pct(S2_END + CUT_MS)}, 100% { opacity: 0; transform: translateX(-6%); }
}
@keyframes kin-scene-3 {
  0%, ${pct(S2_END)} { opacity: 0; transform: translateX(6%); }
  ${pct(S3_IN)}, ${pct(S3_HOLD_END)} { opacity: 1; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(0); }
}
@keyframes kin-qty-a {
  0%, ${pct(S1_QTY_AT)} { opacity: 1; }
  ${pct(S1_QTY_AT + 140)}, ${pct(S2_END)} { opacity: 0; }
  ${pct(S3_IN)}, 100% { opacity: 1; }
}
@keyframes kin-qty-b {
  0%, ${pct(S1_QTY_AT)} { opacity: 0; }
  ${pct(S1_QTY_AT + 140)}, ${pct(S2_END)} { opacity: 1; }
  ${pct(S3_IN)}, 100% { opacity: 0; }
}
@keyframes kin-price-chip {
  0%, ${pct(S1_PRICE_AT)} { opacity: 0; transform: scale(0.9); }
  ${pct(S1_PRICE_AT + ELEMENT_IN_MS)}, ${pct(S2_END)} { opacity: 1; transform: none; }
  ${pct(S3_IN)}, 100% { opacity: 0; transform: scale(0.9); }
}
@keyframes kin-submit {
  0%, ${pct(S1_SUBMIT_AT)} { transform: none; }
  ${pct(S1_SUBMIT_AT + 90)} { transform: scale(0.96); }
  ${pct(S1_SUBMIT_AT + 200)}, 100% { transform: none; }
}
${S2_FIELD_AT.map(
  (at, i) => `
@keyframes kin-f-${i} {
  0%, ${pct(at)} { transform: scaleX(0); }
  ${pct(at + FIELD_IN_MS)}, ${pct(S2_END + CUT_MS)} { transform: scaleX(1); }
  ${pct(S3_IN + 120)}, 100% { transform: scaleX(0); }
}`,
).join("")}
${S2_ROW_AT.map(
  (at, i) => `
@keyframes kin-r-${i} {
  0%, ${pct(at)} { opacity: 0; transform: translateY(6px); }
  ${pct(at + ELEMENT_IN_MS)}, ${pct(S2_END + CUT_MS)} { opacity: 1; transform: none; }
  ${pct(S3_IN + 120)}, 100% { opacity: 0; transform: translateY(6px); }
}`,
).join("")}
@keyframes kin-total {
  0%, ${pct(S2_TOTAL_AT)} { transform: scaleX(0); }
  ${pct(S2_TOTAL_AT + FIELD_IN_MS)}, ${pct(S2_END + CUT_MS)} { transform: scaleX(1); }
  ${pct(S3_IN + 120)}, 100% { transform: scaleX(0); }
}
@keyframes kin-stock-a {
  0%, ${pct(S3_STOCK_AT)} { opacity: 1; }
  ${pct(S3_STOCK_AT + 160)}, 100% { opacity: 0; }
}
@keyframes kin-stock-b {
  0%, ${pct(S3_STOCK_AT)} { opacity: 0; }
  ${pct(S3_STOCK_AT + 160)}, 100% { opacity: 1; }
}
${S3_LOG_AT.map(
  (at, i) => `
@keyframes kin-log-${i} {
  0%, ${pct(at)} { opacity: 0; transform: translateY(8px); }
  ${pct(at + ELEMENT_IN_MS)}, 100% { opacity: 1; transform: none; }
}`,
).join("")}
@keyframes kin-card {
  0%, ${pct(S1_SUBMIT_AT)} { opacity: 0; transform: scale(0.8); }
  ${pct(S1_SUBMIT_AT + 140)} { opacity: 1; transform: scale(1); }
  ${pct(CARD_TRAVEL_END)} { opacity: 1; transform: scale(1.18); }
  ${pct(CARD_OUT)}, 100% { opacity: 0; transform: scale(1.18); }
}
@keyframes kin-card-track {
  0%, ${pct(S1_END)} { transform: translate(0, 0); }
  ${pct(CARD_TRAVEL_END)}, 100% { transform: translate(-24%, -24%); }
}
@keyframes kin-wipe-1 {
  0%, ${pct(S1_END)} { opacity: 1; transform: translateX(-8%); }
  ${pct(S1_END + CUT_MS)} { opacity: 1; transform: translateX(108%); }
  ${pct(S1_END + CUT_MS + 1)}, 100% { opacity: 0; transform: translateX(108%); }
}
@keyframes kin-wipe-2 {
  0%, ${pct(S2_END)} { opacity: 1; transform: translateX(-8%); }
  ${pct(S2_END + CUT_MS)} { opacity: 1; transform: translateX(108%); }
  ${pct(S2_END + CUT_MS + 1)}, 100% { opacity: 0; transform: translateX(108%); }
}
@media (prefers-reduced-motion: reduce) {
  .kin-loop .kin-el { animation: none; }
  .kin-loop .kin-scene-1, .kin-loop .kin-scene-2 { opacity: 0; }
  .kin-loop .kin-scene-3 { opacity: 1; }
  .kin-loop .kin-stock-a { opacity: 0; }
  .kin-loop .kin-stock-b { opacity: 1; }
  ${[0, 1, 2].map((i) => `.kin-loop .kin-log-${i} { opacity: 1; }`).join("\n  ")}
  .kin-loop .kin-card, .kin-loop .kin-wipe-1, .kin-loop .kin-wipe-2 { opacity: 0; }
}
`;

const sceneClass =
  "kin-el absolute inset-0 flex items-center justify-center";

interface KineinStoryHeroProps {
  aspect?: string;
  className?: string;
}

export function KineinStoryHero({
  aspect = "aspect-[4/3] sm:aspect-[1.8] lg:aspect-[2.4]",
  className,
}: KineinStoryHeroProps) {
  const { ref, inView, running, onMouseEnter, onAnimationEnd } = useHeroLoop(
    REST_IDLE_MS,
    "kin-scene-1",
  );

  return (
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onAnimationEnd={onAnimationEnd}
      role="img"
      aria-label="Three-scene story of the Kinein platform: a wholesale storefront order becomes a sales order in the ERP, then inventory and pricing sync back the other way"
      className={cn(
        "kin-loop relative overflow-hidden bg-base-2",
        aspect,
        inView && "is-playing",
        running && "is-running",
        className,
      )}
    >
      <style>{css}</style>

      <div className={cn("kin-scene-1 bg-base-2", sceneClass)}>
        <KineinSceneStorefront className="h-auto max-h-full w-full" />
      </div>

      <div className={cn("kin-scene-2 bg-contrast-2", sceneClass)}>
        <KineinSceneSalesOrder className="h-auto max-h-full w-full" />
      </div>

      <div className={cn("kin-scene-3 bg-base-2", sceneClass)}>
        <KineinSceneSynced className="h-auto max-h-full w-full" />
      </div>

      <div className="kin-card-track kin-el pointer-events-none absolute inset-0">
        <div
          className="kin-card kin-el absolute w-[13%] border-[0.8px] border-grey-300 bg-base"
          style={{ left: "70%", top: "58%" }}
        >
          <div className="h-[6px] bg-accent" />
          <div className="flex flex-col gap-[5px] p-[10px]">
            <div className="h-[4px] w-3/4 bg-grey-300" />
            <div className="h-[4px] w-1/2 bg-grey-200" />
            <div className="h-[4px] w-2/3 bg-grey-200" />
          </div>
        </div>
      </div>

      <div className="kin-wipe-1 kin-el pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-[3px] bg-accent" />
      </div>
      <div className="kin-wipe-2 kin-el pointer-events-none absolute inset-0">
        <div className="absolute inset-y-0 left-0 w-[3px] bg-accent" />
      </div>
    </div>
  );
}
