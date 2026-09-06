"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { links } from "@/config/site";
import NavLink from "@/components/ui/NavLink";

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

interface SlideItem  {
  title: string;
  src: string;
  description: string;
  buttonLink: string;
  /** CTA button label. API key: `text`. */
  text?: string;
  /** CMS link type: "0" → internal route, "1" → external URL (opens in a new tab). */
  linktype?: string | number;
  tagline?: string;
}

interface SlideShowGroup {
  mediaType: "image" | "video";
  items: SlideItem[];
}

interface HeroClientProps {
  slideshow: SlideShowGroup[];
  fallbackData: any;
}

export default function HeroClient({
  slideshow,
  fallbackData,
}: HeroClientProps) {

  // Respect user's motion preference for accessibility (WCAG 2.1 §2.3.3)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Custom nav buttons live outside the Swiper container, so bind them by ref
  // (string selectors are resolved before the DOM is ready and silently fail).
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const getMediaItems = (type: "image" | "video") => {
    return slideshow?.find((group) => group.mediaType === type)?.items || [];
  };

  const imageItems = getMediaItems("image");
  const videoItems = getMediaItems("video");

  const videoItem = videoItems[0];
  // Use the first image slide as the video poster so there's no black flash on load
  const videoPoster = imageItems[0]?.src || undefined;

  // Determine if we show a video or a carousel
  const showVideo = !!videoItem;
  const showCarousel = !showVideo && imageItems.length > 0;

  // Helper function to render the text overlay for the active slide or video
  const renderContent = (item?: SlideItem) => {
    const tagline = item?.tagline;
    // Don't use generic backend titles like "24 april video" as the main headline
    const headline = item?.title && item.title !== "24 april video" ? item.title : undefined;
    const subheadline = item?.description;
    const buttonText = item?.text;
    const buttonLink = item?.buttonLink;
    const linktype = item?.linktype;

    return (
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full px-6 pointer-events-none">
        <h1 className="luxury-hero-title text-white text-center max-w-5xl animate-fade-in-up delay-400">
          {headline}
        </h1>

        <p className="mt-6 text-white/60 text-lg md:text-xl tracking-[0.15em] font-light uppercase animate-fade-in-up delay-500 max-w-3xl text-center whitespace-pre-wrap">
          {subheadline}
        </p>

        {buttonLink && buttonLink !== "#" && (
          <div className="mt-12 animate-fade-in-up delay-600 pointer-events-auto">
            <NavLink href={buttonLink} linktype={linktype} className="luxury-btn luxury-btn-light">
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full">
        {showVideo && (
           <>
            <video
              autoPlay={!prefersReducedMotion}
              muted
              loop={!prefersReducedMotion}
              playsInline
              preload="metadata"
              poster={videoPoster}
              className="object-cover w-full h-full"
              aria-label="Hotel Diamond Pvt. Ltd hero video"
            >
              <source src={videoItem.src} type="video/webm" />
              <track kind="descriptions" label="Hotel Diamond Pvt. Ltd — luxury resort in Nepal with panoramic Himalayan views" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70"></div>

            {/* {renderContent(videoItem)} */}
          </>
        )}

        {showCarousel && (
          <div className="relative w-full h-full min-h-screen group">
            <Swiper
              modules={[Autoplay, EffectFade, Navigation]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              speed={1500}
              loop={imageItems.length > 1}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                const nav = swiper.params.navigation;
                if (nav && typeof nav !== "boolean") {
                  nav.prevEl = prevRef.current;
                  nav.nextEl = nextRef.current;
                }
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              allowTouchMove={true}
              className="w-full h-screen"
            >
              {imageItems.map((item, idx) => (
                <SwiperSlide
                  key={idx}
                  className="w-full h-screen relative"
                >
                  {item.src && (
                    <Image
                      src={item.src}
                      alt={item.title || "Hero Image"}
                      fill
                      priority={idx === 0}
                      sizes="100vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70"></div>
                  {/* Render the specific content for THIS slide directly over the image */}
                  {renderContent(item)}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Arrows */}
            <button
              ref={prevRef}
              className="hero-prev-btn absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-[var(--luxury-gold)] hover:border-[var(--luxury-gold)] transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-auto backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              ref={nextRef}
              className="hero-next-btn absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full border border-white/30 text-white hover:bg-[var(--luxury-gold)] hover:border-[var(--luxury-gold)] transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-auto backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Fallback if no media exists */}
        {!showVideo && !showCarousel && (
          <>
            <video
              autoPlay={!prefersReducedMotion}
              muted
              loop={!prefersReducedMotion}
              playsInline
              preload="metadata"
              className="object-cover w-full h-full"
              aria-label="Hotel Diamond Pvt. Ltd hero video"
            >
              <source src={fallbackData.videoSrc} type="video/webm" />
              <track kind="descriptions" label="Hotel Diamond Pvt. Ltd — luxury resort in Nepal with panoramic Himalayan views" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70"></div>
            {renderContent()}
          </>
        )}
      </div>
    </div>
  );
}

