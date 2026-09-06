"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function RoomsSection({ initialData , packageTitle }: { initialData: string; packageTitle: string }) {
  const room = initialData;
  const packagename = packageTitle;
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!room) return null;

  const images: any[] =
    (room.gallery_images?.length > 0 ? room.gallery_images : room.img) || [];
  const features = room.amenities?.[0]?.items?.slice(0, 6) || [];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--luxury-dark)" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[130px] bg-gold/10"
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 animate-fade-in-up">
          <div>
            <div
              className="luxury-label mb-4 text-white">
              {room.label || "Your Comfort, Our Priority"}
            </div>
            <div className="luxury-divider mb-6"></div>
            <h2 className="luxury-section-title text-white">{packagename.title}</h2>
          </div>

          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/90 hover:text-gold transition-colors group shrink-0"
          >
            View All Rooms
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Image */}
          <div className="lg:col-span-7 animate-scale-in">
            <div className="relative rounded-2xl md:rounded-[28px] overflow-hidden shadow-2xl shadow-black/40">
              <Swiper
                onSwiper={(s) => (swiperRef.current = s)}
                onSlideChange={(s) => setActiveIndex(s.realIndex)}
                modules={[Autoplay, EffectFade]}
                effect="fade"
                slidesPerView={1}
                loop={images.length > 1}
                autoplay={
                  images.length > 1
                    ? { delay: 4500, disableOnInteraction: false }
                    : false
                }
                className="w-full h-[320px] md:h-[520px]"
              >
                {images.map((image: any, index: number) => {
                  const src = typeof image === "string" ? image : image?.src;
                  return (
                    <SwiperSlide key={index}>
                      <div className="relative h-full w-full">
                        {src && (
                          <Image
                            src={src}
                            alt={`${room.title} ${index + 1}`}
                            fill
                            priority={index === 0}
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-cover"
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              {/* Prev / next arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Previous image"
                    className="absolute z-10 left-4 top-1/2 -translate-y-1/2 hover:cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-black/30 border border-white/15 backdrop-blur-md text-white hover:bg-black/50 hover:border-gold/50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Next image"
                    className="absolute z-10 right-4 top-1/2 -translate-y-1/2 hover:cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-black/30 border border-white/15 backdrop-blur-md text-white hover:bg-black/50 hover:border-gold/50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-5 animate-slide-in-right">
            <p className="luxury-subtitle text-white mb-10 line-clamp-3">
              {(room.sub_title || room.description)?.replace(
                /<\/?p[^>]*>/g,
                ""
              )}
            </p>

            {features.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-10">
                {features.map((feature: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white/[0.04] border border-white/[0.08] hover:border-gold/40 hover:bg-white/[0.06] transition-colors duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${0.2 + idx * 0.08}s` }}
                  >
                    {feature.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={feature.img}
                        alt=""
                        className="w-5 h-5 object-contain opacity-80 shrink-0"
                      />
                    ) : (
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: "var(--luxury-gold)" }}
                      ></span>
                    )}
                    <span className="text-sm text-white/70 font-light tracking-wide truncate">
                      {feature.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <Link href={`/rooms/${room.slug}`} className="luxury-btn group w-fit">
                Explore Room
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/rooms"
                className="md:hidden inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/50 hover:text-gold transition-colors w-fit"
              >
                View All Rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
