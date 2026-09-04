import { getAnalyticsIds } from "@/lib/metadata";
import Script from "next/script";

/**
 * SiteScripts — server component that conditionally injects
 * Google Analytics (GA4) and Facebook Pixel scripts from
 * the CMS `metadata` API.
 *
 * Scripts are only injected when the stored IDs pass a format
 * validation check (so placeholder values are silently skipped).
 *
 * Uses next/script with strategy="afterInteractive" so these never
 * block the critical rendering path.
 */
export default async function SiteScripts() {
  const { gaId, fbPixelId, schemaCode } = await getAnalyticsIds();

  return (
    <>
      {/* ── Google Analytics GA4 ─────────────────────────────────── */}
      {gaId && (
        <>
          <Script
            id="ga-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="lazyOnload"
          />
          <Script id="ga-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}

      {/* ── Facebook Pixel ───────────────────────────────────────── */}
      {fbPixelId && (
        <Script id="fb-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${fbPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* ── Custom Schema Code from CMS (if any) ─────────────────── */}
      {schemaCode && (
        <Script id="cms-schema" strategy="lazyOnload">
          {schemaCode}
        </Script>
      )}
    </>
  );
}
