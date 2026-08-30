import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { cn } from "@/lib/cn";

/**
 * The home link, wrapping the approved wordmark.
 *
 * The mark is a single-colour shape drawn in `currentColor`, so tone alone
 * decides it: ink on light surfaces, white inside anything marked
 * `data-tone="dark"`. It is 139×25 in the design; the width here sets it and
 * the intrinsic ratio does the rest.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Hexary Labs — home"
      className={cn(
        "inline-flex shrink-0 items-center text-contrast",
        "transition-colors duration-300 ease-in-out hover:text-accent",
        "[[data-tone=dark]_&]:text-white [[data-tone=dark]_&]:hover:text-accent-hi",
        className,
      )}
    >
      <Wordmark className="h-[25px] w-[139px]" />
    </Link>
  );
}
