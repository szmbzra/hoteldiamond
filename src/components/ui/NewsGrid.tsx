'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NewsData } from "@/types";
import { ArrowRight, ChevronUp } from "lucide-react";

export default function NewsGrid({ news }: { news: NewsData[] }) {
  const [visibleCount, setVisibleCount] = useState(6);
  const hasMore = visibleCount < news.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, news.length));
  };

  const viewLess = () => {
    setVisibleCount(6);
  };

  const visibleNews = news.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {visibleNews.map((item, idx) => (
          <div
            key={idx}
            className="group cursor-pointer animate-fade-in-up bg-(--luxury-cream)"
            style={{ animationDelay: `${(idx % 3) * 0.15}s` }}
          >
            {/* Image */}
            <div className="relative h-72 md:h-80 overflow-hidden  luxury-img-zoom">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              )}
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Date */}
              <div className="text-sm italic mb-3 font-light text-gold-text">
                {item.date}
              </div>

              {/* Title */}
              <h4 className="text-xl md:text-2xl font-light tracking-tight mb-3 transition-colors duration-300"
                  style={{ color: 'var(--luxury-charcoal)' }}>
                <Link href={`/blog/${item.slug}`} className="group-hover:opacity-70 transition-opacity">
                  {item.title}
                </Link>
              </h4>

              {/* Description */}
              <div
                className="line-clamp-3 text-sm font-light leading-relaxed mb-6"
                style={{ color: 'var(--luxury-muted)' }}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />

              {/* Read More */}
              <Link
                href={`/blog/${item.slug}`}
                className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 text-gold-text"
              >
                Read More
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 flex flex-wrap justify-center gap-6">
        {hasMore && (
          <button
            onClick={loadMore}
            className="luxury-btn group flex items-center gap-4 px-12 py-5"
          >
            <span>Load More</span>
            <div className="w-8 h-px bg-current group-hover:w-12 transition-all duration-500"></div>
          </button>
        )}

        {visibleCount > 6 && (
          <button
            onClick={viewLess}
            className="luxury-btn group flex items-center gap-4 px-12 py-5 opacity-80 hover:opacity-100"
          >
            <span>View Less</span>
            <div className="w-5 h-5 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-1">
              <ChevronUp size={20} />
            </div>
          </button>
        )}
      </div>
    </>
  );
}