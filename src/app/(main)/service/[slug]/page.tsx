import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findServiceBySlug, getSiteRegulars } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { toImageUrls, resolveHeroImages } from "@/lib/images";
import ServicePage from "@/components/service/ServicePage";
import { SITE_URL, site, contact } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await findServiceBySlug(slug);
  if (!item) return { title: "Service Not Found" };

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
    `/service/${slug}`
  );
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const [item, siteRegulars] = await Promise.all([
    findServiceBySlug(slug),
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
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/facilities` },
      { "@type": "ListItem", position: 3, name: item.title ?? slug, item: `${SITE_URL}/service/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicePage pkg={pkg} phone={phone} />
    </>
  );
}