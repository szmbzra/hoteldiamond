"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Maximize2, Users } from "lucide-react";

function getImageSrc(image: any): string {
  if (!image) return "";
  return typeof image === "string" ? image : image?.src ?? image?.url ?? "";
}

function getFirstImage(item: any): string {
  const img = item.img;
  const gallery = item.gallery_images;
  const primary = Array.isArray(img) && img.length > 0 ? img[0] : null;
  const fallback = Array.isArray(gallery) && gallery.length > 0 ? gallery[0] : null;
  return getImageSrc(primary) || getImageSrc(fallback);
}

function getAmenities(item: any): any[] {
  const raw = item.amenities ?? item.features ?? [];
  if (Array.isArray(raw) && raw.length > 0 && Array.isArray(raw[0]?.items)) {
    return raw[0].items;
  }
  return Array.isArray(raw) ? raw : [];
}

export default function RoomsList({ rooms }: { rooms: any[] }) {
  if (!rooms || rooms.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 tracking-widest uppercase text-sm">
        No rooms available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
      {rooms.map((room: any, idx: number) => {
        const image = getFirstImage(room);
        const amenities = getAmenities(room);
        const currency = String(room.currency || "").replace(/[`'"]/g, "").trim();
        const priceValue = room.price ? Number(room.price) : null;

        return (
          <Link
            key={room.slug ?? idx}
            href={`/accommodations/${room.slug}`}
            className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_48px_rgba(0,0,0,0.14)] transition-all duration-500 hover:-translate-y-1.5 animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            {/* Image */}
            <div className="relative h-64 md:h-72 overflow-hidden bg-[#f9f7f2]">
              {image ? (
                <Image
                  src={image}
                  alt={room.title || "Room"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl font-light text-gold/40">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              )}

              {/* Subtle top scrim so the room number reads on any photo */}
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />

              {/* Room number ribbon */}
              <span className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium bg-black/30 border border-white/20 backdrop-blur-md text-white">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 md:p-7 flex flex-col flex-grow">
              <h3
                className="text-2xl md:text-[1.75rem] tracking-wide mb-1.5 transition-colors duration-300 group-hover:text-gold-text"
                style={{ fontFamily: "var(--font-cinzel), 'Cormorant Garamond', Georgia, serif", color: "var(--luxury-charcoal)" }}
              >
                {room.title}
              </h3>

              {priceValue ? (
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400">
                    From
                  </span>
                  <span className="text-sm font-medium" style={{ color: "var(--luxury-gold-text)" }}>
                    {currency} {priceValue.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-gray-400 font-light">/ night</span>
                </div>
              ) : null}

              {room.sub_title && (
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-5 line-clamp-2">
                  {room.sub_title}
                </p>
              )}

              {/* Quick facts */}
              {(room.occupancy || room.rooms_Size) && (
                <div
                  className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-5 pb-5"
                  style={{ borderBottom: "1px solid var(--luxury-border)" }}
                >
                  {room.occupancy && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Users className="w-4 h-4" style={{ color: "var(--luxury-gold-text)" }} />
                      {room.occupancy}
                    </div>
                  )}
                  {room.rooms_Size && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Maximize2 className="w-4 h-4" style={{ color: "var(--luxury-gold-text)" }} />
                      {room.rooms_Size}
                    </div>
                  )}
                </div>
              )}

              {/* Amenity pills */}
              {amenities.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {amenities.slice(0, 3).map((a: any, i: number) => (
                    <span
                      key={i}
                      className="text-[10px] uppercase tracking-[0.15em] text-gray-500 border border-gray-200 rounded-full px-3 py-1"
                    >
                      {a.title || a.name}
                    </span>
                  ))}
                  {amenities.length > 3 && (
                    <span className="text-[10px] uppercase tracking-[0.15em] text-gold-text border border-gold-text/40 rounded-full px-3 py-1">
                      +{amenities.length - 3} more
                    </span>
                  )}
                </div>
              )}

              <div className="mt-auto flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-gray-400 group-hover:text-gold transition-colors duration-300">
                View Room
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
