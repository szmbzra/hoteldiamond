"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { BreadcrumbNoBanner } from "@/components/ui/Breadcrumb";
import { DecorativeGlow, DecorativeAccent } from "@/components/ui/MandalaMotif";
import placeholderAbout from "@/assets/images/placeholder-about.webp";
import { links } from "@/config/site";

const PILLARS: Array<{
  icon: string;
  title: string | string[];
  desc: string;
}> = [
  {
    icon: "📍",
    title: ["Prime", "Location"],
    desc: "Just a short walk from the sacred Bageshwori Temple, and close to Banke National Park the perfect base for culture and nature alike.",
  },
  {
    icon: "🏊",
    title: "Complete Comfort",
    desc: "From our swimming pool and gym to sauna and steam facilities, every stay comes with everything you need to relax and unwind.",
  },
  {
    icon: "🍽️",
    title: "Personalised Service",
    desc: "From warm welcomes to attentive room service, every detail is thoughtfully handled for a smooth and memorable stay.",
  },
  {
    icon: "🤝",
    title: "Nepali Hospitality",
    desc: "Rooted in genuine Nepali warmth and tradition, our team is dedicated to making every guest feel truly at home and welcomed.",
  },
];

interface AboutData {
  title?: string;
  subtitle?: string;
  content?: string;
  gallery_images?: { id: number; src: string; title?: string }[];
  phoneLabel?: string;
}

export default function AboutPage({
  data,
  phone,
}: {
  data: AboutData | null;
  phone: string;
}) {
  const storyImageUrl = data?.gallery_images?.[0]?.src;
  const storyImageAlt =
    data?.gallery_images?.[0]?.title || data?.title || "Hotel Diamond Palace";
  const telHref = phone ? `tel:${phone.replace(/\s+/g, "")}` : undefined;

  return (
    <div style={{ background: "var(--luxury-ivory)" }}>
      {/* Title */}

      {/* Our Story */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--luxury-ivory)" }}
      >
        <DecorativeGlow variant="gold-dark" />
        {data?.content ? (
          // CMS `article_all` (slug "about-us") ships this already fully
          // composed — image, label, headline, copy, highlights and CTA —
          // styled with our own luxury-* classes, so render it as-is.
          <div
            className="relative"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        ) : (
          <div className="relative max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
            <div className="flex flex-col lg:flex-row gap-16 xl:gap-20 items-center">
              {/* Image */}
              <div className="w-full lg:w-1/2 relative animate-slide-in-left">
                <div className="relative z-10 overflow-hidden luxury-img-zoom">
                  {storyImageUrl ? (
                    <Image
                      src={storyImageUrl}
                      alt={storyImageAlt}
                      width={700}
                      height={520}
                      className="w-full h-auto object-cover"
                    />
                  ) : (
                    <Image
                      src={placeholderAbout}
                      alt={storyImageAlt}
                      className="w-full h-auto object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Text */}
              <div className="w-full lg:w-1/2 animate-slide-in-right">
                <div className="luxury-label text-gold-text mb-4">
                  Our Story
                </div>
                <div className="luxury-divider mb-8"></div>
                <h2
                  className="luxury-section-title mb-8"
                  style={{ color: "var(--luxury-charcoal)" }}
                >
                  {data?.subtitle ||
                    "Timeless Hospitality in the Heart of Manakamana"}
                </h2>

                <p
                  className="luxury-subtitle mb-10"
                  style={{ color: "var(--luxury-muted)" }}
                >
                  Perched above the sacred hills of Manakamana, Hotel Diamond
                  Palace pairs panoramic Himalayan views with warm Nepali
                  hospitality. Every stay is shaped around genuine comfort —
                  spacious rooms, thoughtful service, and a setting that feels
                  worlds away from the everyday, while remaining just a
                  cable-car ride from home.
                </p>

                <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
                  <Link
                    href={links.booking}
                    target="_blank"
                    className="luxury-btn bg-(--color-blue)"
                  >
                    Book Your Stay
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {phone && (
                    <a href={telHref} className="flex items-center gap-3 group">
                      <span
                        className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-(--luxury-gold)"
                        style={{ border: "1px solid var(--luxury-gold)" }}
                      >
                        <Phone
                          className="w-4 h-4"
                          style={{ color: "var(--luxury-gold-text)" }}
                        />
                      </span>
                      <span className="flex flex-col leading-tight">
                        <span className="text-[11px] uppercase tracking-widest text-(--luxury-muted)">
                          {data?.phoneLabel || "Call Us"}
                        </span>
                        <span
                          className="text-sm tracking-wide"
                          style={{ color: "var(--luxury-charcoal)" }}
                        >
                          {phone}
                        </span>
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Pillars */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--luxury-cream)" }}
      >
        <DecorativeGlow variant="dark-gold" />
        <div className="relative max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <div className="luxury-label text-gold-text mb-4 flex justify-center">
              What Sets Us Apart
            </div>
            <div className="luxury-divider mb-8 mx-auto"></div>
            <h2
              className="luxury-section-title"
              style={{ color: "var(--luxury-charcoal)" }}
            >
              The Diamond Palace Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="luxury-card-hover bg-white flex flex-col items-center text-center px-6 py-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] animate-fade-in-up h-full"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div
                  className="mb-6 w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                  style={{
                    border: "1px solid var(--luxury-gold)",
                    color: "var(--luxury-gold-text)",
                  }}
                >
                  {typeof Icon === "string" ? (
                    <span
                      aria-label={
                        typeof title === "string" ? title : "pillar icon"
                      }
                    >
                      {Icon}
                    </span>
                  ) : null}
                </div>
                <h3
                  className="luxury-label text-[15px] tracking-wide mb-3 leading-snug"
                  style={{ color: "var(--luxury-charcoal)" }}
                >
                  {Array.isArray(title)
                    ? title.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))
                    : title}
                </h3>
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ color: "var(--luxury-muted)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--luxury-dark)" }}
      >
        <DecorativeAccent color="gold" corner="top-right" size={260} />
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3
              className="luxury-section-title text-white mb-3"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
            >
              Experience Hotel Diamond Palace
            </h3>
            <p className="luxury-subtitle text-white/60 max-w-xl">
              Reserve your stay and let us take care of the rest — comfort,
              hospitality, and everything in between.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <Link
              href={links.booking}
              target="_blank"
              className="luxury-btn luxury-btn-solid"
            >
              Book Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
