import { FACILITIES_HEADER } from "@/data/data";
import { getServices } from "@/lib/data";

export default async function FacilitiesSection() {
  const header = FACILITIES_HEADER;
  const service = await getServices(1);
  const facilities = service?.[0]?.items?.slice(0, 8) ?? [];

  if (facilities.length === 0) return null;

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--luxury-ivory)" }}
    >
      <div className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-16">
          <div className="w-full lg:w-5/12 animate-slide-in-left">
            <div className="luxury-label text-gold-text mb-4">
              {header.label}
            </div>
            <div className="luxury-divider mb-8"></div>
            <h2
              className="luxury-section-title"
              style={{ color: "var(--luxury-charcoal)" }}
            >
              {header.title}
            </h2>
          </div>
          <div className="w-full lg:w-7/12 flex items-end animate-slide-in-right">
            <p
              className="luxury-subtitle max-w-xl"
              style={{ color: "var(--luxury-muted)" }}
            >
              {header.description}
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities?.map((facility: any, idx: number) => (
            <div
              key={idx}
              className="luxury-card-hover bg-white p-8 animate-fade-in-up"
              style={{ animationDelay: `${0.15 * idx}s` }}
            >
              {/* Number */}
              <div className="mb-6">
                <span
                  className="text-4xl font-extralight"
                  style={{ color: "var(--luxury-gold)", opacity: 0.6 }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <div
                className="text-lg font-light mb-3 tracking-wide"
                style={{ color: "var(--luxury-charcoal)" }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: facility.title || "" }}
                />
              </div>

              {/* Divider */}
              <div
                className="w-8 h-px mb-4"
                style={{ background: "var(--luxury-gold)" }}
              ></div>

              {/* Description */}
              <div
                className="text-sm font-light leading-relaxed"
                style={{ color: "var(--luxury-muted)" }}
              >
                <div
                  dangerouslySetInnerHTML={{ __html: facility.content_0 || "" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
