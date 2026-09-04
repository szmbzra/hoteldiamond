'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Image from 'next/image';

interface ImageSliderProps {
  images?: (string | { src?: string; title?: string; url?: string; gallery_images?: string })[];
  title?: string;
  fullHeight?: boolean;
  overlayClassName?: string;
}

export default function ImageSlider({
  images = [],
  title = '',
  fullHeight = false,
  overlayClassName = 'bg-black/10',
}: ImageSliderProps) {
  if (!images.length) return null;

  return (
    <div className={`relative w-full ${fullHeight ? 'h-full' : 'aspect-[16/10]'} overflow-hidden bg-black-100 group`}>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        speed={1500}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'custom-bullet',
          bulletActiveClass: 'custom-bullet-active',
        }}
        loop={images.length > 1}
        className="h-full w-full"
      >
        {images.map((img, i) => {
          if (!img) return null;

          const imgSrc = typeof img === 'string' ? img : (img.src || img.url || img.gallery_images);
          const imgTitle = typeof img === 'string' ? `${title} ${i + 1}` : (img.title || title || `image ${i + 1}`);

          if (!imgSrc) return null;

          return (
            <SwiperSlide key={i} className="h-full w-full overflow-hidden">
              <div className="h-full w-full relative">
                <Image
                  src={imgSrc}
                  alt={imgTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1920px"
                  priority={i === 0}
                  className="object-cover swiper-image-zoom"
                />
                <div className={`absolute inset-0 ${overlayClassName}`} />
              </div>
            </SwiperSlide>
          );
        })}

        {/* Custom Pagination Dots - Bottom Right */}
        <div className="custom-pagination absolute bottom-10 right-10 flex pr-20 pb-5 justify-end gap-3 z-30 pointer-events-auto"></div>
      </Swiper>
    </div>
  );
}
