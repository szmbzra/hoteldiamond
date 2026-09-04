import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CHAMBERS = [
  {
    name: "Chamber 1",
    size: "960 sq.ft.",
    detail: "Ideal for board meetings and mid-sized events, accommodating up to 70 guests in theatre style.",
  },
  {
    name: "Chamber 2",
    size: "975 sq.ft.",
    detail: "Perfect for workshops or smaller conferences, with flexible seating for up to 65 guests.",
  },
  {
    name: "Chancelier",
    size: "2700 sq.ft.",
    detail: "Our largest venue, suited for weddings, banquets, and large-scale conferences, hosting up to 500 guests in theatre style.",
  },
];

export default function HallParallax() {
  return (
    <section
      className="relative bg-fixed bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/hall.jpg')" }}
    >
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="relative px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <div className="max-w-4xl  mx-auto animate-fade-in-up">
          <div className="luxury-label mb-4" style={{ color: "var(--luxury-gold)" }}>
            Events &amp; Celebrations
          </div>
          <div className="luxury-divider mb-8" />
          <h2 className="luxury-section-title text-white mb-8">
            Spaces Made for Every Occasion
          </h2>
          <p className="luxury-subtitle text-white/80 mb-12">
            At Diamond Palace Lords Plaza, we understand that every gathering deserves the
            perfect setting. Whether you&apos;re hosting a corporate seminar, a grand wedding, or
            an intimate celebration, our versatile event spaces are designed to meet your needs.
            Each hall is equipped with modern amenities including projectors, PA systems with
            microphones, and LED displays, ensuring seamless presentations and memorable
            experiences.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12 pb-12 border-b border-white/20">
            {CHAMBERS.map((chamber) => (
              <div key={chamber.name}>
                <h3 className="text-white font-light tracking-wide text-lg mb-1">
                  {chamber.name}
                </h3>
                <div
                  className="text-xs uppercase tracking-[0.2em] mb-3"
                  style={{ color: "var(--luxury-gold)" }}
                >
                  {chamber.size}
                </div>
                <p className="text-sm text-white/70 font-light leading-relaxed">
                  {chamber.detail}
                </p>
              </div>
            ))}
          </div>

          <Link href="/events" className="luxury-btn luxury-btn-light group">
            Explore More
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
