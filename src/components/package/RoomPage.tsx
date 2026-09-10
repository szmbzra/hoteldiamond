"use client";

import { Check, X, Phone } from "lucide-react";
import FaqAccordion from "@/components/faq/FaqAccordion";
import ImageSlider from "@/components/ui/ImageSlider";
import AmenitiesGrid from "./sections/AmenitiesGrid";
import RoomBookingCard from "./sections/RoomBookingCard";
import { contact } from "@/config/site";
import { normalizeFaqs } from "@/lib/faq";
import { ROOM_AMENITIES_FALLBACK } from "@/data/data";
import { DecorativeGlow, DecorativeAccent } from "@/components/ui/DecorativeBlobs";

export default function RoomPage({ pkg }: { pkg: any }) {
  if (!pkg) return null;

  const {
    title,
    sub_title,
    gallery_images = [],
    description,
    content_0,
    content_1,
    amenities: cmsAmenities = [],
    includes = [],
    excludes = [],
    faq = [],
    faq_schema = [],
    book_url,
    price,
    currency,
    occupancy,
    rooms_Size,
  } = pkg;

  const tourUrl = pkg.tour_url as string | undefined;
  const faqs = normalizeFaqs(faq, faq_schema);
  const amenities = cmsAmenities.length > 0 ? cmsAmenities : ROOM_AMENITIES_FALLBACK;

  return (
    <div style={{ background: "var(--luxury-ivory)" }}>
      {/* ── OVERVIEW + BOOKING ───────────────────────────────────── */}
      <section className="relative max-w-[1400px] mx-auto pt-14 pb-20 px-6 md:px-12 lg:px-24">
        <DecorativeAccent color="gold" corner="top-left" size={420} />
        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="order-first lg:order-last lg:col-span-1">
            <div className="lg:sticky lg:top-28">
              <RoomBookingCard
                price={price}
                currency={currency}
                occupancy={occupancy}
                roomSize={rooms_Size}
                bookUrl={book_url}
              />
            </div>
          </div>

          <div className="order-last lg:order-first lg:col-span-2">
            {gallery_images.length > 0 && (
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10 mb-10">
                <ImageSlider images={gallery_images} title={title} overlayClassName="bg-black/0" showArrows />
              </div>
            )}

            <h1
              className="luxury-section-title mb-6"
              style={{ color: "var(--luxury-charcoal)" }}
            >
              {title}
            </h1>
            <div className="luxury-divider mb-8" />
            {sub_title && (
              <p
                className="text-xl md:text-2xl font-light leading-relaxed mb-8"
                style={{ color: "var(--luxury-charcoal)" }}
              >
                {sub_title}
              </p>
            )}
            {description && (
              <div
                className="cms-content luxury-subtitle"
                style={{ color: "var(--luxury-muted)" }}
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>
        </div>
      </section>

      <AmenitiesGrid amenities={amenities} />

      {/* ── VIRTUAL TOUR ─────────────────────────────────────────── */}
      {tourUrl && (
        <section style={{ background: "var(--luxury-cream)" }}>
          <div className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
            <h3
              className="text-2xl font-light tracking-wide uppercase mb-2"
              style={{ color: "var(--luxury-charcoal)" }}
            >
              Virtual Tour
            </h3>
            <div
              className="w-12 h-px mb-8"
              style={{ background: "var(--luxury-gold)" }}
            />
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{ paddingTop: "56.25%" }}
            >
              <iframe
                src={tourUrl}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
                loading="lazy"
                title={`${title} – Virtual Tour`}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── INCLUDES / EXCLUDES ──────────────────────────────────── */}
      {(includes.length > 0 || excludes.length > 0) && (
        <section
          className="relative overflow-hidden max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24"
        >
          <DecorativeGlow variant="gold-dark" />
          <div className="relative">
          <h3
            className="text-2xl font-light tracking-wide uppercase mb-2"
            style={{ color: "var(--luxury-charcoal)" }}
          >
            What&apos;s Included
          </h3>
          <div
            className="w-12 h-px mb-10"
            style={{ background: "var(--luxury-gold)" }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {includes.length > 0 && (
              <div
                className="rounded-2xl p-8"
                style={{
                  background: "var(--luxury-cream)",
                  border: "1px solid var(--luxury-border)",
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] mb-6 text-gold-text">
                  Included
                </p>
                <ul className="space-y-3">
                  {includes.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: "var(--luxury-charcoal)" }}
                    >
                      <Check
                        className="w-4 h-4 shrink-0"
                        style={{ color: "var(--luxury-gold)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {excludes.length > 0 && (
              <div
                className="rounded-2xl p-8"
                style={{
                  background: "var(--luxury-cream)",
                  border: "1px solid var(--luxury-border)",
                }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.2em] mb-6"
                  style={{ color: "var(--luxury-muted)" }}
                >
                  Not Included
                </p>
                <ul className="space-y-3">
                  {excludes.map((item: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: "var(--luxury-muted)" }}
                    >
                      <X className="w-4 h-4 shrink-0 opacity-40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          </div>
        </section>
      )}

      {/* ── ROOM POLICIES & ADDITIONAL CONTENT ────────────────────── */}
      {(content_0 || content_1) && (
      <section className="max-w-[1400px] mx-auto mb-8 py-20 px-6 md:px-12 lg:px-24" style={{ background: "var(--luxury-cream)" }}>
        {content_0 && (
          <div
            dangerouslySetInnerHTML={{ __html: content_0 }}
          />
        )}
        {content_1 && <div dangerouslySetInnerHTML={{ __html: content_1 }} />}
      </section>
      )}

      {/* ── FAQS ─────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section
          className="relative overflow-hidden max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24"
        >
          <DecorativeGlow variant="dark-gold" />
          <div className="relative max-w-3xl mx-auto">
            <h3
              className="text-2xl font-light tracking-wide uppercase mb-2"
              style={{ color: "var(--luxury-charcoal)" }}
            >
              Frequently Asked Questions
            </h3>
            <div
              className="w-12 h-px mb-10"
              style={{ background: "var(--luxury-gold)" }}
            />
            <FaqAccordion items={faqs} />
          </div>
        </section>
      )}

      {/* ── CLOSING CTA ──────────────────────────────────────────── */}
      <section
        className="relative min-h-[420px] flex items-center py-20 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url(/bgimg.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-24 text-center text-white">
          <p className="luxury-label mb-4" style={{ color: "var(--luxury-gold)" }}>
            Reserve Your Stay
          </p>
          <p className="text-2xl md:text-3xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
            Speak with our reservations team to secure the {title}.
          </p>
          <a
            href={`tel:${contact.phoneE164}`}
            className="inline-flex items-center gap-6 group"
          >
            <span
              className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center transition-all group-hover:border-[var(--luxury-gold)]"
              style={{ color: "var(--luxury-gold)" }}
            >
              <Phone size={22} />
            </span>
            <span className="text-left">
              <span className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-1">
                Call to Reserve
              </span>
              <span className="block text-2xl md:text-3xl font-light tracking-wider hover:opacity-80 transition-opacity">
                {contact.phone}
              </span>
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
