import { notFound } from "next/navigation";
import type { Metadata } from "next";
import UnderConstructionShell from "@/components/ui/UnderConstructionShell";
import { findArticleBySlug, getSiteRegulars } from "@/lib/data";
import { site } from "@/config/site";
import PackageIntro from "@/components/package/sections/PackageIntro";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await findArticleBySlug(slug);
  return { title: item ? `${item.title} | ${site.shortName}` : "Page Not Found" };
}

// Generic construction-mode counterpart to src/app/(main)/[slug]/page.tsx —
// any CMS article slug added to the "coming soon" menu is rewritten here
// (see src/proxy.ts) and rendered with the same content, just wrapped in the
// coming-soon branding instead of the full Navbar/Footer. A slug that also
// needs a bespoke layout (like work-with-us) gets its own uc/<slug>/page.tsx
// instead, which Next.js matches before falling back to this catch-all.
export default async function UnderConstructionArticlePage({ params }: PageProps) {
  const { slug } = await params;

  const [item, siteRegulars] = await Promise.all([
    findArticleBySlug(slug),
    getSiteRegulars(),
  ]);

  if (!item || siteRegulars?.site_under_contsruction !== "1") {
    notFound();
  }

  const pkg = {
    ...item,
    description: item.content,
  };

  return (
    <UnderConstructionShell logoUrl={siteRegulars?.logo_upload}>
      <PackageIntro title={pkg.title} description={pkg.description} dark />
    </UnderConstructionShell>
  );
}
