"use client";

import {
  ChevronRight,
  Phone,
  Clock,
  Waves,
  Dumbbell,
  Flame,
} from "lucide-react";
import ImageSlider from "@/components/ui/ImageSlider";

const SERVICE_ICON_MAP: Record<string, React.ElementType> = {
  "aila-bar": Waves,
  "outdoor-swimming-pool": Waves,
  "sauna-steam": Flame,
  "fitness-center": Dumbbell,
};

interface ServiceData {
  title?: string;
  description?: string;
  gallery_images?: string[];
  amenities?: any[];
  slug?: string;
}

export default function ServicePage({
  pkg,
  phone,
}: {
  pkg: ServiceData;
  phone: string;
}) {
  const {
    title,
    description,
    gallery_images = [],
    amenities = [],
    slug = "",
  } = pkg;

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
            Services
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-white tracking-wide">
            {title ?? "Our Services"}
          </h1>
          <nav className="flex items-center gap-2 text-sm text-white/60 mt-3">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "var(--luxury-gold)" }}>
              {title ?? "Service"}
            </span>
          </nav>
        </div>
      </section>

      {/* About section */}
      <section className="max-w-[1400px] mx-auto py-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="luxury-label text-gold-text mb-4">
            Manakamana Hillcrest
          </div>
          <div className="flex justify-center mb-8">
            <div className="luxury-divider" />
          </div>
          <h2
            className="luxury-section-title mb-8"
            style={{ color: "var(--luxury-charcoal)" }}
          >
            {title}
          </h2>
          {description ? (
            <div
              className="luxury-subtitle"
              style={{ color: "var(--luxury-muted)" }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p
              className="luxury-subtitle"
              style={{ color: "var(--luxury-muted)" }}
            >
              Discover one of our signature facilities at Manakamana Hillcrest
              Resort — where every amenity is designed to elevate your stay.
            </p>
          )}
        </div>
      </section>

      {/* Features / amenities from CMS */}
      {amenities.length > 0 && (
        <section style={{ background: "var(--luxury-cream)" }}>
          <div className="max-w-[1400px] mx-auto py-20">
            <div className="text-center mb-12">
              <h2
                className="luxury-section-title"
                style={{ color: "var(--luxury-charcoal)" }}
              >
                What&apos;s Available
              </h2>
              <div className="flex justify-center mt-4">
                <div className="luxury-divider" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {amenities.map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white"
                  style={{ border: "1px solid var(--luxury-border)" }}
                >
                  {item.img && (
                    <img
                      src={item.img}
                      alt={item.title || item.name}
                      className="w-8 h-8 object-contain opacity-70 shrink-0"
                    />
                  )}
                  <span
                    className="text-sm font-light"
                    style={{ color: "var(--luxury-charcoal)" }}
                  >
                    {item.title || item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hours + CTA */}
      <section style={{ background: "var(--luxury-dark)" }} className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div>
              <div
                className="luxury-label mb-2"
                style={{ color: "var(--luxury-gold)" }}
              >
                Hours
              </div>
              <div className="flex items-center gap-3 mb-2">
                <Clock
                  className="w-5 h-5"
                  style={{ color: "var(--luxury-gold)" }}
                />
                <span className="text-white text-lg font-light">
                  Open Daily
                </span>
              </div>
              <p className="text-white/40 text-sm">
                Hours may vary by season — please ask at reception.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 px-8 py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:bg-white/5"
                style={{
                  border: "1px solid var(--luxury-gold)",
                  color: "var(--luxury-gold)",
                }}
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <a
                href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 text-xs tracking-widest uppercase transition-all duration-300 hover:opacity-90"
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
        </div>
      </section>
    </div>
  );
}
