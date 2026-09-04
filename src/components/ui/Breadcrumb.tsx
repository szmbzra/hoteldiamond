import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL } from "@/config/site";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  title: string;
  items: BreadcrumbItem[];
  backgroundImage?: string;
}

export default function Breadcrumb({
  title,
  items,
  backgroundImage,
}: BreadcrumbProps) {
  // BreadcrumbList rich result — absolute URLs; the final (current) crumb may
  // omit `item` per schema.org, which is fine for items without an href.
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `${SITE_URL}${item.href}` }),
    })),
  };

  return (
    <div className="relative w-full h-[100vh] min-h-[300px] max-h-[500px] flex items-center justify-center overflow-hidden bg-[#231f20]">
      <JsonLd schema={breadcrumbSchema} />
      {/* Background Media */}
      <div className="absolute inset-0 w-full h-full">
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
        ) : (
          <div className="w-full h-full bg-[#231f20] opacity-90"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 mt-16 md:mt-24">
        {/* Luxury Title — the page's single <h1> (pages using this banner have
            no other h1, so this anchors both a11y heading order and SEO). */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-[0.15em] uppercase mb-8 drop-shadow-lg">
          {title}
        </h1>
        
        {/* Decorative Divider */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-px mb-6" style={{ background: "var(--luxury-gold, #e3c9a1)" }}></div>
          
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-xs md:text-sm tracking-[0.2em] uppercase">
              {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                  <li key={index} className="flex items-center">
                    {item.href && !isLast ? (
                      <Link
                        href={item.href}
                        className="transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:text-white"
                        style={{ color: "rgba(255,255,255,0.85)" }}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span style={{ color: "var(--luxury-gold, #e3c9a1)" }}>
                        {item.label}
                      </span>
                    )}

                    {!isLast && (
                      <ChevronRight className="w-3 h-3 mx-3 text-white/30" />
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
