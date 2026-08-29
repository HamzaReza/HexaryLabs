"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem, NavLink } from "@/lib/data/types";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { cn } from "@/lib/cn";

/**
 * Full-screen overlay under the sticky header (the reference's pattern):
 * stacked items with hairline dividers, submenu as an inline accordion whose
 * parent turns accent, CTA as a full-width filled bar at the end.
 *
 * Adds what the reference lacks: focus trap, Esc to close, scroll lock.
 *
 * Nav data is forwarded from `Header` rather than imported — client components
 * can't await the data layer.
 */
export function MobileMenu({
  nav,
  headerCta,
  onClose,
}: {
  nav: NavItem[];
  headerCta: NavLink;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);

  const inSection = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const [expanded, setExpanded] = useState<string | null>(
    () => nav.find((i) => i.children && inSection(i.href))?.label ?? null,
  );

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Esc closes; Tab is trapped inside the panel
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="fixed inset-x-0 bottom-0 top-[72px] z-100 overflow-y-auto bg-base lg:hidden"
    >
      <nav aria-label="Mobile">
        <ul className="flex flex-col px-4">
          {nav.map((item) => {
            const open = expanded === item.label;
            const active = item.children
              ? inSection(item.href)
              : pathname === item.href;

            return (
              <li key={item.href} className="border-b-[0.8px] border-grey-100">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "flex-1 py-5 font-display text-body-lg transition-colors duration-300",
                      active || open ? "text-accent" : "text-contrast-2",
                      active ? "font-semibold" : "font-medium",
                    )}
                  >
                    {item.label}
                  </Link>

                  {item.children && (
                    <button
                      type="button"
                      aria-label={`${open ? "Collapse" : "Expand"} ${item.label}`}
                      aria-expanded={open}
                      onClick={() => setExpanded(open ? null : item.label)}
                      className="grid size-11 place-items-center text-contrast-2"
                    >
                      <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
                        <path
                          d={open ? "M3 8h10" : "M8 3v10M3 8h10"}
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="square"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {item.children && open && (
                  <ul className="pb-4">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          aria-current={
                            pathname === child.href ? "page" : undefined
                          }
                          className={cn(
                            "block py-3 text-body-lg transition-colors duration-300 hover:text-accent",
                            pathname === child.href
                              ? "font-medium text-accent"
                              : "text-grey-600",
                          )}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        <div className="px-4 pt-6">
          <Link
            href={headerCta.href}
            className="flex w-full items-center justify-between gap-4 bg-contrast-2 px-5 py-5 font-display text-body-lg font-medium text-white transition-colors duration-300 hover:bg-accent"
          >
            {headerCta.label}
            <ArrowIcon />
          </Link>
        </div>
      </nav>
    </div>
  );
}
