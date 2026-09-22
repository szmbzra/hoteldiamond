"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  image: string;
  title?: string;
  category?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function GalleryGrid({ items: rawItems }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Items without an image (e.g. CMS entries missing an upload) have nothing
  // to render — drop them rather than passing an empty string to next/image.
  const items = useMemo(() => rawItems.filter((item) => item.image), [rawItems]);

  // Starts in server order (so the first client render matches the SSR'd
  // HTML and React doesn't flag a hydration mismatch), then reshuffles once
  // mounted so every page load/refresh shows a different arrangement.
  const [shuffledItems, setShuffledItems] = useState(items);
  useEffect(() => {
    // Math.random() can only run post-mount without desyncing from the
    // server-rendered HTML; this is the client-only-randomization case the
    // rule's own docs call out as legitimate.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShuffledItems(shuffle(items));
  }, [items]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    shuffledItems.forEach((item) => {
      if (item.category) cats.add(item.category);
    });
    return Array.from(cats);
  }, [shuffledItems]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return shuffledItems;
    return shuffledItems.filter((item) => item.category === activeCategory);
  }, [shuffledItems, activeCategory]);

  const openLightbox = (index: number) => {
    // Find the index in the shuffled items array to ensure correct navigation
    const originalIndex = shuffledItems.findIndex(item => item.image === filteredItems[index].image);
    setSelectedImageIndex(originalIndex);
  };

  const closeLightbox = () => setSelectedImageIndex(null);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % shuffledItems.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + shuffledItems.length) % shuffledItems.length);
  };

  return (
    <div className="w-full">
      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="flex md:justify-center gap-4  mb-15 md:mb-16 px-4 overflow-auto flex-nowrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 md:px-8 py-3.5 text-xs uppercase shrink-0 grow hover:cursor-pointer tracking-[0.2em] transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-(--color-blue)  text-white" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 max-w-[1600px] mx-auto">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className="group relative aspect-[4/3] overflow-hidden cursor-pointer bg-white/5"
            onClick={() => openLightbox(idx)}
          >
            <Image
              src={item.image}
              alt={item.title || "Gallery Image"}
              width={1920}
              height={1080}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ aspectRatio: "4 / 3" }}
              className="object-cover h-full w-full transition-transform duration-700 group-hover:scale-110"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
              <Maximize2 className="w-8 h-8 text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
              {item.title && (
                <h3 className="text-white text-sm uppercase tracking-[0.2em] font-light">
                  {item.title}
                </h3>
              )}
              {item.category && (
                <p className="text-[var(--luxury-gold, #e3c9a1)] text-[0.6rem] uppercase tracking-[0.3em] mt-2">
                  {item.category}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          <button
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110]"
            onClick={prevImage}
          >
            <ChevronLeft size={48} />
          </button>

          <button
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[110]"
            onClick={nextImage}
          >
            <ChevronRight size={48} />
          </button>

          <div className="relative w-full h-full max-w-6xl max-h-[80vh] flex flex-col items-center justify-center">
            <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={shuffledItems[selectedImageIndex].image}
                alt={shuffledItems[selectedImageIndex].title || "Gallery Large"}
                height={1080}
                width={1920}
                className="object-contain h-full w-full"
                priority
              />
            </div>

            {/* Lightbox Caption */}
            <div className="mt-8 text-center" onClick={(e) => e.stopPropagation()}>
              <p className="text-[var(--luxury-gold, #e3c9a1)] text-[0.65rem] uppercase tracking-[0.4em] mb-2">
                {shuffledItems[selectedImageIndex].category || "Gallery"}
              </p>
              <h2 className="text-white text-xl md:text-2xl font-light tracking-[0.15em] uppercase">
                {shuffledItems[selectedImageIndex].title}
              </h2>
              <p className="text-white/40 text-[0.7rem] mt-4 tracking-[0.2em]">
                {selectedImageIndex + 1} / {shuffledItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
