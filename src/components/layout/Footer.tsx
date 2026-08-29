import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import { Divider } from "@/components/ui/Divider";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { getFooterNav, getSiteMeta } from "@/lib/data";

/**
 * Footer — the reference's anatomy: hairline column grid, a full-width CTA row
 * beneath it, then a bottom bar (social / legal / contact).
 */
export async function Footer() {
  const [footerNav, site] = await Promise.all([getFooterNav(), getSiteMeta()]);

  return (
    <footer data-tone="dark" className="bg-contrast-2 text-white">
      <Container>
        <Divider fade className="mb-16" />

        {/* Link grid — hairline borders form the cells */}
        <div className="grid border-[0.8px] border-grey-700 sm:grid-cols-2 lg:grid-cols-3">
          {footerNav.map((col, i) => (
            <div
              key={col.heading}
              className={
                i > 0
                  ? "border-grey-700 p-8 max-sm:border-t-[0.8px] sm:border-l-[0.8px] max-lg:sm:[&:nth-child(3)]:border-l-0 max-lg:sm:[&:nth-child(3)]:border-t-[0.8px]"
                  : "p-8"
              }
            >
              <h2 className="font-display text-body-lg font-medium text-white">
                {col.heading}
              </h2>
              <ul className="mt-6 flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body text-grey-300 transition-colors duration-300 hover:text-accent-hi"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Full-width CTA row */}
        <Link
          href="/contact"
          className="group flex items-center justify-between gap-4 border-x-[0.8px] border-b-[0.8px] border-grey-700 bg-surface-dark px-8 py-7 transition-colors duration-300 hover:bg-white"
        >
          <span className="font-display text-body-lg font-medium text-white transition-colors duration-300 group-hover:text-contrast-2">
            Start a Project
          </span>
          <ArrowIcon className="size-5 text-white transition-colors duration-300 group-hover:text-contrast-2" />
        </Link>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 py-10">
          <Logo className="text-white" />

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body text-grey-300">
            <a
              href={`mailto:${site.email}`}
              className="underline-offset-4 transition-colors duration-300 hover:text-accent-hi hover:underline"
            >
              {site.email}
            </a>
            <a
              href={`tel:+${site.phone.replace(/\D/g, "")}`}
              className="underline-offset-4 transition-colors duration-300 hover:text-accent-hi hover:underline"
            >
              {site.phone}
            </a>
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
