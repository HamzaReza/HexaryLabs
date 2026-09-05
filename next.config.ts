import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["a729-39-45-4-35.ngrok-free.app"],
  // No Content-Security-Policy yet — adding one is an open decision (D6 in
  // docs/redesign-plan.md): roll it out report-only first against the live
  // site before enforcing.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              '</sitemap.xml>; rel="sitemap", </>; rel="alternate"; type="text/markdown"',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
