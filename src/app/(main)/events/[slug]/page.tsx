import type { Metadata } from "next";
import EventPage from "@/components/package/EventPage";
import JsonLd from "@/components/seo/JsonLd";
import NotFound from "@/app/not-found";
import { findCategoryItem, getSiteRegulars } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { toImageUrls, resolveHeroImages } from "@/lib/images";
import { SITE_URL, site } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// CMS `subpackage` parent_id for the Event Venues category.
const EVENTS_PARENT_ID = "6";

function findEventBySlug(slug: string): Promise<any | null> {
  return findCategoryItem(EVENTS_PARENT_ID, slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await findEventBySlug(slug);
  if (!item) return { title: "Venue Not Found" };

  const ogImage = toImageUrls(item.gallery_images)[0] ?? item.fb_img ?? "";

  return buildMetadata(
    "events",
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
    `/events/${slug}`
  );
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [item, siteRegulars] = await Promise.all([
    findEventBySlug(slug),
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
      { "@type": "ListItem", position: 2, name: "Events", item: `${SITE_URL}/events` },
      { "@type": "ListItem", position: 3, name: item.title ?? slug, item: `${SITE_URL}/events/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <EventPage pkg={pkg} />
    </>
  );
}
