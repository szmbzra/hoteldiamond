"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";

export default function Popup({ popupData }: { popupData?: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  // Flatten all popup items into a single array of slides
  const allSlides = useMemo(() => {
    if (!popupData || !Array.isArray(popupData)) return [];
    
    return popupData.flatMap((popup) => {
      if (!popup.items || !Array.isArray(popup.items)) return [];
      
      return popup.items.map((item: any) => ({
        ...item,
        popupType: popup.type, // "image" or "video"
        orientation: item.orientation || popup.orientation || "squar",
      }));
    });
  }, [popupData]);

  useEffect(() => {
    if (allSlides.length === 0) return;

    // Delay opening so the popup doesn't compete with the hero carousel
    const timer = setTimeout(() => setIsOpen(true), 2000);
    return () => clearTimeout(timer);
  }, [allSlides]);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (allSlides.length === 0) return null;

  const currentSlide = allSlides[activeIndex];
  const orientation = currentSlide?.orientation || "squar";
  const hasMultipleSlides = allSlides.length > 1;

  let sizeClasses = "";
  if (orientation === "vertical") {
    sizeClasses = "w-[85vw] sm:w-[400px] lg:w-[480px] aspect-[3/4]";
  } else if (orientation === "horizontal") {
    sizeClasses = "w-[90vw] sm:w-[600px] lg:w-[800px] aspect-[16/9]";
  } else {
    sizeClasses = "w-[85vw] sm:w-[500px] aspect-square";
  }

  const btnBase =
    "absolute top-1/2 z-10 -translate-y-1/2 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/60 hover:bg-white text-black backdrop-blur-sm transition-all shadow-md text-lg font-bold select-none";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 backdrop-blur-sm"
          onClick={closePopup}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          role="presentation"
        >
          <motion.div
            key="popup-container"
            className={`relative mx-auto overflow-hidden rounded-xl bg-white p-0 shadow-2xl transition-all duration-500 ease-in-out ${sizeClasses}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 1 }}
            role="dialog"
            aria-modal="true"
            aria-label="Promotional offer"
          >
            <button
              className="absolute right-3 top-3 z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/50 hover:bg-black/80 transition-colors p-1 text-xl text-white backdrop-blur-md"
              onClick={closePopup}
              aria-label="Close popup"
            >
              &times;
            </button>

            <Swiper
              onSwiper={(swiper) => { swiperRef.current = swiper; }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              loop={hasMultipleSlides}
              className="h-full w-full"
            >
              {allSlides.map((content: any, index: number) => {
                const isImage = content.popupType === "image";
                const linkHref = content.link ? `/${content.link}` : "#";
                const imgSrc =
                  isImage && content.imglink && content.imglink.length > 0
                    ? content.imglink[0].url
                    : "";

                return (
                  <SwiperSlide key={index} className="h-full w-full bg-white">
                    {isImage ? (
                      imgSrc && (
                        <Link href={linkHref} className="flex size-full flex-col items-center relative">
                          <Image
                            src={imgSrc}
                            alt={content.title || "Promotional offer"}
                            fill
                            priority
                            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 500px, 800px"
                            className="object-cover shadow"
                          />
                        </Link>
                      )
                    ) : (
                      <div className="flex size-full flex-col items-center bg-black">
                        <iframe
                          src={content.src.includes("?") ? `${content.src}&autoplay=1&mute=1` : `${content.src}?autoplay=1&mute=1`}
                          title={content.title || "Video Popup"}
                          className="size-full object-cover shadow"
                          frameBorder="0"
                          allow="autoplay; fullscreen"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {hasMultipleSlides && (
              <>
                <button
                  className={`${btnBase} left-2`}
                  onClick={() => swiperRef.current?.slidePrev()}
                  aria-label="Previous slide"
                >
                  &#8592;
                </button>
                <button
                  className={`${btnBase} right-2`}
                  onClick={() => swiperRef.current?.slideNext()}
                  aria-label="Next slide"
                >
                  &#8594;
                </button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
