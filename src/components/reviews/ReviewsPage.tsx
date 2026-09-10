"use client";

import { ExternalLink, MessageSquare, Quote, Star } from "lucide-react";
import {BreadcrumbNoBanner}  from "@/components/ui/Breadcrumb";
import { useState } from "react";



/** External "write a review" destinations. Per-property — update per hotel. */
const REVIEW_LINKS = {
  Google: "https://www.google.com/maps/place/Manakamana+Hillcrest+Resort",
  TripAdvisor: "https://www.tripadvisor.com/Hotel_Review-Manakamana_Hillcrest",
} as const;

interface Review {
  title?: string;
  content?: string;
  name?: string;
  image?: string;
  via?: string;
  rating?: number;
}

/** Brand accent per platform — kept as data so the JSX stays declarative. */


function StarRow({ value = 5, size = "w-3.5 h-3.5" }: { value?: number; size?: string }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${size} text-gold`}
          fill={i < Math.round(value) ? "currentColor" : "none"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage({
  reviews,
  heroImage,
}: {
  reviews: Review[];
  heroImage: string;
}) {
  const [filter, setFilter] = useState<"All" | keyof typeof REVIEW_LINKS>("All");

  const filtered =
    filter === "All" ? reviews : reviews.filter((r) => r.via === filter);

  const avg =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + (r.rating ?? 5), 0) / reviews.length
      : 5;

  const breakdown = [5, 4, 3, 2, 1].map((n) => ({
    stars: n,
    count: reviews.filter((r) => (r.rating ?? 5) === n).length,
  }));



  return (
    <div>
      {/* ── Hero ───────────────────────────────────────────────────────── */}

      <BreadcrumbNoBanner title="Guest Reviews"/>


      {/* ── Filter tabs + cards ────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">

          {/* Cards */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-24 text-luxury-muted">
              <MessageSquare className="w-10 h-10 mb-4 text-gold/40" aria-hidden="true" />
              <p className="text-sm">No reviews from this platform yet.</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((r, i) => (
                <li
                  key={i}
                  className="luxury-card-hover group relative bg-white rounded-2xl p-7 flex flex-col gap-4 border border-luxury-border animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(i, 8) * 0.05}s` }}
                >
                  <Quote
                    className="absolute top-6 right-6 w-8 h-8 text-gold/15 group-hover:text-gold/30 transition-colors"
                    aria-hidden="true"
                  />

                  <div className="flex items-center gap-2">
                    <StarRow value={r.rating ?? 5} />
                    <span className="sr-only">{r.rating ?? 5} out of 5 stars</span>
                  </div>

                  {r.title && (
                    <h3 className="font-medium text-luxury-charcoal text-base leading-snug pr-8">
                      {r.title}
                    </h3>
                  )}

                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-4 flex-1">
                    {r.content?.replace(/<[^>]+>/g, "")}
                  </p>

                  <div className="flex items-center justify-between pt-4 mt-auto border-t border-luxury-border">
                    <div className="flex items-center gap-3 min-w-0">
                      {r.image ? (
                        // eslint-disable-next-line @next/next/no-img-element -- review avatars come from arbitrary external hosts
                        <img
                          src={r.image}
                          alt=""
                          width={36}
                          height={36}
                          loading="lazy"
                          decoding="async"
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium text-white bg-luxury-dark shrink-0" aria-hidden="true">
                          {r.name?.[0]?.toUpperCase() ?? "G"}
                        </div>
                      )}
                      <span className="text-sm font-medium text-luxury-charcoal truncate">
                        {r.name}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

    </div>
  );
}
