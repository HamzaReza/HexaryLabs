"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * The design's disclosure list — used for the service FAQs, and for About's
 * "what that means" list in Phase 6.
 *
 * One item is open at a time, which is how the design draws it: the first
 * question shows its answer under an accent minus, every other question carries
 * an ink plus. Clicking the open item closes it, so the list can rest fully
 * collapsed.
 *
 * Rows are real `<button>`s inside a definition-style list, so the control is
 * reachable by keyboard and announced as expanded or collapsed. The panel is
 * kept mounted and hidden rather than unmounted, so in-page search finds
 * answers that are not currently open.
 */
export function Accordion({
  items,
  defaultOpen = 0,
  checkmarks = false,
  className,
}: {
  items: readonly { question: string; answer: string }[];
  /** Index open on load, or `null` for all closed. */
  defaultOpen?: number | null;
  /**
   * About's list leads every row with an accent tick and rules *under* each
   * row rather than between them, so the block closes with a line. The service
   * FAQs use neither. It is one component because the disclosure behaviour,
   * and the keyboard and screen-reader handling that goes with it, are the
   * same — only the framing differs.
   */
  checkmarks?: boolean;
  className?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className={cn("w-full", className)}>
      {items.map((item, i) => {
        const isOpen = i === open;
        const panelId = `${id}-panel-${i}`;
        const buttonId = `${id}-button-${i}`;

        return (
          <div
            key={item.question}
            className={cn(
              checkmarks
                ? "flex items-start gap-5 border-b border-grey-300 px-2 py-6 first:pt-0"
                : i > 0 && "border-t border-grey-200",
            )}
          >
            {checkmarks && <Tick />}
            <div className={cn(checkmarks && "min-w-0 flex-1")}>
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={cn(
                    "flex w-full cursor-pointer items-start justify-between gap-6 text-left",
                    "text-lead text-contrast-2 transition-colors duration-300",
                    "hover:text-accent",
                    checkmarks ? "font-medium" : cn("pb-6", i > 0 && "pt-6"),
                  )}
                >
                  <span className="min-w-0">{item.question}</span>
                  <Sign open={isOpen} />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className={cn(checkmarks ? "pt-4" : "pb-6 pr-[60px]")}
              >
                <p
                  className={cn(
                    "text-body text-grey-600",
                    !checkmarks && "-mt-2",
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** The design's `akar-icons:check`, in the accent, at the head of every row. */
function Tick() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="mt-0.5 size-6 shrink-0 text-accent"
    >
      <path
        d="M4 12L10 18L20 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 24px plus that loses its vertical stroke when the row opens. */
function Sign({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn(
        "size-6 shrink-0 transition-colors duration-300",
        open ? "text-accent" : "text-contrast-2",
      )}
    >
      <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 4V20"
        stroke="currentColor"
        strokeWidth="1.5"
        className={cn(
          "origin-center transition-transform duration-300 ease-in-out",
          open && "scale-y-0",
        )}
      />
    </svg>
  );
}
