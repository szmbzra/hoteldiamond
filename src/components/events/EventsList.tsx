"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

function getFirstImage(item: any): string {
  const gallery = item.gallery_images;
  const img = item.img;
  const src = Array.isArray(gallery) && gallery.length > 0 ? gallery[0] : Array.isArray(img) && img.length > 0 ? img[0] : null;
  if (!src) return "";
  return typeof src === "string" ? src : src?.src ?? src?.url ?? "";
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {events.map((event: any, idx: number) => {
        const image = getFirstImage(event);

        const capacityFields = [
          { label: "Theatre", value: event.theater },
          { label: "Round Table", value: event.round_table },
          { label: "U Shape", value: event.u_shape },
          { label: "Classroom", value: event.class_room_style },
          { label: "Cover", value: event.cover },
        ].filter((f) => f.value);

        return (
          <Link
            key={event.slug ?? idx}
            href={`/events/${event.slug}`}
            className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            {/* Image */}
            <div className="relative h-72 overflow-hidden bg-[#f9f7f2]">
              {image ? (
                <Image
                  src={image}
                  alt={event.title || "Event Venue"}
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
              {event.size && (
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white text-xs uppercase tracking-widest px-3 py-1.5">
                  {event.size}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-xl font-light text-gray-900 tracking-wide mb-3">
                {event.title}
              </h3>

              {event.sub_title && (
                <p className="text-sm text-gray-500 font-light leading-relaxed mb-5 line-clamp-2">
                  {event.sub_title}
                </p>
              )}

              {/* Capacity row */}
              {capacityFields.length > 0 && (
                <div className="flex items-center gap-1 mb-6 text-gray-400 text-xs">
                  <Users className="w-3.5 h-3.5 mr-1 text-gold" />
                  {capacityFields.map((f, i) => (
                    <span key={i}>
                      <span className="text-gray-600 font-medium">{f.value}</span>{" "}
                      <span className="uppercase tracking-wider">{f.label}</span>
                      {i < capacityFields.length - 1 && <span className="mx-2 text-gray-200">|</span>}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-400 group-hover:text-gold transition-colors duration-300">
                View Venue
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}