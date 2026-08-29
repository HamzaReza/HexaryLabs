import { cn } from "@/lib/cn";
import { CLIP_CLASS, type ClipSize } from "@/lib/ui/constants";

interface ClippedPanelProps {
  children: React.ReactNode;
  clip?: ClipSize;
  bordered?: boolean;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "figure";
}

/* Bordered variant is two stacked clipped layers: the outer element is the
   border colour showing through a 0.8px inset — clip-path cuts borders off,
   so a real `border` can't follow the pentagon (redesign-plan §4.2). */
export function ClippedPanel({
  children,
  clip = "md",
  bordered = false,
  className,
  as: Tag = "div",
}: ClippedPanelProps) {
  if (!bordered) {
    return (
      <Tag className={cn("clip-corner", CLIP_CLASS[clip], className)}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={cn(
        "clip-corner p-hairline bg-grey-200 [[data-tone=dark]_&]:bg-grey-700",
        CLIP_CLASS[clip],
      )}
    >
      <div className={cn("clip-corner h-full", CLIP_CLASS[clip], className)}>
        {children}
      </div>
    </Tag>
  );
}
