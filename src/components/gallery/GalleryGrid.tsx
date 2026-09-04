"use client";

import React, { useState, useMemo } from "react";
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

export default function GalleryGrid({ items: rawItems }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Items without an image (e.g. CMS entries missing an upload) have nothing
  // to render — drop them rather than passing an empty string to next/image.
  const items = useMemo(() => rawItems.filter((item) => item.image), [rawItems]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add("All");
    items.forEach((item) => {
      if (item.category) cats.add(item.category);
    });
    return Array.from(cats);
  }, [items]);

  // Filter items
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const openLightbox = (index: number) => {
    // Find the index in the original items array to ensure correct navigation
    const originalIndex = items.findIndex(item => item.image === filteredItems[index].image);
    setSelectedImageIndex(originalIndex);
  };

  const closeLightbox = () => setSelectedImageIndex(null);

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % items.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="w-full">
      {/* Category Filter */}
      {categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-4 mb-16 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-300 border-b-2 ${
                activeCategory === cat
                  ? "border-[var(--luxury-gold, #e3c9a1)] "
                  : "border-transparent hover:text-gold"
              }`}
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
                src={items[selectedImageIndex].image}
                alt={items[selectedImageIndex].title || "Gallery Large"}
                height={1080}
                width={1920}
                className="object-contain h-full w-full"
                priority
              />
            </div>
            
            {/* Lightbox Caption */}
            <div className="mt-8 text-center" onClick={(e) => e.stopPropagation()}>
              <p className="text-[var(--luxury-gold, #e3c9a1)] text-[0.65rem] uppercase tracking-[0.4em] mb-2">
                {items[selectedImageIndex].category || "Gallery"}
              </p>
              <h2 className="text-white text-xl md:text-2xl font-light tracking-[0.15em] uppercase">
                {items[selectedImageIndex].title}
              </h2>
              <p className="text-white/40 text-[0.7rem] mt-4 tracking-[0.2em]">
                {selectedImageIndex + 1} / {items.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
