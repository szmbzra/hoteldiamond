import type { Metadata } from "next";
import NotFound from "@/app/not-found";
import JsonLd from "@/components/seo/JsonLd";
import OfferDetail from "@/components/offers/OfferDetail";
import { findOfferBySlug, getOffers } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL, site } from "@/config/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const offer = await findOfferBySlug(slug);
  if (!offer) return { title: "Offer Not Found" };

  const plainTitle = offer.title?.replace(/<[^>]+>/g, "") || "";
  const image = offer.image || (offer.img && offer.img[0]) || "";

  return buildMetadata(
    "offers",
    {
      title: `${plainTitle} | ${site.shortName}`,
      openGraph: {
        title: plainTitle,
        ...(image && { images: [{ url: image }] }),
      },
    },
    `/offers/${slug}`
  );
}

export default async function OfferDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [offer, allOffers] = await Promise.all([
    findOfferBySlug(slug),
    getOffers(),
  ]);

  if (!offer) return <NotFound />;

  const plainTitle = offer.title?.replace(/<[^>]+>/g, "") || slug;

  const offersList: any[] = Array.isArray(allOffers) ? allOffers : Object.values(allOffers || {});
  const otherOffers = offersList.filter((item: any) => item?.id !== offer.id);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Offers", item: `${SITE_URL}/offers` },
      { "@type": "ListItem", position: 3, name: plainTitle, item: `${SITE_URL}/offers/${slug}` },
    ],
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <OfferDetail offer={offer} otherOffers={otherOffers} />
    </>
  );
}
