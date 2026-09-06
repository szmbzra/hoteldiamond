"use client";

import Image from "next/image";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Award,
  Users,
  Mountain,
  Leaf,
} from "lucide-react";
import { contact, address } from "@/config/site";

const PILLARS = [
  {
    icon: Mountain,
    title: "Panoramic Views",
    desc: "Every room and dining space frames the majestic Himalayan horizon — a living canvas that changes with every season.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "We operate with deep respect for the natural environment and the sacred cultural heritage of Manakamana.",
  },
  {
    icon: Award,
    title: "Personalised Service",
    desc: "From free cable car transfers to complimentary breakfast, every detail is curated for a seamless stay.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "We proudly employ and empower local talent, keeping the warmth of Nepali hospitality at the heart of everything we do.",
  },
];

const STATS = [
  { value: "50+", label: "Luxury Rooms" },
  { value: "4.8★", label: "Guest Rating" },
  { value: "360°", label: "Himalayan View" },
  { value: "24/7", label: "Guest Support" },
];

interface AboutData {
  title?: string;
  subtitle?: string;
  description?: string;
  imglink?: { id: string; url: string; alt: string }[];
  phoneLabel?: string;
}

export default function AboutPage({
  data,
  phone,
}: {
  data: AboutData | null;
  phone: string;
}) {
  return (
    <div style={{ background: "var(--luxury-ivory)" }}>
      {/* Hero */}
      <div
        className="relative h-72 md:h-96 flex items-end"
        style={{
          backgroundImage: data?.imglink?.[0]?.url
            ? `url(${data.imglink[0].url})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          background: data?.imglink?.[0]?.url
            ? undefined
            : "var(--luxury-dark)",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div
          className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-24 pb-10"
        >
          <h1 className="text-3xl md:text-5xl font-light text-white tracking-wide mb-3">
            About Us
          </h1>
          <nav className="flex items-center gap-2 text-sm text-white/60">
            <a href="/" className="hover:text-white transition-colors">
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5" />
            <span style={{ color: "var(--luxury-gold)" }}>About Us</span>
          </nav>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: "var(--luxury-dark)" }} className="py-8">
        <div
          className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-12 lg:px-24"
        >
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <div
                className="text-3xl md:text-4xl font-light mb-1"
                style={{ color: "var(--luxury-gold)" }}
              >
                {s.value}
              </div>
              <p className="text-white/40 text-xs tracking-widest uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <section className="max-w-[1400px] mx-auto py-20">
        <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-center">
          {/* Images */}
          {data?.imglink && data.imglink.length > 0 && (
            <div className="w-full lg:w-1/2 relative">
              <div
                className="absolute -top-4 -left-4 w-full h-full hidden lg:block"
                style={{ border: "1px solid var(--luxury-gold)", opacity: 0.3 }}
              />
              <div className="relative z-10 overflow-hidden">
                <Image
                  src={data.imglink[0].url}
                  alt={data.imglink[0].alt || "About Manakamana Hillcrest"}
                  width={700}
                  height={520}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}

          {/* Text */}
          <div className="w-full lg:w-1/2">
            <div className="luxury-label text-gold-text mb-4">
              {data?.title ?? "Hotel Diamond Pvt. Ltd"}
            </div>
            <div className="luxury-divider mb-8" />
            <h2
              className="luxury-section-title mb-8"
              style={{ color: "var(--luxury-charcoal)" }}
            >
              {data?.subtitle ?? "A Sanctuary in the Himalayas"}
            </h2>
            {data?.description ? (
              <div
                className="luxury-subtitle mb-8"
                style={{ color: "var(--luxury-muted)" }}
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
            ) : (
              <p
                className="luxury-subtitle mb-8"
                style={{ color: "var(--luxury-muted)" }}
              >
Welcome to Hotel Diamond Palace Pvt. Ltd, a premier destination in the heart of Nepalgunj. We combine modern luxury with warm Nepalese hospitality, offering guests an unforgettable stay whether they are here for business, leisure, or celebration.

Our property features 95 elegantly designed rooms, versatile event facilities, and exceptional dining outlets that showcase both authentic Nepalese flavours and international cuisine. With amenities like a swimming pool, fitness center, spa, and 24‑hour front desk, we ensure comfort and convenience at every step.
              </p>
            )}

            {/* Phone CTA */}
            <div
              className="flex items-center gap-5 pt-8"
              style={{ borderTop: "1px solid var(--luxury-border)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                style={{
                  border: "1px solid var(--luxury-gold)",
                  color: "var(--luxury-gold)",
                }}
              >
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p
                  className="luxury-label mb-1"
                  style={{ color: "var(--luxury-muted)" }}
                >
                  {data?.phoneLabel ?? "Reserve Now"}
                </p>
                <a
                  href={`tel:${phone}`}
                  className="text-xl font-light transition-colors hover:opacity-70"
                  style={{ color: "var(--luxury-charcoal)" }}
                >
                  {phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Pillars */}
      <section style={{ background: "var(--luxury-cream)" }}>
        <div
          className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24"
        >
          <div className="text-center mb-16">
            <div className="luxury-label text-gold-text mb-4">
              What Defines Us
            </div>
            <div className="flex justify-center mb-8">
              <div className="luxury-divider" />
            </div>
            <h2
              className="luxury-section-title"
              style={{ color: "var(--luxury-charcoal)" }}
            >
              Our Core Pillars
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PILLARS.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                className="group text-center p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "var(--luxury-ivory)",
                  border: "1px solid var(--luxury-border)",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300"
                  style={{
                    border: "1px solid var(--luxury-gold)",
                    color: "var(--luxury-gold)",
                  }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3
                  className="text-base font-medium mb-4 tracking-wide"
                  style={{ color: "var(--luxury-charcoal)" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--luxury-muted)" }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section style={{ background: "var(--luxury-dark)" }} className="py-16">
        <div
          className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-6 md:px-12 lg:px-24"
        >
          {[
            {
              icon: Phone,
              label: "Call Us",
              value: phone || contact.phone,
              href: `tel:${phone || contact.phoneE164}`,
            },
            {
              icon: Mail,
              label: "Email Us",
              value: contact.email,
              href: `mailto:${contact.email}`,
            },
            {
              icon: MapPin,
              label: "Find Us",
              value: address.full,
              href: address.mapUrl,
            },
          ].map(({ icon: Icon, label, value, href }, i) => (
            <a
              key={i}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              className="flex flex-col items-center gap-3 group"
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-[var(--luxury-gold)]"
                style={{
                  border: "1px solid var(--luxury-gold)",
                  color: "var(--luxury-gold)",
                }}
              >
                <Icon className="w-5 h-5 group-hover:text-[var(--luxury-dark)] transition-colors" />
              </div>
              <p className="text-white/40 text-xs tracking-widest uppercase">
                {label}
              </p>
              <p className="text-white/80 text-sm">{value}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
