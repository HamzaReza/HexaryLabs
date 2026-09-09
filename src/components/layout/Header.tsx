"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { Container } from "@/components/ui/Container";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import type { NavItem, NavLink } from "@/lib/data/types";
import { cn } from "@/lib/cn";

/**
 * Sticky header — 84px, white, 1px rule beneath (measured on the design's
 * header frame).
 *
 * On `lg+`, Services opens a mid-width floating 2×2 panel under the link
 * (hover + focus-within, Esc / route change close) — not a full-bleed mega bar
 * and not a tiny list. Mobile / tablet keep the hamburger + `MobileMenu`
 * accordion from `NavItem.children`.
 *
 * Nav data arrives as props from the server layout rather than being imported —
 * this is a client component, so it can't await the data layer itself.
 */
export function Header({ nav, headerCta }: { nav: NavItem[]; headerCta: NavLink }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const closeTimer = useRef<number | null>(null);

  const openNow = (label: string | null) => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMenu(label);
  };

  const closeSoon = () => {
    if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 150);
  };

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (closeTimer.current !== null) clearTimeout(closeTimer.current);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-100 border-b border-grey-200 bg-base">
      <Container>
        <div className="flex h-[var(--header-h-sm)] items-center justify-between lg:h-[var(--header-h)]">
          <Logo />

          <nav aria-label="Main" className="h-full max-lg:hidden">
            <ul className="flex h-full items-center gap-13">
              {nav.map((item) => {
                const menuOpen = Boolean(item.children) && openMenu === item.label;
                return (
                  <li
                    key={item.href}
                    className="relative flex h-full items-center"
                    onMouseEnter={() => openNow(item.children ? item.label : null)}
                    onMouseLeave={closeSoon}
                    onFocus={() => openNow(item.children ? item.label : null)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        closeSoon();
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      aria-expanded={item.children ? menuOpen : undefined}
                      aria-haspopup={item.children ? "menu" : undefined}
                      className={cn(
                        "text-body font-medium transition-colors duration-300 ease-in-out",
                        isActive(item.href) || menuOpen
                          ? "text-accent"
                          : "text-contrast hover:text-accent",
                      )}
                    >
                      {item.label}
                    </Link>

                    {item.children && menuOpen && (
                      <ServicesDropdown items={item.children} />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Outlined, square, no arrow — the design's header CTA. */}
            <Link
              href={headerCta.href}
              className={cn(
                "border border-contrast px-6 py-3.5 max-lg:hidden",
                "font-display text-body font-medium leading-[1.125] text-contrast",
                "transition-colors duration-300 ease-in-out",
                "hover:border-accent hover:text-accent",
              )}
            >
              {headerCta.label}
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              /* The design draws a bare 24px glyph with no box. The button
                 keeps a 44px hit area regardless — a 24px target is below the
                 accessible minimum, and the box was the only thing making it
                 large enough before. `-mr-2.5` pulls the enlarged target back
                 so the *glyph* still lands on the 20px gutter. */
              className="-mr-2.5 grid size-11 place-items-center text-contrast transition-colors duration-300 hover:text-accent lg:hidden"
            >
              <MenuGlyph open={mobileOpen} />
            </button>
          </div>
        </div>
      </Container>

      {mobileOpen && (
        <MobileMenu
          nav={nav}
          headerCta={headerCta}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
}

/**
 * Mid-width Services panel — floating card under the nav item on `lg+` only
 * (parent nav is `max-lg:hidden`). ~40rem, 2×2 grid of service cells with
 * optional one-line teasers; soft border + shadow so it reads as a card, not a
 * full-bleed bar or a cramped list.
 */
function ServicesDropdown({ items }: { items: NavLink[] }) {
  return (
    <div
      role="menu"
      aria-label="Services"
      className={cn(
        /* Center under the Services label (wide card + left-0 reads as “to the right”). */
        "absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2",
        "w-[min(40rem,calc(100vw-2.5rem))] border border-grey-200 bg-base p-2 shadow-lg",
      )}
    >
      <ul className="grid grid-cols-2 gap-1">
        {items.map((child) => (
          <li key={child.href} role="none">
            <Link
              href={child.href}
              role="menuitem"
              className={cn(
                "group flex h-full flex-col gap-1.5 px-5 py-4",
                "transition-colors duration-300 ease-in-out",
                "hover:bg-base-2 focus-visible:bg-base-2",
              )}
            >
              <span className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "min-w-0 font-display text-body font-medium text-contrast",
                    "transition-colors duration-300 ease-in-out",
                    "group-hover:text-accent group-focus-visible:text-accent",
                  )}
                >
                  {child.label}
                </span>
                <ArrowIcon
                  tight
                  className={cn(
                    "size-[9.5px] shrink-0 text-grey-400",
                    "transition-colors duration-300 ease-in-out",
                    "group-hover:text-accent group-focus-visible:text-accent",
                  )}
                />
              </span>
              {child.summary ? (
                <span className="text-small leading-snug text-grey-600">
                  {child.summary}
                </span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The design's `iconamoon:menu-burger-horizontal-fill` at 24: three round-capped
 * bars on 6 / 12 / 18, spanning 3.5 → 20.5. Drawn as strokes rather than the
 * exported fill path, which is the same picture in a tenth of the bytes.
 *
 * The previous build drew two bars at 20px. Three is the design's.
 */
function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="size-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      {open ? (
        <path d="M5 5l14 14M19 5L5 19" />
      ) : (
        <path d="M3.5 6h17M3.5 12h17M3.5 18h17" />
      )}
    </svg>
  );
}
