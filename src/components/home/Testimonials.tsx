"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote, ExternalLink } from "lucide-react";

interface TestimonialData {
  id: string | number;
  name: string;
  title: string;
  via?: string;
  linksrc?: string;
  rating: number;
  image: string;
  content: string;
}

export default function Testimonials({ testimonials }: { testimonials: TestimonialData[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const syncScrollSnaps = () => setScrollSnaps(emblaApi.scrollSnapList());

    syncScrollSnaps();
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("reInit", syncScrollSnaps);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("reInit", syncScrollSnaps);
    };
  }, [emblaApi]);

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="luxury-label text-gold-text mb-4">
            Guest Experiences
          </div>
          <div className="flex justify-center mb-8">
            <div className="luxury-divider"></div>
          </div>
          <h2 className="luxury-section-title" style={{ color: "var(--luxury-charcoal)" }}>
            What Our Guests Say
          </h2>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -mx-3 md:-mx-4">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="flex-[0_0_100%] sm:flex-[0_0_85%] md:flex-[0_0_50%] min-w-0 px-3 md:px-4"
              >
                <div className="luxury-card-hover h-full flex flex-col bg-white rounded-2xl border border-luxury-border p-8">

                  {/* Author row */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 flex items-center justify-center bg-luxury-dark text-white text-sm font-medium">
                        {t.image ? (
                          // eslint-disable-next-line @next/next/no-img-element -- reviewer avatars come from arbitrary external hosts
                          <img
                            src={t.image}
                            alt=""
                            width={48}
                            height={48}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span>{t.name?.charAt(0)?.toUpperCase()}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h6 className="font-medium text-base truncate" style={{ color: "var(--luxury-charcoal)" }}>
                            {t.name}
                          </h6>
                          {t.linksrc && (
                            <a
                              href={t.linksrc}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Read ${t.name}'s review${t.via ? ` on ${t.via}` : ""}`}
                              className="shrink-0 text-luxury-muted hover:text-gold-text transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                        {t.title && (
                          <span className="text-xs tracking-wider uppercase text-luxury-muted">
                            {t.title}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-0.5 shrink-0 pt-1" aria-label={`${t.rating ?? 5} out of 5 stars`}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 text-gold"
                          fill={i < Math.round(t.rating ?? 5) ? "currentColor" : "none"}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <p className="leading-relaxed text-luxury-muted flex-1 line-clamp-6">
                    {t.content?.replace(/<[^>]+>/g, "")}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 mt-6 border-t border-luxury-border">
                    <span className="text-xs tracking-wider uppercase text-gold-text">
                      {t.via}
                    </span>
                    <Quote className="w-8 h-8 text-gold" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        {scrollSnaps.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === selectedIndex}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex ? "w-6 bg-gold" : "w-2 bg-luxury-muted/30 hover:bg-luxury-muted/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
