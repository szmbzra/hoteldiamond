import {BreadcrumbNoBanner}  from "@/components/ui/Breadcrumb";
import FaqAccordion from "@/components/faq/FaqAccordion";
import JsonLd from "@/components/seo/JsonLd";
import PageSchemas from "@/components/seo/PageSchemas";
import { getSiteRegulars, getFaqs } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/config/site";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("faq", {}, "/faq");
}

interface FaqItem {
  question: string;
  answer: string;
}

export default async function Page() {
  const siteRegulars = await getSiteRegulars();
  const faqs: FaqItem[] = await getFaqs();

  const faqSchema = faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <>
      {faqSchema && <JsonLd schema={faqSchema} />}
      <PageSchemas slug="faq" />
      <BreadcrumbNoBanner title="FAQ" />

      <section className="mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 grid lg:grid-cols-12 gap-20 justify-center max-w-7xl items-start">
        <div className="text-center mb-12 lg:col-span-4 sticky top-50">
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-gold-text mb-4 block">
            Help Center
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-[1.5px] bg-gold mx-auto mb-6" />
          <p className="text-sm text-gray-400 font-light max-w-lg mx-auto leading-relaxed">
            Find answers to common questions about your stay at {site.name}.
          </p>
        </div>

        <FaqAccordion items={faqs} />
      </section>
    </>
  );
}
