import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findCategoryItem, getSiteRegulars } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { toImageUrls, resolveHeroImages } from "@/lib/images";
import RestaurantPage from "@/components/restaurant/RestaurantPage";
import { SITE_URL, site, contact } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// CMS `subpackage` parent_id for the Restaurant category.
const RESTAURANT_PARENT_ID = "7";

function findRestaurantBySlug(slug: string): Promise<any | null> {
  return findCategoryItem(RESTAURANT_PARENT_ID, slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await findRestaurantBySlug(slug);
  if (!item) return { title: "Restaurant Not Found" };

  const ogImage = toImageUrls(item.gallery_images)[0] ?? item.fb_img ?? "";

  return buildMetadata(
    "restaurant",
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
    `/restaurant/${slug}`
  );
}

export default async function RestaurantDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [item, siteRegulars] = await Promise.all([
    findRestaurantBySlug(slug),
    getSiteRegulars(),
  ]);

  if (!item) notFound();

  const heroImages = resolveHeroImages(item, item.fb_img ?? siteRegulars?.default ?? "");
  const phone: string =
    siteRegulars?.whatsapp_a ?? siteRegulars?.contact_info ?? contact.phone;

  const pkg = {
    ...item,
    description: item.description ?? item.content_0 ?? item.content,
    gallery_images: heroImages,
    amenities: (item.amenities ?? item.features ?? []) as any[],
    slug,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: item.title ?? slug, item: `${SITE_URL}/restaurant/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RestaurantPage pkg={pkg} phone={phone} />
    </>
  );
}
