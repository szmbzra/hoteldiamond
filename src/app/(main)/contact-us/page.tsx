import ContactDetail from "@/components/contact/ContactDetail";
import ContactFrom from "@/components/contact/ContactFrom";
import MapSection from "@/components/contact/MapSection";
import {BreadcrumbNoBanner}  from "@/components/ui/Breadcrumb";
import PageSchemas from "@/components/seo/PageSchemas";
import { DecorativeGlow } from "@/components/ui/DecorativeBlobs";
import { buildMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("contact", {}, "/contact-us");
}


export default async function Page() {

  return (
    <>
      <PageSchemas slug="contact" />
      <BreadcrumbNoBanner title="Contact Us"/>
        <ContactDetail />
      <section className="relative overflow-hidden">
        <DecorativeGlow variant="dark-gold" sizeA={420} sizeB={400} />
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 md:py-20 ">
          <MapSection />
          <ContactFrom />
        </div>
      </section>
    </>
  );
}
