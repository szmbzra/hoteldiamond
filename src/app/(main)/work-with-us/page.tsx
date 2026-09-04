import CareerForm from "@/components/careers/CareerForm";
import CareerIntro from "@/components/careers/CareerIntro";
import Breadcrumb from "@/components/ui/Breadcrumb";
import PageSchemas from "@/components/seo/PageSchemas";
import { getPageHeroImage, getSiteRegulars } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("career", {}, "/work-with-us");
}

export default async function Page() {
  const [backgroundImage, siteRegulars] = await Promise.all([
    getPageHeroImage("career"),
    getSiteRegulars(),
  ]);

  return (
    <>
      <PageSchemas slug="career" />
      <Breadcrumb
        backgroundImage={backgroundImage}
        title="Work With Us"
        items={[{ label: "Home", href: "/" }, { label: "Work With Us" }]}
      />
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-10 md:py-20">
        <CareerIntro siteName={siteRegulars?.name} />
        <CareerForm />
      </div>
    </>
  );
}
