import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { getFooterNav, getSiteMeta } from "@/lib/data";

/**
 * Footer — four equal columns over the oversized `hexarylabs` watermark.
 *
 * The first column is the brand block (mark, contact details, copyright,
 * social); the other three come from the nav data. The watermark is the same
 * shape as the header mark, drawn at the full content width and bled to the
 * bottom edge — the design gives the footer 80px of top padding and none at the
 * bottom, so the wordmark *is* the last 230px of the page.
 *
 * The previous build's hairline cell grid, full-width "Start a Project" row and
 * bottom bar are all gone; the approved design has none of them.
 *
 * Below `lg` the design rearranges rather than reflows, so the two layouts are
 * placed explicitly on one DOM rather than rendered twice:
 *
 * · the wordmark centres;
 * · each nav column becomes a **row** — its heading in one half, its links in
 *   the other, on a 24 gap — which is what makes the mobile footer 841 tall
 *   instead of the 1021 a single stacked column costs;
 * · a rule, then the LinkedIn glyph, then the contact details, all centred.
 *
 * The desktop grid then puts the brand pieces back into column one by explicit
 * row placement, so no element is duplicated and every link appears once.
 */
export async function Footer() {
  const [footerNav, site] = await Promise.all([getFooterNav(), getSiteMeta()]);

  const contact = [
    { label: site.email, href: `mailto:${site.email}` },
    { label: site.phone, href: `tel:+${site.phone.replace(/\D/g, "")}` },
  ];

  return (
    <footer data-tone="dark" className="bg-contrast-2 pt-10 text-white lg:pt-20">
      <Container>
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-4 lg:gap-6">
          {/* `contents` below `lg`: the three brand pieces become direct
              children of the mobile column so `order` can interleave them with
              the nav rows. Above `lg` the wrapper is a normal grid child again
              and the desktop column is exactly what it was. */}
          <div className="flex flex-col gap-8 max-lg:contents">
            {/* `flex`, not a plain block: the wrapper exists only to carry the
                mobile order, and as a block it gives the inline logo a line box
                whose leading pushes the rest of the column down 6px. */}
            <div className="flex max-lg:order-1 max-lg:self-center">
              <Logo />
            </div>

            <div className="flex flex-col gap-3 text-body text-grey-300 max-lg:order-5 max-lg:items-center">
              {contact.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-fit transition-colors duration-300 ease-in-out hover:text-accent-hi"
                >
                  {item.label}
                </a>
              ))}
              <p>
                © {new Date().getFullYear()} {site.name}
              </p>
            </div>

            {site.social.linkedin && (
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`${site.name} on LinkedIn`}
                className="w-fit text-grey-500 transition-colors duration-300 ease-in-out hover:text-accent-hi max-lg:order-4 max-lg:self-center"
              >
                <LinkedInIcon className="size-8" />
              </a>
            )}
          </div>

          {footerNav.map((col) => (
            <div
              key={col.heading}
              /* A column on desktop; a two-half row on mobile, which is what
                 keeps the mobile footer at the design's 841 rather than the
                 1021 a single stacked column costs. */
              className="flex gap-6 max-lg:order-2 max-lg:items-start lg:flex-col lg:gap-8"
            >
              <h2 className="font-display text-body-lg font-medium text-white max-lg:flex-1">
                {col.heading}
              </h2>
              <ul className="flex flex-col gap-3 max-lg:flex-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body text-grey-300 transition-colors duration-300 ease-in-out hover:text-accent-hi"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Mobile only: the design rules off the nav before the brand
              details. On desktop those details are column one and need no
              rule. */}
          <hr className="border-grey-600 max-lg:order-3 lg:hidden" />
        </div>

        {/* Watermark. `text-contrast` is #2b2b2b — on this surface it reads as
            the design's watermark tint rather than as body ink. */}
        <Wordmark className="mt-12 block w-full text-contrast" />
      </Container>
    </footer>
  );
}
