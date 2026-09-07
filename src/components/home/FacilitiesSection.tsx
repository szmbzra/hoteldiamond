import Image from "next/image";
import { FACILITIES_HEADER } from "@/data/data";
import { getServices } from "@/lib/data";

export default async function FacilitiesSection() {
  const header = FACILITIES_HEADER;
  const service = await getServices(1);
  const facilities = service?.[0]?.items?.slice(0, 8) ?? [];
  console.log(service);

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
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities?.map((facility: any, idx: number) => {
            const image = facility.gallery_images?.[0];

            return (
              <div
                key={idx}
                className="luxury-card-hover bg-white flex flex-col items-center text-center px-6 py-12 shadow-[0_4px_20px_rgba(0,0,0,0.03)] animate-fade-in-up"
                style={{ animationDelay: `${0.1 * idx}s` }}
              >
                {/* Icon / Image */}
              <div className="mb-6 w-12 h-12 flex items-center justify-center">
                {facility.icon ? (
                  <i
                    className={`${facility.icon} text-4xl`}
                    style={{ color: "var(--luxury-charcoal)" }}
                  />
                ) : image?.src ? (
                  <Image
                    src={image.src}
                    alt={image.title || facility.title || ""}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
                ) : null}
              </div>

                {/* Title */}
                <div
                  className="text-base font-light tracking-wide"
                  style={{ color: "var(--luxury-charcoal)" }}
                  dangerouslySetInnerHTML={{ __html: facility.title || "" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
