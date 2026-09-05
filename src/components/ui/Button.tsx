import Link from "next/link";
import { ArrowIcon } from "./ArrowIcon";
import { cn } from "@/lib/cn";
import {
  CLIP_CLASS,
  type ButtonSize as Size,
  type ButtonVariant as Variant,
} from "@/lib/ui/constants";

/**
 * Blueprint buttons: pentagonal silhouette (top-right corner clipped at 10px),
 * display font @500, 16px gap to the arrow, `0.3s ease-in-out`, universal
 * hover → accent. Accent-filled buttons invert instead. The `block` variant
 * keeps square corners — full-width CTA rows read as structure, not objects.
 *
 * `secondary` is two stacked clipped layers because clip-path cuts real
 * borders off: the outer layer is the 0.8px "border" showing through.
 *
 * `[[data-tone=dark]_&]` re-colours the button inside dark sections, so
 * callers never pass tone manually.
 */
/** The pentagonal silhouette itself, kept separate so `clip` can switch it off. */
const CLIPPED = cn("clip-corner", CLIP_CLASS.sm);

/** `block` is a full-width structural row, so it is square by default. */
const CLIPS_BY_DEFAULT: Record<Variant, boolean> = {
  solid: false,
  outline: false,
  primary: true,
  secondary: true,
  accent: true,
  block: false,
};

/**
 * The approved design's control geometry, measured off its button instances:
 * every button on every frame is 46px tall — 24px of horizontal padding over a
 * 16/18 display line — with 14px from the label to the ↗, which is drawn about
 * 9.5px tall. Both are shorter than the 18px line box, so neither changes the
 * height.
 *
 * The label is pinned at 16 rather than left on `text-body`, because the design's
 * mobile ramp (see `globals.css`) does not apply to controls: its 390 frames
 * still draw every button 46px tall on a 16px label — measured at 16.0 from the
 * cap height of "Talk to Us About AI" on the AI Engineering hero — while the
 * prose around them steps down to 14.
 */
const DESIGN_SHAPE = cn(
  "inline-flex cursor-pointer items-center gap-[14px] px-6",
  "font-display text-[1rem] font-medium leading-[1.125]",
  "transition-colors duration-300 ease-in-out",
);

/**
 * On light the outline button is a 1px `contrast` rule around nothing. On dark
 * the design drops the rule entirely and lifts the surface instead — the
 * button reads as a slightly lighter panel, the same 4% white the dark cards
 * use. Hover is ours: the design ships no interaction states, so both follow
 * the accent convention already established sitewide.
 */
const designVariants: Record<"solid" | "outline", string> = {
  solid: cn(
    "py-3.5",
    "bg-contrast text-white hover:bg-accent",
    "[[data-tone=dark]_&]:bg-base [[data-tone=dark]_&]:text-contrast-2",
    "[[data-tone=dark]_&]:hover:bg-accent [[data-tone=dark]_&]:hover:text-white",
  ),
  /* One pixel less padding each way than `solid`, because the 1px rule is
     inside the border box: both land on the design's 46px. */
  outline: cn(
    "py-[13px]",
    "border border-contrast text-contrast",
    "hover:border-accent hover:text-accent",
    "[[data-tone=dark]_&]:border-transparent [[data-tone=dark]_&]:bg-white/[0.04]",
    "[[data-tone=dark]_&]:text-white [[data-tone=dark]_&]:hover:bg-white/10",
    "[[data-tone=dark]_&]:hover:text-white",
  ),
};

const filledVariants: Record<
  Exclude<Variant, "secondary" | "solid" | "outline">,
  string
> = {
  primary: cn(
    "bg-contrast-2 text-white",
    "hover:bg-accent hover:text-white",
    "[[data-tone=dark]_&]:bg-base [[data-tone=dark]_&]:text-contrast-2",
    "[[data-tone=dark]_&]:hover:bg-accent [[data-tone=dark]_&]:hover:text-white",
  ),
  accent: cn(
    "bg-accent text-white",
    "hover:bg-base hover:text-accent",
    "[[data-tone=dark]_&]:hover:bg-base [[data-tone=dark]_&]:hover:text-accent",
  ),
  block: cn(
    "w-full justify-between bg-grey-100 text-contrast-2",
    "hover:bg-accent hover:text-white",
    "[[data-tone=dark]_&]:bg-surface-dark [[data-tone=dark]_&]:text-white",
    "[[data-tone=dark]_&]:border-[0.8px] [[data-tone=dark]_&]:border-grey-700",
    "[[data-tone=dark]_&]:hover:bg-base [[data-tone=dark]_&]:hover:text-contrast-2",
  ),
};

const secondaryOuter = cn(
  "p-hairline group/btn",
  "bg-contrast-2 hover:bg-accent",
  "[[data-tone=dark]_&]:bg-base [[data-tone=dark]_&]:hover:bg-accent-hi",
);

const secondaryInner = cn(
  "bg-base text-contrast-2 group-hover/btn:text-accent",
  "[[data-tone=dark]_&]:bg-contrast-2 [[data-tone=dark]_&]:text-base",
  "[[data-tone=dark]_&]:group-hover/btn:text-accent-hi",
);

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-[1rem]",
  md: "px-3 py-2 text-body-lg",
  lg: "px-3 py-4 text-body-lg",
};

const layout = cn(
  "inline-flex items-center gap-4",
  "font-display font-medium leading-none",
  "rounded-none transition-colors duration-300 ease-in-out",
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  icon?: boolean;
  /** Override the variant's default corner treatment. */
  clip?: boolean;
  className?: string;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon = true,
  clip,
  className,
  ...rest
}: ButtonProps) {
  const clipped = clip ?? CLIPS_BY_DEFAULT[variant];
  const inner = (
    <>
      <span>{children}</span>
      {icon && <ArrowIcon />}
    </>
  );

  if (variant === "solid" || variant === "outline") {
    const cls = cn(DESIGN_SHAPE, designVariants[variant], className);
    /* The design's arrow is drawn to its own edges, not centred in a 16px box
       — see `ArrowIcon`. */
    const designInner = (
      <>
        <span>{children}</span>
        {icon && <ArrowIcon tight className="size-[9.5px] shrink-0" />}
      </>
    );
    if (href) {
      return (
        <Link href={href} className={cls}>
          {designInner}
        </Link>
      );
    }
    return (
      <button className={cls} {...rest}>
        {designInner}
      </button>
    );
  }

  if (variant === "secondary") {
    const outerCls = cn(
      "inline-flex cursor-pointer rounded-none transition-colors duration-300 ease-in-out",
      clipped && CLIPPED,
      secondaryOuter,
      className,
    );
    const innerCls = cn(layout, sizes[size], clipped && CLIPPED, secondaryInner);
    const content = <span className={innerCls}>{inner}</span>;

    if (href) {
      return (
        <Link href={href} className={outerCls}>
          {content}
        </Link>
      );
    }
    return (
      <button className={outerCls} {...rest}>
        {content}
      </button>
    );
  }

  const cls = cn(
    layout,
    "cursor-pointer",
    clipped && CLIPPED,
    filledVariants[variant],
    variant === "block" ? "px-6 py-8 sm:px-8" : sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}
