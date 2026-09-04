import Link from "next/link";
import Image from "next/image";

export default function OfferList({ offers }: { offers: any[] }) {
  if (!offers || offers.length === 0) {
    return <div className="text-center py-12 text-gray-500">No offers available at the moment.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {offers.map((item: any, idx: number) => {
        const imageSrc = item.image || (item.img && item.img[0]);
        return (
          <Link
            key={item.id}
            href={`/offers/${item.slug}`}
            className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer flex flex-col h-full border border-gray-100 animate-fade-in-up"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="relative h-full overflow-hidden">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={item.title?.replace(/<[^>]+>/g, '') || 'Offer image'}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-[#f9f7f2] flex items-center justify-center">
                  <span className="text-6xl text-gold opacity-30 font-light">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            <div className="p-6 flex-grow flex flex-col justify-between relative z-10 bg-white">
              <div>
                <h3
                  className="text-lg md:text-xl font-medium text-gray-900 mb-4 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />
                {(item.start_date || item.end_date) && (
                  <div className="flex items-center text-sm text-gold-text font-medium space-x-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {item.start_date} {item.end_date ? `to ${item.end_date}` : ''}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center text-sm font-semibold text-gray-500 group-hover:text-gold transition-colors uppercase tracking-wider">
                View Details
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
