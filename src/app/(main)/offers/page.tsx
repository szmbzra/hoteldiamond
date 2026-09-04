import Breadcrumb from "@/components/ui/Breadcrumb";
import PageSchemas from "@/components/seo/PageSchemas";
import { getPageHeroImage, getOffers } from "@/lib/data";
import OfferList from "@/components/offers/OfferList";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("offers", {}, "/offers");
}

export default async function OffersPage() {
  const backgroundImage = await getPageHeroImage("offers");
  const offers = await getOffers();

  return (
    <>
      <PageSchemas slug="offers" />
      <Breadcrumb
        backgroundImage={backgroundImage}
        title="Offers"
        items={[{ label: "Home", href: "/" }, { label: "Offers" }]}
      />

      <section className="py-24 px-6 md:px-12 bg-[#f9f7f2]">
        <div className="max-w-7xl mx-auto">
          <OfferList offers={offers || []} />
        </div>
      </section>
    </>
  );
}
