import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { OFFERS_HEADER } from "@/data/data";
import { getOffers } from "@/lib/data";

export default async function OfferSection() {
  const header = OFFERS_HEADER;
  const data = await getOffers();
  const allOffers: any[] = Array.isArray(data) ? data : Object.values(data || {});
  const offers = allOffers.slice(0, 3);

  if (offers.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 animate-fade-in-up">
          <div>
            <div className="luxury-label text-gold-text mb-4">{header.label}</div>
            <div className="luxury-divider mb-6"></div>
            <h2 className="luxury-section-title" style={{ color: "var(--luxury-charcoal)" }}>
              {header.title}
            </h2>
          </div>

          <Link
            href="/offers"
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-text hover:opacity-70 transition-opacity group shrink-0"
          >
            View All Offers
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((item: any, idx: number) => {
            const imageSrc = item.image || (item.img && item.img[0]);
            const plainTitle = item.title?.replace(/<[^>]+>/g, "") || "";

            return (
              <Link
                key={item.id ?? idx}
                href={`/offers/${item.slug}`}
                className="group relative flex flex-col overflow-hidden bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-xl transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={plainTitle || "Offer image"}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#f9f7f2] flex items-center justify-center">
                      <span className="text-6xl text-gold opacity-30 font-light">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500" />

                  {/* Expiry date — top */}
                  {item.end_date && (
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wide bg-white/95 text-gold-text">
                      <CalendarDays className="w-3.5 h-3.5" />
                      Expires {item.end_date}
                    </div>
                  )}
                </div>

                {/* Offer name — bottom */}
                <div className="p-6 flex-grow flex flex-col justify-between bg-white">
                  <h3
                    className="text-lg md:text-xl font-light tracking-wide line-clamp-2 mb-4"
                    style={{ color: "var(--luxury-charcoal)" }}
                    dangerouslySetInnerHTML={{ __html: item.title || "" }}
                  />
                  <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gold-text w-fit">
                    View Details
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link href="/offers" className="luxury-btn group flex items-center gap-4 px-12 py-5">
            <span>View All Offers</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Bottom gold accent */}
      <div
        className="h-px"
        style={{ background: "linear-gradient(to right, transparent, var(--luxury-gold), transparent)" }}
      ></div>
    </section>
  );
}
