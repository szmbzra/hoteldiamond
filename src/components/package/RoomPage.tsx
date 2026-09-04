"use client";

import { Check, X, Phone } from "lucide-react";
import BookingWidget from "@/components/ui/BookingWidget";
import FaqAccordion from "@/components/faq/FaqAccordion";
import PackageHero from "./sections/PackageHero";
import PackageIntro from "./sections/PackageIntro";
import AmenitiesGrid from "./sections/AmenitiesGrid";
import { contact } from "@/config/site";

export default function RoomPage({ pkg }: { pkg: any }) {
  if (!pkg) return null;

  const {
    title,
    gallery_images = [],
    description,
    content_0,
    content_1,
    amenities = [],
    includes = [],
    excludes = [],
    faq = [],
    faq_schema = [],
    book_url,
  } = pkg;

  const tourUrl = pkg.tour_url as string | undefined;

  // Safely parse FAQs in case they are stringified JSON
  const parseFaqs = (data: any) => {
    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch {
        return [];
      }
    }
    return Array.isArray(data) ? data : [];
  };

  const parsedFaq = parseFaqs(faq);
  const parsedFaqSchema = parseFaqs(faq_schema);
  const rawFaqs = parsedFaq.length > 0 ? parsedFaq : parsedFaqSchema;

  const faqs = rawFaqs.map((f: any) => ({
    question: f.q ?? f.question ?? "",
    answer: f.a ?? f.answer ?? "",
  }));

  return (
    <div style={{ background: "var(--luxury-ivory)" }}>
      <PackageHero
        title={title}
        images={gallery_images}
        label="Accommodation"
        breadcrumbHref="/rooms"
        breadcrumbLabel="Rooms"
      />

      <PackageIntro
        label="Accommodation"
        title={title}
        description={description}
      />

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
          className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24"
        >
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
        </section>
      )}

      {/* ── ROOM POLICIES & ADDITIONAL CONTENT ────────────────────── */}
      <section className="max-w-[1400px] mx-auto mb-8 py-20 px-6 md:px-12 lg:px-24" style={{ background: "var(--luxury-cream)" }}>
        {content_0 && (
          <div
            dangerouslySetInnerHTML={{ __html: content_0 }}
          />
        )}
        {content_1 && <div dangerouslySetInnerHTML={{ __html: content_1 }} />}
        {/* <div
          className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24"
        >
          <h3 className="text-2xl font-light tracking-wide uppercase mb-2" style={{ color: "var(--luxury-charcoal)" }}>
            Room Policies
          </h3>
          <div className="w-12 h-px mb-10" style={{ background: "var(--luxury-gold)" }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROOM_POLICIES.map((policy, i) => (
              <div
                key={i}
                className="p-6 rounded-xl"
                style={{ background: "var(--luxury-ivory)", border: "1px solid var(--luxury-border)" }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] mb-2 text-gold-text">
                  {policy.label}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--luxury-charcoal)" }}>
                  {policy.value}
                </p>
              </div>
            ))}
          </div>
        </div> */}
      </section>

      {/* ── FAQS ─────────────────────────────────────────────────── */}
      {faqs.length > 0 && (
        <section
          className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24"
        >
          <div className="max-w-3xl mx-auto">
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

      {/* ── BOOKING CTA ──────────────────────────────────────────── */}
      <section
        className="relative min-h-[600px] flex items-center py-20 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url(/bgimg.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div
          className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-8">
              <p
                className="luxury-label"
                style={{ color: "var(--luxury-gold)" }}
              >
                Reserve Your Stay
              </p>
              <p className="text-2xl md:text-3xl font-light leading-relaxed max-w-xl">
                Each room features a private bath, Wi-Fi, LED television and
                complimentary full breakfast.
              </p>
              <div className="flex items-center gap-6 group">
                <div
                  className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center transition-all group-hover:border-[var(--luxury-gold)]"
                  style={{ color: "var(--luxury-gold)" }}
                >
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">
                    Call to Reserve
                  </p>
                  <a
                    href={`tel:${contact.phoneE164}`}
                    className="text-2xl md:text-3xl font-light tracking-wider hover:opacity-80 transition-opacity"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div
                className="p-10 md:p-14 w-full max-w-[500px] shadow-2xl"
                style={{ background: "var(--luxury-cream)" }}
              >
                <BookingWidget bookUrl={book_url} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
