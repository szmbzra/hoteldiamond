"use client";

import {
  ChevronRight,
  Phone,
} from "lucide-react";
import ImageSlider from "@/components/ui/ImageSlider";
import AmenitiesGrid from "@/components/package/sections/AmenitiesGrid";
import { formatCurrencyAmount } from "@/lib/format";
import { site } from "@/config/site";

interface RestaurantData {
  title?: string;
  sub_title?: string;
  description?: string;
  gallery_images?: string[];
  amenities?: any[];
  content_0?: string;
  content_1?: string;
  breakfast?: string | number;
  lunch?: string | number;
  dinner?: string | number;
  currency?: string;
}

export default function RestaurantPage({
  pkg,
  phone,
}: {
  pkg: RestaurantData;
  phone: string;
}) {
  const {
    title,
    sub_title,
    description,
    gallery_images = [],
    amenities = [],
    content_0,
    content_1,
    breakfast,
    lunch,
    dinner,
    currency,
  } = pkg;

  const mealRates = [
    { label: "Breakfast", value: formatCurrencyAmount(breakfast, currency) },
    { label: "Lunch", value: formatCurrencyAmount(lunch, currency) },
    { label: "Dinner", value: formatCurrencyAmount(dinner, currency) },
  ].filter((rate): rate is { label: string; value: string } => rate.value !== null);

  return (
    <div style={{ background: "var(--luxury-ivory)" }}>
      {/* Full-screen hero slider */}
      <section className="relative h-screen w-full overflow-hidden">
        <ImageSlider images={gallery_images} title={title} fullHeight />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-24 pb-12">
          <p
            className="luxury-label mb-2"
            style={{ color: "var(--luxury-gold)" }}
          >
            Dining
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-white tracking-wide">
            {title ?? "Our Restaurant"}
          </h1>
          <nav className="flex items-center gap-2 text-sm text-white/60 mt-3">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "var(--luxury-gold)" }}>
              {title ?? "Restaurant"}
            </span>
          </nav>
        </div>
      </section>

      {/* About + description */}
      <section className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="luxury-label text-gold-text mb-4">Dining</div>
          <div className="flex justify-center mb-8">
            <div className="luxury-divider" />
          </div>
          <h2
            className="luxury-section-title mb-8"
            style={{ color: "var(--luxury-charcoal)" }}
          >
            {title ?? "Our Restaurant"}
          </h2>
          {sub_title && (
            <p
              className="text-xl md:text-2xl font-light leading-relaxed mb-8"
              style={{ color: "var(--luxury-charcoal)" }}
            >
              {sub_title}
            </p>
          )}
          {description ? (
            <div
              className="cms-content luxury-subtitle text-center"
              style={{ color: "var(--luxury-muted)" }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p
              className="luxury-subtitle"
              style={{ color: "var(--luxury-muted)" }}
            >
              Discover a dining experience crafted by {site.shortName}.
            </p>
          )}
        </div>
      </section>

      {/* ── MEAL RATES ───────────────────────────────────────────── */}
      {mealRates.length > 0 && (
        <section style={{ background: "var(--luxury-cream)" }}>
          <div className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
            <div className="text-center mb-12">
              <h3
                className="luxury-section-title"
                style={{ color: "var(--luxury-charcoal)" }}
              >
                Meal Rates
              </h3>
              <div className="flex justify-center mt-4">
                <div className="luxury-divider" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {mealRates.map(({ label, value }) => (
                <div
                  key={label}
                  className="text-center p-8 rounded-2xl bg-white"
                  style={{ border: "1px solid var(--luxury-border)" }}
                >
                  <p
                    className="luxury-label mb-3"
                    style={{ color: "var(--luxury-gold-text)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-2xl font-light"
                    style={{ color: "var(--luxury-charcoal)" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--luxury-muted)" }}
                  >
                    per person
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <AmenitiesGrid amenities={amenities} />

      {/* ── RESTAURANT POLICIES & ADDITIONAL CONTENT ────────────────────── */}
      {(content_0 || content_1) && (
        <section
          className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24"
        >
          {content_0 && (
            <div
              dangerouslySetInnerHTML={{ __html: content_0 }}
            />
          )}
          {content_1 && <div dangerouslySetInnerHTML={{ __html: content_1 }} />}
        </section>
      )}

      {/* Reservation CTA */}
      <section style={{ background: "var(--luxury-cream)" }} className="py-20">
        <div className="max-w-[1400px] mx-auto text-center px-6 md:px-12 lg:px-24">
          <div className="luxury-label text-gold-text mb-4">
            Reserve a Table
          </div>
          <div className="flex justify-center mb-8">
            <div className="luxury-divider" />
          </div>
          <h2
            className="luxury-section-title mb-6"
            style={{ color: "var(--luxury-charcoal)" }}
          >
            We&apos;d Love to Host You
          </h2>
          <p
            className="luxury-subtitle max-w-xl mx-auto mb-10"
            style={{ color: "var(--luxury-muted)" }}
          >
            Book a table and let us prepare a dining experience worth
            returning for.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 text-xs tracking-widest uppercase transition-all duration-300"
              style={{
                background: "var(--luxury-dark)",
                color: "var(--luxury-gold)",
                border: "1px solid var(--luxury-dark)",
              }}
            >
              <Phone className="w-4 h-4" />
              Call to Reserve
            </a>
            <a
              href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 text-xs tracking-widest uppercase transition-all duration-300"
              style={{
                background: "var(--luxury-gold)",
                color: "var(--luxury-dark)",
              }}
            >
              <i className="fa-brands fa-whatsapp text-xl" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
