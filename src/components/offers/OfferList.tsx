import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays } from "lucide-react";

export default function OfferList({ offers }: { offers: any[] }) {
  if (!offers || offers.length === 0) {
    return <div className="text-center py-12 text-gray-500">No offers available at the moment.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {offers.map((item: any, idx: number) => {
        const imageSrc = item.image || (item.img && item.img[0]);
        const dateLabel = item.end_date
          ? `Ends ${item.end_date}`
          : item.start_date
          ? `From ${item.start_date}`
          : null;

        return (
          <Link
            key={item.id}
            href={`/offers/${item.slug}`}
            className="group relative block h-96 overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={item.title?.replace(/<[^>]+>/g, '') || 'Offer image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-[#f9f7f2] flex items-center justify-center">
                <span className="text-6xl text-gold opacity-30 font-light">
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>
            )}

            {/* Bottom scrim — keeps the title readable over any image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Expiry — overlaps the top of the image */}
            {dateLabel && (
              <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-white bg-black/40 border border-white/15 backdrop-blur-md rounded-full px-3 py-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                {dateLabel}
              </span>
            )}

            {/* Title — overlaps the bottom of the image */}
            <div className="absolute inset-x-0 bottom-0 z-10 p-5">
              <h3
                className="text-lg md:text-xl font-medium text-white line-clamp-2 drop-shadow-sm"
                dangerouslySetInnerHTML={{ __html: item.title }}
              />
              <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-white/80 uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                View Details
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
