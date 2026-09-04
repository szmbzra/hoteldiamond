import { NextRequest, NextResponse } from "next/server";
import { getMenuItems, getSiteRegulars } from "@/lib/data";

// Pages that live directly under (construction) with no (main) counterpart
// at all (e.g. reach-us) — served as-is, not rewritten through /uc/<path>.
// Everything else on the "coming soon" allow-list gets the dark-themed /uc
// treatment by default: an exact match under (construction)/uc/<path> if one
// exists (e.g. work-with-us), otherwise the generic (construction)/uc/[slug]
// catch-all, which renders any CMS article slug automatically.
const CONSTRUCTION_ONLY_ROUTES = new Set(["/reach-us"]);

/**
 * While `siteregulars.site_under_contsruction` gates the site behind the
 * coming-soon screen, the CMS's "coming soon" menu (type 0 — the same one
 * rendered on /under-construction) doubles as the allow-list of pages that
 * stay reachable. Adding/removing a link there is enough; no code change
 * needed for a new article slug — only for a brand-new *non-article* bespoke
 * page, which needs its own (construction)/uc/<path>/page.tsx (see
 * work-with-us) or a CONSTRUCTION_ONLY_ROUTES entry if it has no (main)
 * counterpart at all.
 *
 * Everything is done via rewrite (not a header flag) so (main) and
 * (construction) never need headers()/cookies() themselves — see
 * src/app/layout.tsx for why that matters for static rendering.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const siteRegulars = await getSiteRegulars();
  if (siteRegulars?.site_under_contsruction !== "1") {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.rewrite(new URL("/under-construction", request.url));
  }

  const menu = await getMenuItems(0);
  const allowedPaths = new Set(
    menu
      .map((item) => item.link)
      .filter((link): link is string => Boolean(link) && link !== "/" && !link.includes("#"))
  );

  if (!allowedPaths.has(pathname)) {
    return NextResponse.rewrite(new URL("/under-construction", request.url));
  }

  if (CONSTRUCTION_ONLY_ROUTES.has(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL(`/uc${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
};
