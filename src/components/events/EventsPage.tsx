"use client";

import {
  LayoutGrid,
  MonitorPlay,
  Sun,
  UtensilsCrossed,
  Users,
  Wifi,
} from "lucide-react";
import { BreadcrumbNoBanner } from "@/components/ui/Breadcrumb";
import ImageSlider from "@/components/ui/ImageSlider";
import { DecorativeGlow, DecorativeAccent } from "@/components/ui/DecorativeBlobs";

// Shown whenever the CMS hasn't filled in a real `amenities` list yet — swapped
// out automatically the moment `pkg.amenities[0].items` has entries.
const DEFAULT_AMENITIES: { title: string; icon: typeof Wifi; img?: string }[] = [
  { title: "Free Wi-Fi", icon: Wifi },
  { title: "AV Equipment", icon: MonitorPlay },
  { title: "Natural Daylight", icon: Sun },
  { title: "Catering Available", icon: UtensilsCrossed },
  { title: "Dedicated Event Manager", icon: Users },
  { title: "Flexible Layouts", icon: LayoutGrid },
];

function getAmenityIcon(title: string = "") {
  const t = title.toLowerCase();
  if (/wifi|internet/.test(t)) return Wifi;
  if (/av|audio|visual|projector|screen|sound/.test(t)) return MonitorPlay;
  if (/light|window|daylight/.test(t)) return Sun;
  if (/cater|food|menu|dining/.test(t)) return UtensilsCrossed;
  if (/manager|staff|coordinator|dedicated/.test(t)) return Users;
  return LayoutGrid;
}

// Example capacities shown until the CMS supplies real per-venue numbers —
// swap for `pkg.size` / `pkg.u_shape` / etc. once that data exists.
const DEFAULT_SETUP_STYLES = [
  { label: "Hall Size", value: "693 sq.ft" },
  { label: "U Shape", value: "25 Pax" },
  { label: "Classroom", value: "35 Pax" },
  { label: "Theatre", value: "55 Pax" },
  { label: "Round Table", value: "33 Pax" },
];

interface EventAmenityItem {
  title?: string;
  name?: string;
  img?: string;
}

interface EventsData {
  title?: string;
  sub_title?: string;
  description?: string;
  banner_img?: { id?: number; url?: string; alt?: string }[];
  amenities?: { group_title?: string; items?: EventAmenityItem[] }[];
  size?: string;
  u_shape?: string;
  class_room_style?: string;
  theater?: string;
  round_table?: string;
  cover?: string;
}

export default function EventsPage({
  pkg,
  whatsapp,
}: {
  pkg: EventsData | null;
  whatsapp: string;
}) {
  const images = (pkg?.banner_img ?? [])
    .filter((b) => b?.url)
    .map((b) => ({ src: b.url as string, title: b.alt }));

  const cmsAmenities = pkg?.amenities?.[0]?.items ?? [];
  const amenities =
    cmsAmenities.length > 0
      ? cmsAmenities.map((a) => ({
          title: a.title || a.name || "",
          img: a.img,
          icon: getAmenityIcon(a.title || a.name),
        }))
      : DEFAULT_AMENITIES;

  const cmsSetupStyles = [
    { label: "Hall Size", value: pkg?.size },
    { label: "U Shape", value: pkg?.u_shape },
    { label: "Classroom", value: pkg?.class_room_style },
    { label: "Theatre", value: pkg?.theater },
    { label: "Round Table", value: pkg?.round_table },
    { label: "Cover", value: pkg?.cover },
  ].filter((s): s is { label: string; value: string } => Boolean(s.value));

  const setupStyles = cmsSetupStyles.length > 0 ? cmsSetupStyles : DEFAULT_SETUP_STYLES;

  const whatsappHref = whatsapp ? `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}` : undefined;

  return (
    <div style={{ background: "var(--luxury-ivory)" }}>
      <BreadcrumbNoBanner title={pkg?.title || "Meeting & Events"} />

      {/* Gallery + intro */}
      <section className="max-w-[1400px] mx-auto pt-14 pb-20 px-6 md:px-12 lg:px-24">
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
          <p className="luxury-label text-gold-text mb-4">Events &amp; Venues</p>
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
            <p className="luxury-subtitle" style={{ color: "var(--luxury-muted)" }}>
              From boardroom strategy sessions to garden celebrations, our
              function spaces bring together attentive service and elegant
              surroundings.
            </p>
          )}
        </div>
      </section>

      {/* Amenities */}
      <section className="relative overflow-hidden" style={{ background: "var(--luxury-cream)" }}>
        <DecorativeGlow variant="dark-gold" />
        <div className="relative max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
          <div className="text-center mb-14">
            <p className="luxury-label text-gold-text mb-4 flex justify-center">
              What to Expect
            </p>
            <div className="flex justify-center mb-8">
              <div className="luxury-divider" />
            </div>
            <h2
              className="luxury-section-title"
              style={{ color: "var(--luxury-charcoal)" }}
            >
              Venue Amenities
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {amenities.map((a, i) => {
              const Icon = a.icon ?? LayoutGrid;
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
                      <Icon className="w-6 h-6" style={{ color: "var(--luxury-gold-text)" }} />
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

      {/* Occupancy & setup style */}
      <section className="relative overflow-hidden max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        <DecorativeAccent color="gold" corner="bottom-right" size={420} />
        <div className="relative">
        <h3
          className="text-2xl font-light tracking-wide uppercase mb-2"
          style={{ color: "var(--luxury-charcoal)" }}
        >
          Occupancy &amp; Setup Style
        </h3>
        <div className="w-12 h-px mb-10" style={{ background: "var(--luxury-gold)" }} />

        <div
          className="overflow-x-auto rounded-2xl border"
          style={{ borderColor: "var(--luxury-border)" }}
        >
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: "var(--luxury-cream)" }}>
                {setupStyles.map((s) => (
                  <th
                    key={s.label}
                    scope="col"
                    className="px-5 py-4 text-left text-[10px] uppercase tracking-[0.15em] font-medium whitespace-nowrap border-b"
                    style={{ color: "var(--luxury-muted)", borderColor: "var(--luxury-border)" }}
                  >
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {setupStyles.map((s) => (
                  <td
                    key={s.label}
                    className="px-5 py-5 text-base font-light whitespace-nowrap"
                    style={{ color: "var(--luxury-charcoal)" }}
                  >
                    {s.value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {whatsapp && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 mt-8 px-8 py-4 text-xs uppercase tracking-[0.2em] transition-colors duration-300 hover:opacity-90"
            style={{
              background: "var(--luxury-dark)",
              color: "var(--luxury-gold)",
              border: "1px solid var(--luxury-dark)",
            }}
          >
            WhatsApp for Enquiry
          </a>
        )}
        </div>
      </section>
    </div>
  );
}
