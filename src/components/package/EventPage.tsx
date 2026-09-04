"use client";

import EventEnquiryForm from "@/components/ui/EventEnquiryForm";
import PackageHero from "./sections/PackageHero";
import PackageIntro from "./sections/PackageIntro";
import AmenitiesGrid from "./sections/AmenitiesGrid";
import { contact } from "@/config/site";

export default function EventPage({ pkg }: { pkg: any }) {
  if (!pkg) return null;

  const { title, gallery_images = [], description, amenities = [] } = pkg;

  const setupStyles = [
    { label: "Hall Size",   value: pkg.size              },
    { label: "U Shape",     value: pkg.u_shape           },
    { label: "Classroom",   value: pkg.class_room_style  },
    { label: "Theatre",     value: pkg.theater           },
    { label: "Round Table", value: pkg.round_table       },
    { label: "Cover",       value: pkg.cover             },
  ].filter((s) => s.value);

  return (
    <div style={{ background: "var(--luxury-ivory)" }}>
      <PackageHero
        title={title}
        images={gallery_images}
        label="Events & Venues"
        breadcrumbHref="/events"
        breadcrumbLabel="Events"
      />

      <PackageIntro label="Events & Venues" title={title} description={description} />

      <AmenitiesGrid amenities={amenities} />

      {/* ── SETUP STYLES TABLE ───────────────────────────────────── */}
      {setupStyles.length > 0 && (
        <section
          className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24"
        >
          <h3 className="text-2xl font-light tracking-wide uppercase mb-2" style={{ color: "var(--luxury-charcoal)" }}>
            Occupancy &amp; Setup Style
          </h3>
          <div className="w-12 h-px mb-10" style={{ background: "var(--luxury-gold)" }} />
          <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--luxury-border)" }}>
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
          <a
            href={`https://wa.me/${contact.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 mt-8 px-8 py-4 text-xs uppercase tracking-[0.2em] transition-colors duration-300"
            style={{
              background: "var(--luxury-dark)",
              color: "var(--luxury-gold)",
              border: "1px solid var(--luxury-dark)",
            }}
          >
            WhatsApp for Enquiry
          </a>
        </section>
      )}

      {/* ── ENQUIRY FORM ─────────────────────────────────────────── */}
      <section
        className="relative min-h-[600px] flex items-center py-20 bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url(/bgimg.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div
          className="relative z-10 max-w-[1400px] mx-auto w-full px-6 md:px-12 lg:px-24"
        >
          <EventEnquiryForm hallName={title} />
        </div>
      </section>
    </div>
  );
}
