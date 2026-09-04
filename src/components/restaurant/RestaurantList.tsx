"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function getFirstImage(item: any): string {
  const gallery = item.gallery_images;
  const img = item.img;
  const src = Array.isArray(gallery) && gallery.length > 0 ? gallery[0] : Array.isArray(img) && img.length > 0 ? img[0] : null;
  if (!src) return "";
  return typeof src === "string" ? src : src?.src ?? src?.url ?? "";
}

export default function RestaurantList({ outlets }: { outlets: any[] }) {
  if (!outlets || outlets.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 tracking-widest uppercase text-sm">
        No dining outlets available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {outlets.map((outlet: any, idx: number) => {
        const image = getFirstImage(outlet);

        return (
          <Link
            key={outlet.slug ?? idx}
            href={`/restaurant/${outlet.slug}`}
            className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            {/* Image */}
            <div className="relative h-72 overflow-hidden bg-[#f9f7f2]">
              {image ? (
                <Image
                  src={image}
                  alt={outlet.title || "Restaurant"}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl font-light text-gold/40">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-xl font-light text-gray-900 tracking-wide mb-3">
                {outlet.title}
              </h3>

              {outlet.sub_title && (
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-5 line-clamp-2">
                  {outlet.sub_title}
                </p>
              )}

              <div className="mt-auto flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 group-hover:text-gold transition-colors duration-300">
                View Restaurant
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
