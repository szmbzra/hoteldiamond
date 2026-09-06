import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BedDouble, PartyPopper, Sparkles, Utensils, Waves } from "lucide-react";
import { SERVICES_HEADER } from "@/data/data";
import { getServices } from '@/lib/data';

function getServiceIcon(item: { slug?: string; title?: string }) {
  const key = `${item.slug || ""} ${item.title || ""}`.toLowerCase();
  if (/dining|restaurant|food|cafe|bar/.test(key)) return Utensils;
  if (/event|meeting|conference|hall|banquet|wedding/.test(key)) return PartyPopper;
  if (/pool|swim/.test(key)) return Waves;
  if (/room|suite|stay/.test(key)) return BedDouble;
  return Sparkles;
}

function getFeaturePoints(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
}

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

        {/* Service Rows — full-width, alternating image/content sides */}
        <div className="flex flex-col gap-20 lg:gap-28">
          {services?.map((item: any, idx: number) => {
            const imgSrc = item.gallery_images?.[0]?.src || (Array.isArray(item.img) ? item.img[0] : item.img) || item.image;
            const altText = item.gallery_images?.[0]?.title || item.title || "Service";
            const description = (item.content_0 || item.description || "").replace(/<\/?[^>]+>/g, "").trim();
            const features = getFeaturePoints(description);
            const Icon = getServiceIcon(item);
            // const href = `/service/${item.slug || ''}`;
            const href = "/";
            const reversed = idx % 2 === 1;

            return (
              <div
                key={idx}
                className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10 lg:gap-20 animate-fade-in-up ${idx < services.length - 1 ? 'pb-20 lg:pb-28 border-b' : ''}`}
                style={{ animationDelay: `${0.12 * idx}s`, borderColor: 'var(--luxury-border)' }}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <Link
                    href={href}
                    className="group relative block overflow-hidden shadow-2xl  rounded-2xl shadow-black/10 h-[300px] md:h-[420px] lg:h-[460px]"
                  >
                    {imgSrc && (
                      <Image
                        src={imgSrc}
                        alt={altText}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out"
                      />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="absolute bottom-5 right-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white bg-black/40 border border-white/15 backdrop-blur-md rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      View
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="inline-flex items-center gap-3 mb-5">
                    <span
                      className="flex items-center justify-center w-11 h-11 rounded-full shrink-0"
                      style={{ background: 'var(--luxury-gold)' }}
                    >
                      <Icon className="w-5 h-5" style={{ color: 'var(--luxury-dark)' }} />
                    </span>
                    <span className="luxury-label text-gold-text">
                      {String(idx + 1).padStart(2, '0')} — {item.sub_title}
                    </span>
                  </div>

                  <h3
                    className="luxury-section-title mb-6"
                    style={{ color: 'var(--luxury-charcoal)', fontSize: 'clamp(1.8rem, 3vw, 2.75rem)' }}
                  >
                    {item.title}
                  </h3>

                  {features.length > 0 && (
                    <ul className="space-y-3 mb-8">
                      {features.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: 'var(--luxury-gold)' }}
                          />
                          <span className="text-base leading-relaxed" style={{ color: 'var(--luxury-muted)' }}>
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Link href={href} className="luxury-btn group/btn w-fit">
                    Explore {item.title}
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
