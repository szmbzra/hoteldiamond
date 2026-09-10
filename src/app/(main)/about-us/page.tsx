import type { Metadata } from "next";
import { findArticleBySlug, getSiteRegulars } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import AboutPage from "@/components/about/AboutPage";
import { contact } from "@/config/site";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("about", {}, "/about");
}

export default async function AboutRoute() {
  const [data, siteRegulars] = await Promise.all([
    findArticleBySlug("about-us"),
    getSiteRegulars(),
  ]);

  const phone: string =
    siteRegulars?.contact_info ?? siteRegulars?.whatsapp_a ?? contact.phone;

  return <AboutPage data={data} phone={phone} />;
}