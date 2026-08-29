import { getSiteMetaSync } from "@/lib/data";

export function GET() {
  const site = getSiteMetaSync();
  const body = `User-Agent: *
Content-Signal: search=yes, ai-train=no, ai-input=yes
Allow: /
Disallow: /privacy
Disallow: /terms
Disallow: /styleguide

Sitemap: ${site.url}/sitemap.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  });
}
