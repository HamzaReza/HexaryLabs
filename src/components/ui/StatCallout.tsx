import { cn } from "@/lib/cn";

/**
 * A result pulled out of a case study's prose and set in the left gutter beside
 * it — the number first, then what it means.
 *
 * The design's own values: an `#E1DDFF` panel on 16/24/20/16 padding, the mark
 * and the text 16 apart, the figure Space Grotesk Medium 24/28 at +0.32, and
 * the line under it Inter *italic* 14/24. The italic is deliberate — it is the
 * only italic on the page, and it keeps the caption from reading as body copy.
 *
 * The corner is cut rather than covered. The design draws a 32px white triangle
 * over the top right, which works because the page behind it is white; a
 * `clip-path` produces the same shape without assuming what it sits on.
 */

const CUT_CORNER = "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)";

export function StatCallout({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn("relative flex items-start gap-4 pb-5 pl-4 pr-6 pt-4", className)}
      style={{ background: "#e1ddff", clipPath: CUT_CORNER }}
    >
      <CalloutMark />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="font-display text-[1.5rem] font-medium leading-[28px] tracking-[0.32px] text-contrast-2">
          {value}
        </p>
        <p className="text-[0.875rem] italic leading-6 text-contrast">{label}</p>
      </div>
    </div>
  );
}

/** The wordmark's hexagon, at the size the design sets it in the gutter. */
function CalloutMark() {
  return (
    <svg
      viewBox="0 0 26.6609 26"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className="h-[26px] w-[26.661px] shrink-0"
    >
      <path
        d="M8.91519 13.2797L11.816 8.23011H17.6177L20.5185 13.2797L17.6177 18.3293H11.816L8.91519 13.2797Z"
        className="fill-accent-hi"
      />
      <path
        d="M20.3103 0.00200927C21.4189 0.0390525 22.4339 0.644344 22.992 1.60876L26.6609 7.9507H21.696L19.5829 4.29784H9.4984L4.46383 13L9.4984 21.7022H19.5829L21.696 18.0493H26.6609L22.992 24.3912L22.9371 24.483C22.3689 25.3939 21.3833 25.9621 20.3103 25.998L20.2025 26H8.87887C7.76436 26 6.73146 25.4243 6.14425 24.483L6.08933 24.3912L0.433224 14.6141C-0.144408 13.6156 -0.144408 12.3844 0.433224 11.3859L6.08933 1.60876C6.66548 0.613153 7.72856 4.55985e-05 8.87887 0H20.2025L20.3103 0.00200927Z"
        className="fill-accent-hi"
      />
    </svg>
  );
}
