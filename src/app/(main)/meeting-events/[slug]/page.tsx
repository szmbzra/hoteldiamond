import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findCategoryItem, getSiteRegulars } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { resolveHeroImages } from "@/lib/images";
import EventsPage from "@/components/events/EventsPage";
import JsonLd from "@/components/seo/JsonLd";
import { CATEGORY_IDS, SITE_URL, site } from "@/config/site";
import { DUMMY_EVENT_VENUES } from "@/data/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function findEventBySlug(slug: string): Promise<any | null> {
  const real = await findCategoryItem(CATEGORY_IDS.events, slug);
  if (real) return real;
  // Falls back to the same dummy venues shown on /events until the CMS has
  // real `subpackage` entries under CATEGORY_IDS.events.
  return DUMMY_EVENT_VENUES.find((v) => v.slug === slug) ?? null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await findEventBySlug(slug);
  if (!item) return { title: "Venue Not Found" };

  const ogImage = resolveHeroImages(item)[0] ?? "";

  return buildMetadata(
    "meeting-events",
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
    `/meeting-events/${slug}`,
  );
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [item, siteRegulars] = await Promise.all([
    findEventBySlug(slug),
    getSiteRegulars(),
  ]);

  if (!item) notFound();

  const heroUrls = resolveHeroImages(
    item,
    item.fb_img ?? siteRegulars?.default ?? "",
  );

  // EventsPage expects `banner_img: {id,url,alt}[]`, while subpackage items
  // (and the dummy fallback) carry `gallery_images` — adapt here so
  // EventsPage itself doesn't need to know which shape it's getting.
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Meeting & Events",
        item: `${SITE_URL}/meeting-events`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: item.title ?? slug,
        item: `${SITE_URL}/meeting-events/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <EventsPage pkg={pkg} />
    </>
  );
}
