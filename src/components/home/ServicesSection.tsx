import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from "lucide-react";
import { SERVICES_HEADER } from "@/data/data";
import { getServices } from '@/lib/data';

export default async function ServicesSection() {
  const servicesData = (await getServices(2)) || [];
  const services = servicesData[0]?.items || [];
  const header = SERVICES_HEADER;

  if (services.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[140px] bg-gold/10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-48 -right-32 w-[460px] h-[460px] rounded-full blur-[150px] bg-gold/[0.08]"
        aria-hidden="true"
      />

      {/* Faint dot texture behind the header */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(var(--luxury-gold-dim) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 60% 100% at 50% 0%, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 100% at 50% 0%, black 0%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto pt-20 pb-24 px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="luxury-ornament justify-center luxury-label text-gold-text mb-6 animate-fade-in-up">
            {header.label}
          </div>
          <h2 className="luxury-section-title animate-fade-in-up delay-200" style={{ color: 'var(--luxury-charcoal)' }}>
            {header.title}
          </h2>
        </div>

        {/* Service Cards — two equal columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services?.map((item: any, idx: number) => {
            const imgSrc = item.gallery_images?.[0]?.src || (Array.isArray(item.img) ? item.img[0] : item.img) || item.image;
            const altText = item.gallery_images?.[0]?.title || item.title || "Service";
            const description = (item.content_0 || item.description || "").replace(/<\/?[^>]+>/g, "").trim();

            return (
              <Link
                key={idx}
                href={`/service/${item.slug || ''}`}
                className="group relative overflow-hidden rounded-3xl animate-fade-in-up h-[420px] lg:h-[480px]"
                style={{ animationDelay: `${0.12 * idx}s`, background: 'var(--luxury-dark)' }}
              >
                {/* Image */}
                {imgSrc && (
                  <Image
                    src={imgSrc}
                    alt={altText}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                )}

                {/* Legibility scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5 transition-opacity duration-500 group-hover:from-black/95" />

                {/* Corner frame accent */}
                <span className="absolute top-5 left-5 w-7 h-7 border-t border-l border-white/0 group-hover:border-white/40 transition-all duration-500" aria-hidden="true" />
                <span className="absolute bottom-5 right-5 w-7 h-7 border-b border-r border-white/0 group-hover:border-white/40 transition-all duration-500" aria-hidden="true" />

                {/* Giant faint numeral */}
                <div
                  className="absolute top-4 right-6 leading-none select-none text-white/15 font-light text-7xl lg:text-8xl"
                  style={{ fontFamily: 'var(--font-cinzel), Georgia, serif' }}
                  aria-hidden="true"
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-7 lg:p-9">
                  <div className="w-10 h-px mb-4 transition-all duration-500 group-hover:w-16" style={{ background: 'var(--luxury-gold)' }}></div>

                  <h3
                    className="text-white font-light tracking-wide mb-1.5 text-2xl lg:text-3xl"
                    style={{ fontFamily: 'var(--font-cinzel), Georgia, serif' }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-sm font-light leading-relaxed text-white/70 line-clamp-2 lg:line-clamp-3 mt-2 mb-5 max-w-md">
                    {description}
                  </p>

                  <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gold">
                    Explore
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
