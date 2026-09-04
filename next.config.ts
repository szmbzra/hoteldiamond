import type { NextConfig } from "next";

// The CMS serves uploaded photos (rooms, gallery, etc.) from the same origin
// as the API, under a sibling `/backend/images` path — e.g.
// http://localhost/hoteldiamond/backend/images/subpackage/room.jpg when the
// API is http://localhost/hoteldiamond/api/v1. Derive that images path from
// the API URL so next/image can optimise it without hardcoding a hostname.
const CMS_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/hoteldiamond/api/v1/";
const cmsBasePath = new URL(CMS_API_URL).pathname.replace(/\/api\/v1\/?$/, "");
const cmsImagesPattern = new URL(`${cmsBasePath}/backend/images/**`, CMS_API_URL);
// Next 16 blocks image optimization from private/loopback IPs by default (SSRF
// guard) — the local CMS resolves to one in dev, so opt back in only then.
// Once NEXT_PUBLIC_API_URL points at a real public host, this stays off.
const cmsHostIsLocal = ["localhost", "127.0.0.1", "::1"].includes(cmsImagesPattern.hostname);

// Baseline security headers applied to every route. Tightened for a marketing
// site that loads images/fonts/analytics from a known set of origins.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  // Drop the "X-Powered-By: Next.js" fingerprint.
  poweredByHeader: false,
  images: {
    // Serve modern formats — browsers that support AVIF/WebP get ~50% smaller files
    formats: ["image/avif", "image/webp"],
    // Responsive breakpoints covering mobile → retina desktop
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    remotePatterns: [
      cmsImagesPattern,
      // Both www and non-www variants are used in API responses
      { protocol: "https", hostname: "www.mayurstay.com" },
      { protocol: "https", hostname: "mayurstay.com" },
    ],
    ...(cmsHostIsLocal ? { dangerouslyAllowLocalIP: true } : {}),
  },
    async redirects() {
    return [
      {
        source: '/apanel',
        destination: 'http://localhost/hoteldiamond/apanel/',
        permanent: true,
      },
    ]
  },
  async headers() {
    // Next.js already serves /_next/static as immutable; we only add security
    // headers here, applied to every route.
    const headers = [...securityHeaders];
    if (process.env.NODE_ENV === "development") {
      // Stop the browser from caching HTML/RSC responses in dev so a normal
      // refresh always reflects the latest code, no hard refresh needed.
      headers.push({ key: "Cache-Control", value: "no-store" });
    }
    return [{ source: "/:path*", headers }];
  },
};

export default nextConfig;
