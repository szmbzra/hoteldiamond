import ContactDetail from "@/components/contact/ContactDetail";
import ContactFrom from "@/components/contact/ContactFrom";
import MapSection from "@/components/contact/MapSection";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageSchemas from "@/components/seo/PageSchemas";
import { getPageHeroImage } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("contact", {}, "/contact-us");
}


export default async function Page() {
  const backgroundImage = await getPageHeroImage("contact");

  return (
    <>
      <PageSchemas slug="contact" />
      <Breadcrumb
        backgroundImage={backgroundImage}
        title="Contact Us"
        items={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 md:py-20">
        <ContactDetail />
        <ContactFrom />
      </div>
      <MapSection />
    </>
  );
}
