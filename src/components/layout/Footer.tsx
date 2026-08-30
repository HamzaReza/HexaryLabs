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
 */
export async function Footer() {
  const [footerNav, site] = await Promise.all([getFooterNav(), getSiteMeta()]);

  const contact = [
    { label: site.email, href: `mailto:${site.email}` },
    { label: site.phone, href: `tel:+${site.phone.replace(/\D/g, "")}` },
  ];

  return (
    <footer data-tone="dark" className="bg-contrast-2 pt-20 text-white">
      <Container>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="flex flex-col gap-8">
            <Logo />

            <div className="flex flex-col gap-3 text-body text-grey-300">
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
                className="w-fit text-grey-500 transition-colors duration-300 ease-in-out hover:text-accent-hi"
              >
                <LinkedInIcon className="size-8" />
              </a>
            )}
          </div>

          {footerNav.map((col) => (
            <div key={col.heading} className="flex flex-col gap-8">
              <h2 className="font-display text-body-lg font-medium text-white">
                {col.heading}
              </h2>
              <ul className="flex flex-col gap-3">
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
        </div>

        {/* Watermark. `text-contrast` is #2b2b2b — on this surface it reads as
            the design's watermark tint rather than as body ink. */}
        <Wordmark className="mt-12 block w-full text-contrast" />
      </Container>
    </footer>
  );
}
