"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function getFirstImage(item: any): string {
  const gallery = item.gallery_images;
  const img = item.img;
  const src = Array.isArray(gallery) && gallery.length > 0 ? gallery[0] : Array.isArray(img) && img.length > 0 ? img[0] : null;
  if (!src) return "";
  return typeof src === "string" ? src : src?.src ?? src?.url ?? "";
}

// Dummy fallback images (images.unsplash.com) aren't in next/image's
// configured remotePatterns, so render those with a plain <img> — real CMS
// images (mayurstay.com) still go through next/image below.
function isUnoptimisedSrc(src: string) {
  return src.startsWith("https://images.unsplash.com/");
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {outlets.map((outlet: any, idx: number) => {
        const image = getFirstImage(outlet);

        return (
          <Link
            key={outlet.slug ?? idx}
            href={`/dining/${outlet.slug}`}
            className="luxury-card-hover group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] flex flex-col animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden" style={{ background: "var(--luxury-cream)" }}>
              {image ? (
                isUnoptimisedSrc(image) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt={outlet.title || "Restaurant"}
                    className="absolute inset-0 w-full h-full object-cover luxury-img-zoom"
                  />
                ) : (
                  <Image
                    src={image}
                    alt={outlet.title || "Restaurant"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover luxury-img-zoom"
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl font-light text-gold/40">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-7 flex flex-col flex-grow">
              <h3
                className="text-xl font-light tracking-wide mb-2"
                style={{ color: "var(--luxury-charcoal)" }}
              >
                {outlet.title}
              </h3>

              {outlet.sub_title && (
                <p
                  className="text-sm font-light leading-relaxed mb-6 line-clamp-2"
                  style={{ color: "var(--luxury-muted)" }}
                >
                  {outlet.sub_title}
                </p>
              )}

              <div className="mt-auto flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-text">
                View Restaurant
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
