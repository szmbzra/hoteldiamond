"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Users } from "lucide-react";

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

export default function EventsList({ events }: { events: any[] }) {
  if (!events || events.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 tracking-widest uppercase text-sm">
        No event venues available at the moment.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event: any, idx: number) => {
        const image = getFirstImage(event);

        const capacityFields = [
          { label: "Theatre", value: event.theater },
          { label: "Round Table", value: event.round_table },
        ].filter((f) => f.value && f.value !== "—");

        return (
          <Link
            key={event.slug ?? idx}
            href={`/events/${event.slug}`}
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
                    alt={event.title || "Event Venue"}
                    className="absolute inset-0 w-full h-full object-cover luxury-img-zoom"
                  />
                ) : (
                  <Image
                    src={image}
                    alt={event.title || "Event Venue"}
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
              {event.size && (
                <div
                  className="absolute bottom-4 left-4 text-white text-xs uppercase tracking-widest px-3 py-1.5 backdrop-blur-sm"
                  style={{ background: "rgba(3, 47, 76, 0.6)" }}
                >
                  {event.size}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-7 flex flex-col flex-grow">
              <h3
                className="text-xl font-light tracking-wide mb-2"
                style={{ color: "var(--luxury-charcoal)" }}
              >
                {event.title}
              </h3>

              {event.sub_title && (
                <p
                  className="text-sm font-light leading-relaxed mb-5 line-clamp-2"
                  style={{ color: "var(--luxury-muted)" }}
                >
                  {event.sub_title}
                </p>
              )}

              {capacityFields.length > 0 && (
                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mb-6 text-xs" style={{ color: "var(--luxury-muted)" }}>
                  <Users className="w-3.5 h-3.5 text-gold-text" />
                  {capacityFields.map((f, i) => (
                    <span key={i}>
                      <span className="font-medium" style={{ color: "var(--luxury-charcoal)" }}>{f.value}</span>{" "}
                      <span className="uppercase tracking-wider">{f.label}</span>
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold-text">
                View Venue
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
