import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getHeaderCta, getNav, getSiteMetaSync } from "@/lib/data";
import { truncateAtWord } from "@/lib/truncate";
import { JsonLd } from "@/lib/jsonld";
import "./globals.css";

/* Module scope: `metadata` and the JSON-LD constants below are read statically by
   Next before any request, so they can't await. */
const site = getSiteMetaSync();

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const fullTitle = `${site.name} — ${site.tagline}`;

const homeDescription =
  "We build SaaS platforms, AI-powered products, business systems, and integrations for founders and enterprises. One senior team from strategy through production.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: truncateAtWord(fullTitle, 60),
    template: `%s | ${site.name}`,
  },
  description: homeDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: fullTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon-512.png`,
  description: site.description,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phone,
    contactType: "sales",
    email: site.email,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [nav, headerCta] = await Promise.all([getNav(), getHeaderCta()]);

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <a
          href="#main"
          className="sr-only rounded-none focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:bg-contrast-2 focus:px-4 focus:py-3 focus:text-body focus:text-white"
        >
          Skip to content
        </a>
        <Header nav={nav} headerCta={headerCta} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
