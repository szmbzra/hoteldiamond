"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function getFirstImage(item: any): string {
  const gallery = item.gallery_images;
  const img = item.img;
  const src =
    Array.isArray(gallery) && gallery.length > 0
      ? gallery[0]
      : Array.isArray(img) && img.length > 0
        ? img[0]
        : null;
  if (!src) return "";
  return typeof src === "string" ? src : (src?.src ?? src?.url ?? "");
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
    <div className="flex flex-col gap-16 md:gap-24">
      {outlets.map((outlet: any, idx: number) => {
        const image = getFirstImage(outlet);
        const reversed = idx % 2 === 1;
        const index = String(idx + 1).padStart(2, "0");

        return (
          <Link
            key={outlet.slug ?? idx}
            href={`/dining-bar/${outlet.slug}`}
            className="group grid md:grid-cols-2 gap-8 md:gap-16 items-center animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {/* Image */}
            <div
              className={`relative aspect-[4/3] md:aspect-[5/4] overflow-hidden rounded-3xl luxury-img-zoom ${
                reversed ? "md:order-2" : ""
              }`}
              style={{ background: "var(--luxury-cream)" }}
            >
              {image ? (
                isUnoptimisedSrc(image) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={image}
                    alt={outlet.title || "Restaurant"}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <Image
                    src={image}
                    alt={outlet.title || "Restaurant"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-7xl font-light text-gold/30">
                    {index}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Numbered badge */}
              <div className="absolute bottom-5 left-5 w-11 h-11 rounded-full flex items-center justify-center text-xs tracking-widest text-white backdrop-blur-sm bg-black/40 border border-white/30">
                {index}
              </div>
            </div>

            {/* Content */}
            <div className={reversed ? "md:order-1" : ""}>
              <p className="luxury-label text-gold-text mb-4">Dining Outlet</p>
              <div className="luxury-divider mb-6" />

              <h3
                className="text-3xl md:text-4xl lg:text-[2.75rem] mb-5 transition-colors duration-300 group-hover:text-gold-text"
                style={{
                  fontFamily: "var(--font-heading), 'Playfair Display', Georgia, serif",
                  color: "var(--luxury-charcoal)",
                }}
              >
                {outlet.title}
              </h3>

              {outlet.sub_title && (
                <p
                  className="text-base font-light leading-relaxed mb-8 max-w-md"
                  style={{ color: "var(--luxury-muted)" }}
                >
                  {outlet.sub_title}
                </p>
              )}

              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gold-text pb-1 border-b border-transparent group-hover:border-current transition-colors">
                Explore Menu
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
