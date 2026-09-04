import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Analytics from "@/components/ui/Analytics";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, buildOrganizationSchema, buildCmsSchemas } from "@/lib/metadata";
import SiteScripts from "@/components/seo/SiteScripts";
import { getSiteRegulars, getCustomCss } from "@/lib/data";
import { site } from "@/config/site";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const productSans = localFont({
  src: [
    {
      path: "../../public/fonts/Product Sans Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Product Sans Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Product Sans Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Product Sans Bold Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-product-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("home", {}, "/");
}

// Deliberately the ONLY layout in the tree with <html>/<body> — everything
// here comes from cache-friendly (`revalidate`-based) fetches, never
// headers()/cookies(), so this stays statically renderable. Which chrome
// wraps `children` (full site vs. the under-construction shell) is decided by
// src/proxy.ts via a rewrite, not by branching here — see
// src/app/(main)/layout.tsx and src/app/(construction)/layout.tsx.
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Only org + GLOBAL CMS schema here — no request path needed, so the layout
  // stays statically renderable. Page-specific schema is injected per-route via
  // <PageSchemas path="…" />.
  const [orgSchema, cmsSchemas, siteRegulars, customCss] = await Promise.all([
    buildOrganizationSchema(),
    buildCmsSchemas("/", "global"),
    getSiteRegulars(),
    getCustomCss(),
  ]);

  return (
    <html lang={site.locale} className={`${cinzel.variable} ${productSans.variable} h-full antialiased`} suppressHydrationWarning={true}>
      <head>
        {/* Preconnect to all external origins — eliminates DNS + TCP + TLS round-trips */}
        <link rel="preconnect" href="https://mayurstay.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.mayurstay.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />

        {/* AEO: Resort + WebSite JSON-LD */}
        <JsonLd schema={orgSchema} />
        {/* AEO: site-wide (slug-less) CMS schemas; per-page schema via <PageSchemas> */}
        {cmsSchemas.map((schema, i) => (
          <JsonLd key={i} schema={schema} />
        ))}
        {/* Site-wide CSS for CMS rich-text blocks (.cms-content) — falls back to
            mock data until `siteregulars` exposes `custom_css` for real. */}
        {(siteRegulars?.custom_css ?? customCss?.css) && (
          <style
            dangerouslySetInnerHTML={{ __html: siteRegulars?.custom_css ?? customCss?.css }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        {/* Analytics: GA4 + FB Pixel — injected only when real IDs exist in CMS */}
        <SiteScripts />
        <Analytics />
        {/* Font Awesome loaded after hydration — never blocks FCP/LCP */}
        {/* <FontAwesomeLoader /> */}
      </body>
    </html>
  );
}
