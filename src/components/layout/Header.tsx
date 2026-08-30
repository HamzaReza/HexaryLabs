"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { Container } from "@/components/ui/Container";
import type { NavItem, NavLink } from "@/lib/data/types";
import { cn } from "@/lib/cn";

/**
 * Sticky header — 84px, white, 1px rule beneath (measured on the design's
 * header frame).
 *
 * Four plain links and an outlined CTA. The previous build opened a full-width
 * mega-menu under Services; the approved design has no dropdown, so Services is
 * an ordinary link to the index and the child routes are reached from there and
 * from the footer. `NavItem.children` is still carried by the data layer and is
 * still used by the mobile menu's accordion.
 *
 * Nav data arrives as props from the server layout rather than being imported —
 * this is a client component, so it can't await the data layer itself.
 */
export function Header({ nav, headerCta }: { nav: NavItem[]; headerCta: NavLink }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-100 border-b border-grey-200 bg-base">
      <Container>
        <div className="flex h-[var(--header-h-sm)] items-center justify-between lg:h-[var(--header-h)]">
          <Logo />

          <nav aria-label="Main" className="max-lg:hidden">
            <ul className="flex items-center gap-13">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "text-body font-medium transition-colors duration-300 ease-in-out",
                      isActive(item.href)
                        ? "text-accent"
                        : "text-contrast hover:text-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
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
              className="grid size-11 place-items-center border border-contrast transition-colors duration-300 hover:border-accent hover:text-accent lg:hidden"
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

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5">
      {open ? (
        <path
          d="M4 4l12 12M16 4L4 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      ) : (
        <path
          d="M3 6h14M3 14h14"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      )}
    </svg>
  );
}
