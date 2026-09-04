import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { getDealOfTheDay, getSiteRegulars } from "@/lib/data";
import DealEnquiryForm from "@/components/deal/DealEnquiryForm";
import Image from "next/image";
import Link from "next/link";

// The daily deal is ephemeral and not meant to be indexed or crawled.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function DealOfTheDayPage() {
  const [deal, siteRegulars] = await Promise.all([
    getDealOfTheDay(),
    getSiteRegulars(),
  ]);

  const formattedDate = deal?.dod_date
    ? new Date(deal.dod_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const isWhatsapp = deal?.type === "2";
  const whatsappUrl = `https://wa.me/${(deal?.whatsapp ?? "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    deal?.whatsapp_message || `Hi, I'm interested in today's deal: ${deal?.title ?? ""}`
  )}`;

  const actionLink = isWhatsapp ? whatsappUrl : "#enquiry-form";

  return (
    <>
      <div className="max-w-[1400px] mx-auto py-12 md:py-20 px-4 md:px-12 lg:px-24">
        {!deal ? (
          <p
            className="luxury-subtitle text-center"
            style={{ color: "var(--luxury-muted)" }}
          >
            No deal is live right now — check back soon.
          </p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-center max-w-5xl mx-auto">
            {deal.image && (
              <div className="w-full lg:w-1/2 flex flex-col items-center">
                <Link
                  href={actionLink}
                  target={isWhatsapp ? "_blank" : "_self"}
                  rel={isWhatsapp ? "noreferrer" : undefined}
                  className="relative w-full luxury-img-zoom overflow-hidden rounded-xl block shadow-lg cursor-pointer"
                >
                  <Image
                    src={deal.image}
                    alt={deal.title ?? "Deal of the Day"}
                    width={700}
                    height={520}
                    className="w-full h-auto object-cover"
                  />
                  {/* Overlay prompt on mobile */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs tracking-wider uppercase flex items-center gap-2 md:hidden">
                    {isWhatsapp ? <MessageCircle className="w-3 h-3" /> : null}
                    Tap image to enquire
                  </div>
                </Link>
                <p className="hidden md:block text-xs uppercase tracking-widest text-gray-400 mt-4">
                  Click image to enquire
                </p>
              </div>
            )}

            <div className="w-full lg:w-1/2 text-center lg:text-left" id="enquiry-form">
              <div className="luxury-label text-gold-text mb-3 md:mb-4">
                Today&apos;s Exclusive
              </div>
              <div className="luxury-divider mb-6 md:mb-8 mx-auto lg:mx-0" />
              <h1
                className="text-3xl md:text-5xl font-light mb-4 md:mb-6 leading-tight"
                style={{ color: "var(--luxury-charcoal)" }}
              >
                {deal.title}
              </h1>
              {formattedDate && (
                <p
                  className="luxury-subtitle mb-8 md:mb-10 text-sm md:text-base"
                  style={{ color: "var(--luxury-muted)" }}
                >
                  Valid {formattedDate}
                </p>
              )}

              {isWhatsapp ? (
                <Link
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-full md:w-auto gap-3 px-8 md:px-10 py-4 text-xs tracking-widest uppercase transition-all duration-300 bg-gold text-luxury-dark hover:bg-gold-dim rounded-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enquire via WhatsApp
                </Link>
              ) : (
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-light mb-6 text-left" style={{ color: "var(--luxury-charcoal)" }}>Send an Enquiry</h3>
                  <DealEnquiryForm dealTitle={deal.title} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
