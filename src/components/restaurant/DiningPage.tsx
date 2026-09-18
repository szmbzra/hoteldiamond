"use client";

import {
  ChefHat,
  Clock,
  ParkingCircle,
  Phone,
  Users,
  UtensilsCrossed,
  Wifi,
  Wind,
  Wine,
} from "lucide-react";
import { BreadcrumbNoBanner } from "@/components/ui/Breadcrumb";
import ImageSlider from "@/components/ui/ImageSlider";
import { DecorativeGlow } from "@/components/ui/DecorativeBlobs";
import DiningEnquireButton from "@/components/restaurant/DiningEnquireButton";

// Shown whenever the CMS hasn't filled in a real `amenities` list yet — swapped
// out automatically the moment `pkg.amenities[0].items` has entries.
const DEFAULT_AMENITIES: { title: string; icon: typeof Wifi; img?: string }[] =
  [
    { title: "Free Wi-Fi", icon: Wifi },
    { title: "All-Day Dining", icon: UtensilsCrossed },
    { title: "Bar & Lounge", icon: Wine },
    { title: "Buffet & À la Carte", icon: ChefHat },
    { title: "Private Dining", icon: Users },
    { title: "Air Conditioned", icon: Wind },
  ];

function getAmenityIcon(title: string = "") {
  const t = title.toLowerCase();
  if (/wifi|internet/.test(t)) return Wifi;
  if (/bar|wine|drink|lounge/.test(t)) return Wine;
  if (/buffet|chef|cuisine|menu/.test(t)) return ChefHat;
  if (/private|event|group|party/.test(t)) return Users;
  if (/air|\bac\b|conditioning/.test(t)) return Wind;
  if (/parking/.test(t)) return ParkingCircle;
  if (/hour|time|open/.test(t)) return Clock;
  return UtensilsCrossed;
}

interface DiningAmenityItem {
  title?: string;
  name?: string;
  img?: string;
}

interface DiningData {
  title?: string;
  sub_title?: string;
  description?: string;
  banner_img?: { id?: number; url?: string; alt?: string }[];
  amenities?: { group_title?: string; items?: DiningAmenityItem[] }[];
  amenities_name?: string | string[];
}

export default function DiningPage({
  pkg,
  phone,
  whatsapp,
}: {
  pkg: DiningData | null;
  phone: string;
  whatsapp?: string;
}) {
  const images = (pkg?.banner_img ?? [])
    .filter((b) => b?.url)
    .map((b) => ({ src: b.url as string, title: b.alt }));

  const cmsAmenities = pkg?.amenities?.[0]?.items ?? [];
  // `amenities_name` from the CMS `subpackage` API comes back as an array,
  // e.g. `["Dining Amenities"]`.
  const amenitiesTitle =
    (Array.isArray(pkg?.amenities_name)
      ? pkg?.amenities_name[0]
      : pkg?.amenities_name) || "Dining Amenities";
  const amenities =
    cmsAmenities.length > 0
      ? cmsAmenities.map((a) => ({
          title: a.title || a.name || "",
          img: a.img,
          icon: getAmenityIcon(a.title || a.name),
        }))
      : DEFAULT_AMENITIES;

  const telHref = phone ? `tel:${phone.replace(/\s+/g, "")}` : undefined;
  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`
    : undefined;

  return (
    <div style={{ background: "var(--luxury-ivory)" }}>
      <BreadcrumbNoBanner
        title={pkg?.title || "Dining"}
        // sub_title={pkg?.sub_title || "Dining"}
      />

      {/* Gallery + intro */}
      <section className="max-w-[1400px] mx-auto  pb-20 px-6 md:px-12 lg:px-24">
        {images.length > 0 && (
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/10 mb-14 h-[320px] md:h-[480px]">
            <ImageSlider
              images={images}
              title={pkg?.title}
              overlayClassName="bg-black/10"
              showArrows
              fullHeight
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto text-center">
          <p className="luxury-label text-gold-text mb-4">Dining &amp; Bar</p>
          <div className="flex justify-center mb-8">
            <div className="luxury-divider" />
          </div>
          {pkg?.sub_title && (
            <p
              className="text-xl md:text-2xl font-light leading-relaxed mb-8"
              style={{ color: "var(--luxury-charcoal)" }}
            >
              {pkg.sub_title}
            </p>
          )}
          {pkg?.description ? (
            <div
              className="cms-content luxury-subtitle text-center"
              style={{ color: "var(--luxury-muted)" }}
              dangerouslySetInnerHTML={{ __html: pkg.description }}
            />
          ) : (
            <p
              className="luxury-subtitle"
              style={{ color: "var(--luxury-muted)" }}
            >
              Discover a dining experience crafted with care — from relaxed
              breakfasts to memorable evenings.
            </p>
          )}
        </div>
      </section>

      {/* Amenities */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--luxury-cream)" }}
      >
        <DecorativeGlow variant="gold-dark" />
        <div className="relative max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-8"></div>
            <h2
              className="luxury-section-title text-3xl!"
              style={{ color: "var(--luxury-charcoal)" }}
            >
              {amenitiesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {amenities.map((a, i) => {
              const Icon = a.icon ?? UtensilsCrossed;
              return (
                <div
                  key={i}
                  className="luxury-card-hover bg-white flex flex-col items-center text-center px-4 py-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] animate-fade-in-up"
                  style={{ animationDelay: `${0.08 * i}s` }}
                >
                  <div
                    className="mb-5 w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ border: "1px solid var(--luxury-gold)" }}
                  >
                    {a.img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={a.img}
                        alt={a.title}
                        className="w-6 h-6 object-contain opacity-80"
                      />
                    ) : (
                      <Icon
                        className="w-6 h-6"
                        style={{ color: "var(--luxury-gold-text)" }}
                      />
                    )}
                  </div>
                  <span
                    className="text-xs uppercase tracking-[0.15em]"
                    style={{ color: "var(--luxury-charcoal)" }}
                  >
                    {a.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section
        className="relative min-h-[420px] flex items-center py-20 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url(/bgimg.jpg)" }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-24 text-center text-white">
          <p
            className="luxury-label mb-4"
            style={{ color: "var(--luxury-gold)" }}
          >
            Reserve a Table
          </p>
          <p className="text-2xl md:text-3xl font-light leading-relaxed max-w-2xl mx-auto mb-10">
            We&apos;d love to host you — let us prepare a dining experience
            worth returning for.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {phone && (
              <a href={telHref} className="luxury-btn luxury-btn-solid">
                <Phone className="w-4 h-4" />
                Call to Reserve
              </a>
            )}
            <DiningEnquireButton venueName={pkg?.title} />
            {whatsappHref && (
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="luxury-btn luxury-btn-light"
              >
                <i className="fa-regular fa-file-pdf text-base" />
                View Menu
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
