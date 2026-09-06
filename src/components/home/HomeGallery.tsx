import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getGalleryImages } from "@/lib/data";

// Grid areas defined in .gallery-bento (globals.css): a = large left,
// b/c = stacked top-right, d/e = bottom row (narrow left, wide right).
const AREAS = [
  "gallery-bento-a",
  "gallery-bento-b",
  "gallery-bento-c",
  "gallery-bento-d",
  "gallery-bento-e",
];

export default async function HomeGallery() {
  const images = await getGalleryImages("Home Page");
  const items = images.filter((item: any) => item.image).slice(0, AREAS.length);

  if (items.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--luxury-ivory)" }}
    >
      <div className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Text */}
          <div className="lg:col-span-4">
            <div className="luxury-label text-gold-text mb-4">
              Visual Journey
            </div>
            <div className="luxury-divider mb-6"></div>
            <h2
              className="luxury-section-title mb-6 text-5xl!"
              style={{ color: "var(--luxury-charcoal)" }}
            >
              Moments Captured in <span className="italic">Time</span>
            </h2>
            <p
              className="luxury-subtitle mb-8"
              style={{ color: "var(--luxury-muted)" }}
            >
              From candlelit dining to sunset views over the pool, every
              corner of the property has its own story. Step through the
              gallery for a closer look at the spaces that make each stay
              memorable.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-luxury-muted hover:text-gold-text transition-colors group"
            >
              View Full Gallery
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Bento mosaic */}
          <div className="lg:col-span-8">
            <div className="gallery-bento">
              {items.map((item: any, idx: number) => (
                <Link
                  key={item.id ?? idx}
                  href="/gallery"
                  className={`gallery-bento-item luxury-img-zoom group ${AREAS[idx]}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title || "Hotel gallery"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 60vw, 66vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
