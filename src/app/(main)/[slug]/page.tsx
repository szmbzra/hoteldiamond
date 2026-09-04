import type { Metadata } from "next";
import PackagePageClient from "@/components/package/PackagePage";
import JsonLd from "@/components/seo/JsonLd";
import NotFound from "../../not-found";
import { findArticleBySlug, getSiteRegulars } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { toImageUrls, resolveHeroImages } from "@/lib/images";
import { SITE_URL, site } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await findArticleBySlug(slug);
  if (!item) return { title: "Page Not Found" };

  const ogImage = toImageUrls(item.gallery_images)[0] ?? item.fb_img ?? "";

  return buildMetadata(
    "services",
    {
      title: `${item.meta_title || item.title} | ${site.shortName}`,
      description: item.meta_description ?? undefined,
      keywords: item.meta_keywords ?? undefined,
      openGraph: {
        title: item.meta_title || item.title || "",
        description: item.meta_description ?? undefined,
        ...(ogImage && { images: [{ url: ogImage }] }),
      },
    },
    `/${slug}`
  );
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;

  const [item, siteRegulars] = await Promise.all([
    findArticleBySlug(slug),
    getSiteRegulars(),
  ]);

  if (!item) return <NotFound />;

  const isArticle = true;
  const heroImages = resolveHeroImages(item, item.fb_img ?? siteRegulars?.default ?? "");

  const pkg = {
    ...item,
    description: isArticle ? item.content : item.description ?? item.content_0 ?? item.content,
    gallery_images: heroImages,
    amenities: item.amenities ?? item.features ?? [],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: item.title ?? slug, item: `${SITE_URL}/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <PackagePageClient pkg={pkg} isArticle={isArticle} />
    </>
  );
}