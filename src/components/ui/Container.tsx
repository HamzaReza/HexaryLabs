import { cn } from "@/lib/cn";

/** 1200px content width, 16/24px gutters (measured from the reference). */
export function Container({
  children,
  className,
  wide = false,
}: {
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  // Padding sits *outside* the max-width so the content box is exactly
  // 1200px — matching the reference's `--wp--style--global--content-size`.
  // (Tailwind's max-w is border-box, so max-w-[1200px] + px-6 would yield 1152.)
  return (
    <div className="px-4 md:px-6">
      <div
        className={cn(
          "mx-auto w-full",
          /* --container-content / --container-wide in globals.css @theme; these
             were duplicated here as literals. */
          wide ? "max-w-wide" : "max-w-content",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
