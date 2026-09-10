import { BreadcrumbNoBanner } from "@/components/ui/Breadcrumb";
import PageSchemas from "@/components/seo/PageSchemas";
import { getOffers } from "@/lib/data";
import OfferList from "@/components/offers/OfferList";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { DecorativeGlow } from "@/components/ui/DecorativeBlobs";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("offers", {}, "/offers");
}

export default async function OffersPage() {
  const offers = await getOffers();

  return (
    <>
      <PageSchemas slug="offers" />
      <BreadcrumbNoBanner title="Offers" />

      <section className="relative overflow-hidden py-24 px-6 md:px-12 bg-[#f9f7f2]">
        <DecorativeGlow variant="gold-dark" />
        <div className="relative max-w-7xl mx-auto">
          <OfferList offers={offers || []} />
        </div>
      </section>
    </>
  );
}
