"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";

interface PartnerItem {
  image: string;
  title: string;
  url: string;
}

interface PartnerSliderProps {
  items: PartnerItem[];
}

export default function PartnerSlider({ items: rawItems }: PartnerSliderProps) {
  // Entries without a logo upload have nothing to render — drop them rather
  // than passing an empty/null src to next/image.
  const items = rawItems?.filter((item) => item.image) ?? [];
  // Partner logos sit at the very bottom of the homepage — defer mounting the
  // (autoplaying) Swiper until it's about to scroll into view, so its main-
  // thread cost doesn't compete with the hero carousel during initial load.
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!items || items.length === 0) return null;

  // Ensure we have enough items to loop smoothly (max slidesPerView is 6)
  const displayItems = [...items];
  if (items.length > 0 && items.length < 12) {
    while (displayItems.length < 12) {
      displayItems.push(...items);
    }
  }

  return (
    <div
      ref={containerRef}
      className="bg-white py-6 md:py-8 border-t border-gray-100"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12"></div>
      <div className="w-full mx-auto">
        {isVisible ? (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={2}
            loop={true}
            speed={2000}
            preventClicks={false}
            preventClicksPropagation={false}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              480: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 60,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 80,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 100,
              },
            }}
            className="partner-swiper"
          >
            {displayItems.map((item, index) => (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center !h-auto"
              >
                <a
                  href={item.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative z-10 cursor-pointer transition-all duration-500 opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={180}
                    height={60}
                    className="object-contain w-auto h-12 md:h-14 lg:h-16"
                  />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="h-12 md:h-14 lg:h-16" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
