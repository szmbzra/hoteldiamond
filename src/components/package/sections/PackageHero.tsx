import { ChevronRight } from "lucide-react";
import ImageSlider from "@/components/ui/ImageSlider";

export default function PackageHero({
  title,
  images = [],
  label,
  breadcrumbHref,
  breadcrumbLabel,
}: {
  title: string;
  images?: string[];
  label: string;
  breadcrumbHref?: string;
  breadcrumbLabel?: string;
}) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <ImageSlider images={images} title={title} fullHeight />
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      <div
        className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 lg:px-24 pb-12"
      >
        <p className="luxury-label mb-2" style={{ color: "var(--luxury-gold)" }}>
          {label}
        </p>
        <h1 className="text-4xl md:text-6xl font-light text-white tracking-wide mb-3">
          {title}
        </h1>
        <nav className="flex items-center gap-2 text-sm text-white/60">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          {breadcrumbLabel && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <a href={breadcrumbHref} className="hover:text-white transition-colors">
                {breadcrumbLabel}
              </a>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5" />
          <span style={{ color: "var(--luxury-gold)" }}>{title}</span>
        </nav>
      </div>
    </section>
  );
}
