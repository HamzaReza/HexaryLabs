import Image from "next/image";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";
import { REVEAL_STAGGER_MS } from "@/lib/motion";
import type { WorkImage } from "@/lib/data/types";

const SIZE_CLASSES: Record<WorkImage["size"], string> = {
  small: "aspect-square md:col-span-2",
  rectangle: "aspect-[1.43/1] md:col-span-3",
  full: "aspect-[2.05/1] md:col-span-5",
};

export function WorkImagesGrid({ images }: { images: WorkImage[] }) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-5 lg:gap-8">
      {images.map((image, i) => (
        <Reveal
          key={image.src}
          variant="zoom-in"
          delay={i * REVEAL_STAGGER_MS}
          className={cn(
            "relative w-full overflow-hidden border-[0.8px] border-grey-200",
            SIZE_CLASSES[image.size],
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover"
          />
        </Reveal>
      ))}
    </div>
  );
}
