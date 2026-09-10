import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findCategoryItem, getSiteRegulars } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { resolveHeroImages } from "@/lib/images";
import DiningPage from "@/components/restaurant/DiningPage";
import JsonLd from "@/components/seo/JsonLd";
import { CATEGORY_IDS, SITE_URL, site, contact } from "@/config/site";
import { DUMMY_DINING_OUTLETS } from "@/data/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function findRestaurantBySlug(slug: string): Promise<any | null> {
  const real = await findCategoryItem(CATEGORY_IDS.restaurant, slug);
  if (real) return real;
  // Falls back to the same dummy outlets shown on /dining until the CMS has
  // real `subpackage` entries under CATEGORY_IDS.restaurant.
  return DUMMY_DINING_OUTLETS.find((o) => o.slug === slug) ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await findRestaurantBySlug(slug);
  if (!item) return { title: "Restaurant Not Found" };

  const ogImage = resolveHeroImages(item)[0] ?? "";

  return buildMetadata(
    "restaurant",
    {
      title: `${item.meta_title || item.title} | ${site.shortName}`,
      description: item.meta_description ?? item.sub_title ?? undefined,
      keywords: item.meta_keywords ?? undefined,
      openGraph: {
        title: item.meta_title || item.title || "",
        description: item.meta_description ?? item.sub_title ?? undefined,
        ...(ogImage && { images: [{ url: ogImage }] }),
      },
    },
    `/dining/${slug}`,
  );
}

export default async function RestaurantDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [item, siteRegulars] = await Promise.all([
    findRestaurantBySlug(slug),
    getSiteRegulars(),
  ]);

  if (!item) notFound();

  const heroUrls = resolveHeroImages(item, item.fb_img ?? siteRegulars?.default ?? "");
  const phone: string =
    siteRegulars?.whatsapp_a ?? siteRegulars?.contact_info ?? contact.phone;

  // DiningPage expects `banner_img: {id,url,alt}[]`, while subpackage items
  // (and the dummy fallback) carry `gallery_images` — adapt here so DiningPage
  // itself doesn't need to know which shape it's getting.
  const pkg = {
    ...item,
    description: item.description ?? item.content_0 ?? item.content,
    banner_img: heroUrls.map((url, i) => ({ id: i, url, alt: item.title })),
    amenities: item.amenities?.length ? [{ items: item.amenities }] : [],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Dining & Bar", item: `${SITE_URL}/dining` },
      { "@type": "ListItem", position: 3, name: item.title ?? slug, item: `${SITE_URL}/dining/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <DiningPage pkg={pkg} phone={phone} />
    </>
  );
}
