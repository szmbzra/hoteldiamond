"use client";

import { useState } from "react";
import { Star, ExternalLink, ChevronRight, Quote, MessageSquare } from "lucide-react";

const PLATFORMS = ["All", "Google", "TripAdvisor"] as const;

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
function platformStyle(via?: string) {
  if (via === "Google") return "text-[#4285F4] bg-[#4285F4]/10";
  if (via === "TripAdvisor") return "text-[#1a8c70] bg-[#1a8c70]/10";
  return "text-luxury-muted bg-black/5";
}

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
  const [filter, setFilter] = useState<(typeof PLATFORMS)[number]>("All");

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

  const countFor = (p: string) =>
    p === "All" ? reviews.length : reviews.filter((r) => r.via === p).length;

  return (
    <div>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <header
        className="relative flex items-end overflow-hidden bg-luxury-dark min-h-[360px] md:min-h-[440px]"
        style={
          heroImage
            ? { backgroundImage: `url(${heroImage})`, backgroundSize: "cover", backgroundPosition: "center" }
            : undefined
        }
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto pb-12 md:pb-16 px-6 md:px-12 lg:px-24">
          <span className="luxury-label text-gold mb-4 block">Guest Voices</span>
          <h1 className="text-4xl md:text-6xl font-light text-white tracking-wide mb-5">
            Guest Reviews
          </h1>

          {/* Trust badge — immediate social proof */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
            <span className="text-3xl font-light text-gold leading-none">{avg.toFixed(1)}</span>
            <StarRow value={avg} size="w-4 h-4" />
            <span className="text-white/60 text-sm">
              {reviews.length} verified review{reviews.length !== 1 ? "s" : ""}
            </span>
          </div>

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-white/60">
            <a href="/" className="hover:text-white transition-colors focus-visible:text-white">Home</a>
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="text-gold">Reviews</span>
          </nav>
        </div>
      </header>

      {/* ── Rating summary ─────────────────────────────────────────────── */}
      <section className="bg-luxury-dark py-16" aria-label="Rating summary">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-center">
            {/* Average */}
            <div className="text-center md:border-r md:border-white/10">
              <div className="text-7xl font-light text-gold mb-3">{avg.toFixed(1)}</div>
              <div className="flex justify-center mb-3">
                <StarRow value={avg} size="w-5 h-5" />
              </div>
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase">
                Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Breakdown */}
            <ul className="space-y-2.5">
              {breakdown.map(({ stars, count }) => {
                const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <li
                    key={stars}
                    className="flex items-center gap-3"
                    aria-label={`${stars} star: ${count} review${count !== 1 ? "s" : ""}`}
                  >
                    <span className="text-white/40 text-sm w-4 text-right tabular-nums" aria-hidden="true">{stars}</span>
                    <Star className="w-3.5 h-3.5 shrink-0 text-gold" fill="currentColor" aria-hidden="true" />
                    <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gold transition-[width] duration-700 ease-out"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-white/30 text-xs w-5 tabular-nums" aria-hidden="true">{count}</span>
                  </li>
                );
              })}
            </ul>

            {/* Platform counts */}
            <div className="space-y-3">
              {(["Google", "TripAdvisor"] as const).map((p) => (
                <div
                  key={p}
                  className="flex items-center justify-between px-5 py-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <span className="text-white/70 text-sm">{p}</span>
                  <span className="text-sm font-light text-gold">
                    {countFor(p)} review{countFor(p) !== 1 ? "s" : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Filter tabs + cards ────────────────────────────────────────── */}
      <section className="bg-luxury-ivory py-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          {/* Filter */}
          <div role="group" aria-label="Filter reviews by platform" className="flex flex-wrap gap-3 mb-12">
            {PLATFORMS.map((p) => {
              const active = filter === p;
              return (
                <button
                  key={p}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(p)}
                  className={`px-6 py-2.5 text-xs tracking-[0.15em] uppercase rounded-full border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 ${
                    active
                      ? "bg-luxury-dark text-gold border-gold"
                      : "bg-transparent text-luxury-muted border-luxury-border hover:border-gold/50 hover:text-luxury-charcoal"
                  }`}
                >
                  {p}
                  <span className="ml-2 opacity-50 tabular-nums">({countFor(p)})</span>
                </button>
              );
            })}
          </div>

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
                    {r.via && (
                      <span className={`text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full shrink-0 ${platformStyle(r.via)}`}>
                        {r.via}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ── Write-a-review CTA ─────────────────────────────────────────── */}
      <section className="bg-luxury-dark py-20">
        <div className="max-w-[1400px] mx-auto text-center px-6 md:px-12 lg:px-24">
          <span className="luxury-label text-gold mb-4 block">Share Your Experience</span>
          <div className="flex justify-center mb-8">
            <div className="luxury-divider" />
          </div>
          <h2 className="luxury-section-title text-white mb-6">Loved Your Stay?</h2>
          <p className="text-white/50 max-w-xl mx-auto mb-10 text-lg font-light leading-relaxed">
            Your feedback inspires our team and helps future guests discover us.
            Leave a review on your preferred platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={REVIEW_LINKS.Google}
              target="_blank"
              rel="noreferrer"
              className="luxury-btn"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Review on Google
            </a>
            <a
              href={REVIEW_LINKS.TripAdvisor}
              target="_blank"
              rel="noreferrer"
              className="luxury-btn luxury-btn-solid"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Review on TripAdvisor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
