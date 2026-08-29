import Image from "next/image";
import { cn } from "@/lib/cn";
import { Schematic } from "./Schematic";
import { EdenSchematic } from "./EdenSchematic";
import { MedicalRecordsSchematic } from "./MedicalRecordsSchematic";
import { SocialLeadCaptureSchematic } from "./SocialLeadCaptureSchematic";
import type { Cover, GradientTone } from "@/lib/data/types";
import { CARD_HOVER_ZOOM, cardHoverZoomStyle } from "@/lib/motion";

export const gradients: Record<GradientTone, string> = {
  violet: "bg-linear-to-br from-accent/25 via-base-2 to-accent/10",
  slate: "bg-linear-to-br from-grey-300 via-base-2 to-grey-200",
  sand: "bg-linear-to-br from-grey-200 via-base-2 to-accent/10",
};

export function CaseCover({
  cover,
  title,
  aspect = "aspect-[1.6]",
  sizes = "100vw",
  eager = false,
  className,
  hoverZoom = false,
}: {
  cover: Cover;
  title: string;
  aspect?: string;
  sizes?: string;
  eager?: boolean;
  className?: string;
  hoverZoom?: boolean;
}) {
  if (cover.kind === "photo") {
    const posClass =
      cover.objectPosition === "left"
        ? "object-left"
        : cover.objectPosition === "center"
          ? "object-center"
          : "object-top";

    if (!hoverZoom) {
      return (
        <Image
          src={cover.src}
          alt={cover.alt}
          width={1600}
          height={1000}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          className={cn("w-full object-cover", posClass, aspect, className)}
        />
      );
    }

    return (
      <div className={cn("overflow-hidden", aspect, className)}>
        <Image
          src={cover.src}
          alt={cover.alt}
          width={1600}
          height={1000}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : undefined}
          className={cn("card-hover-zoom h-full w-full object-cover", posClass)}
          style={cardHoverZoomStyle(CARD_HOVER_ZOOM.photo)}
        />
      </div>
    );
  }

  if (cover.kind === "schematic") {
    const diagram =
      cover.diagram === "eden" ? (
        <EdenSchematic className="max-h-full" />
      ) : cover.diagram === "medical-records" ? (
        <MedicalRecordsSchematic className="max-h-full" />
      ) : cover.diagram === "social-lead-capture" ? (
        <SocialLeadCaptureSchematic className="max-h-full" />
      ) : (
        <Schematic className="max-h-full" />
      );

    return (
      <div
        className={cn(
          "flex w-full items-center justify-center overflow-hidden border-[0.8px] border-grey-200 bg-base-2 p-6 sm:p-10 lg:p-12",
          aspect,
          className,
        )}
      >
        {hoverZoom ? (
          <div className="card-hover-zoom max-h-full" style={cardHoverZoomStyle(CARD_HOVER_ZOOM.schematic)}>
            {diagram}
          </div>
        ) : (
          diagram
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex w-full items-end p-8 lg:p-12",
        aspect,
        gradients[cover.tone],
        className,
      )}
    >
      <p className="font-display text-[1.625rem] font-medium leading-[1.15] tracking-[0.01em] text-contrast-2 md:text-[2.25rem]">
        {title}
      </p>
    </div>
  );
}
