import type { Metadata } from "next";
import RoomPage from "@/components/package/RoomPage";
import JsonLd from "@/components/seo/JsonLd";
import NotFound from "@/app/not-found";
import { findCategoryItem, getSiteRegulars } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { toImageUrls, resolveHeroImages } from "@/lib/images";
import { SITE_URL, site, business } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// CMS `subpackage` parent_id for the Rooms & Suites category.
const ROOMS_PARENT_ID = "5";

function findRoomBySlug(slug: string): Promise<any | null> {
  return findCategoryItem(ROOMS_PARENT_ID, slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await findRoomBySlug(slug);
  if (!item) return { title: "Room Not Found" };

  const ogImage = toImageUrls(item.gallery_images)[0] ?? item.fb_img ?? "";

  return buildMetadata(
    "rooms",
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
    `/rooms/${slug}`
  );
}

export default async function RoomDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [item, siteRegulars] = await Promise.all([
    findRoomBySlug(slug),
    getSiteRegulars(),
  ]);

  if (!item) return <NotFound />;

  const heroImages = resolveHeroImages(item, item.fb_img ?? siteRegulars?.default ?? "");

  const pkg = {
    ...item,
    description: item.description ?? item.content_0 ?? item.content,
    gallery_images: heroImages,
    amenities: item.amenities ?? item.features ?? [],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Rooms", item: `${SITE_URL}/rooms` },
      { "@type": "ListItem", position: 3, name: item.title ?? slug, item: `${SITE_URL}/rooms/${slug}` },
    ],
  };

  // HotelRoom + Product structured data. `offers` is emitted ONLY when the CMS
  // supplies a real numeric price — never fabricate a price (penalty risk).
  const rawPrice = (item as { price?: string | number }).price;
  const priceNumber =
    typeof rawPrice === "number"
      ? rawPrice
      : typeof rawPrice === "string"
        ? Number(rawPrice.replace(/[^0-9.]/g, ""))
        : NaN;
  const roomImage = heroImages[0];

  const roomSchema = {
    "@context": "https://schema.org",
    "@type": ["Product", "HotelRoom"],
    name: item.title ?? slug,
    ...(item.meta_description && { description: item.meta_description }),
    ...(roomImage && { image: roomImage }),
    url: `${SITE_URL}/rooms/${slug}`,
    ...(Number.isFinite(priceNumber) && priceNumber > 0 && {
      offers: {
        "@type": "Offer",
        price: priceNumber,
        priceCurrency: business.currency,
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/rooms/${slug}`,
      },
    }),
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={roomSchema} />
      <RoomPage pkg={pkg} />
    </>
  );
}
