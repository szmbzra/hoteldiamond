"use client";

import { useState } from "react";
import { Map as MapIcon, MapPin, ArrowUpRight } from "lucide-react";
import type { Landmark } from "@/types";

interface NearbyLandmarksClientProps {
  landmarks: Landmark[];
}

/** `map_url` sometimes arrives as a bare embed src, sometimes as a whole
 * `<iframe src="...">` tag pasted into the CMS field — and some of those
 * are missing their closing quote, so don't require one to find the end. */
function extractMapSrc(mapUrl?: string): string | null {
  if (!mapUrl) return null;
  const match = mapUrl.match(/src=["']([^"'>]+)/i);
  return match ? match[1] : mapUrl;
}

export default function NearbyLandmarksClient({ landmarks }: NearbyLandmarksClientProps) {
  const [activeTab, setActiveTab] = useState(landmarks[0]?.id || "");
  const activeIndex = Math.max(landmarks.findIndex((l) => l.id === activeTab), 0);
  const activeLandmark = landmarks[activeIndex];

  if (!activeLandmark) return null;

  const mapSrc = extractMapSrc(activeLandmark.map_url);

  return (
    <section className="relative overflow-hidden mt-25" style={{ background: "var(--luxury-dark)" }}>
      {/* Decorative background — a huge, faint map glyph instead of a photo */}
      <MapIcon
        className="pointer-events-none absolute -right-16 -top-20 w-[420px] h-[420px] md:w-[600px] md:h-[600px] text-gold/[0.06] rotate-[8deg]"
        strokeWidth={0.5}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-32 w-[420px] h-[420px] rounded-full blur-[140px] bg-gold/10"
        aria-hidden="true"
      />

      <div className="relative max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="luxury-label text-white mb-4">Explore The Area</div>
            <div className="luxury-divider mb-6"></div>
            <h2 className="luxury-section-title text-white">Nearby Landmarks</h2>
          </div>
          <p className="max-w-xs text-sm text-white/90 font-light leading-relaxed">
            Everything worth seeing is only a short ride away — here&apos;s how close you really are.
          </p>
        </div>

        {/* Numbered pill tabs */}
        <div className="flex flex-wrap gap-3 mb-4">
          {landmarks.map((landmark, idx) => {
            const active = landmark.id === activeLandmark.id;
            return (
              <button
                key={landmark.id}
                onClick={() => setActiveTab(landmark.id)}
                className="group flex items-center gap-3 rounded-full px-5 py-3 transition-all duration-500"
                style={{
                  border: `1px solid ${active ? "var(--luxury-gold)" : "var(--luxury-border)"}`,
                  background: active ? "rgba(227, 201, 161, 0.08)" : "transparent",
                }}
              >
                <span
                  className="text-[0.65rem] tracking-widest"
                  style={{ color: active ? "var(--luxury-gold)" : "rgba(255,255,255,0.3)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  className={`text-xs uppercase tracking-[0.15em] transition-colors ${
                    active ? "text-white" : "text-white/40 group-hover:text-white/70"
                  }`}
                >
                  {landmark.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content panel */}
        <div
          key={activeLandmark.id}
          className="animate-fade-in-up grid md:grid-cols-12 border-white">
          {/* Text */}
          <div className="relative flex flex-col justify-center p-8 md:col-span-5 md:p-12">
            <span className="luxury-big-numeral  pointer-events-none absolute top-6 right-8 select-none">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>

            <h3 className="mb-5 text-2xl font-light tracking-tight text-white md:text-3xl">
              {activeLandmark.title}
            </h3>
            {activeLandmark.content && (
              <div
                className="mb-8 text-[0.95rem] font-light leading-relaxed text-white"
                dangerouslySetInnerHTML={{ __html: activeLandmark.content }}
              />
            )}

            <div className="flex flex-wrap items-center gap-4">
              {activeLandmark.distance && (
                <div
                  className="inline-flex items-center gap-3 px-5 py-3"
                  style={{ border: "1px solid var(--luxury-gold)", color: "var(--luxury-gold)" }}
                >
                  <MapPin className="h-4 w-4" strokeWidth={1.5} />
                  <span className="text-sm font-light tracking-wider">{activeLandmark.distance}</span>
                </div>
              )}
              {mapSrc && (
                <a
                  href={mapSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white transition-colors "
                >
                  View on Map
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              )}
            </div>
          </div>

          {/* Map, framed with gold corner accents */}
          <div className="relative min-h-[320px] p-4 md:col-span-7 md:min-h-[420px] md:p-6">
            <div className="relative h-full min-h-[280px] w-full md:min-h-[380px]">
              {mapSrc ? (
                <iframe
                  src={mapSrc}
                  className="h-full min-h-[280px] w-full border-0 md:min-h-[380px]"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Google map of ${activeLandmark.title}`}
                />
              ) : (
                <div className="flex h-full min-h-[280px] items-center justify-center text-xs uppercase tracking-widest text-white/20 md:min-h-[380px]">
                  Map unavailable
                </div>
              )}
              <span
                className="pointer-events-none absolute -top-2 -left-2 h-8 w-8 border-t-2 border-l-2"
                style={{ borderColor: "var(--luxury-gold)" }}
              />
              <span
                className="pointer-events-none absolute -top-2 -right-2 h-8 w-8 border-t-2 border-r-2"
                style={{ borderColor: "var(--luxury-gold)" }}
              />
              <span
                className="pointer-events-none absolute -bottom-2 -left-2 h-8 w-8 border-b-2 border-l-2"
                style={{ borderColor: "var(--luxury-gold)" }}
              />
              <span
                className="pointer-events-none absolute -bottom-2 -right-2 h-8 w-8 border-b-2 border-r-2"
                style={{ borderColor: "var(--luxury-gold)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
