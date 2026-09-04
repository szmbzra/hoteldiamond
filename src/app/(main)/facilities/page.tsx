import Breadcrumb from "@/components/ui/Breadcrumb";
import PageSchemas from "@/components/seo/PageSchemas";
import { getPageHeroImage, getServices } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("services", {}, "/facilities");
}

export default async function FacilitiesPage() {
  const backgroundImage = await getPageHeroImage("facilities");

  const facilities = await getServices();
  const facilitiesData = Array.isArray(facilities)
    ? facilities.find((item: any) => item.type === 1)
    : null;

  return (
    <>
      <PageSchemas slug="facilities" />
      <Breadcrumb
        backgroundImage={backgroundImage}
        title="Facilities"
        items={[{ label: "Home", href: "/" }, { label: "Facilities" }]}
      />

      <section className="py-24 px-6 md:px-12 bg-[#f9f7f2]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {facilitiesData?.items?.map((item: any, idx: number) => (
              <div
                key={item.id}
                className="group bg-white p-8 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-700 relative overflow-hidden border border-gray-100 flex flex-col items-center text-center animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Icon/Image */}
                <div className="mb-6 w-14 h-14 flex items-center justify-center transition-all duration-700 group-hover:scale-110">
                  {item.gallery_images?.[0] ? (
                    <Image
                      height={56}
                      width={56}
                      src={item.gallery_images[0].src}
                      alt={item.title}
                      className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <span className="text-3xl font-extralight text-gold opacity-50">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>

                {/* Content */}
                <h3
                  className="text-sm md:text-base font-semibold tracking-wider uppercase text-gray-900 group-hover:text-[#c4a872] transition-colors duration-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.title }}
                />

                <div
                  className="mt-3 text-xs md:text-sm font-normal text-gray-500 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed max-w-[220px]"
                  dangerouslySetInnerHTML={{ __html: item.content_0 }}
                />

                {/* Background Accent */}
                <div className="absolute -right-2 -bottom-2 text-6xl font-black text-black/[0.01] select-none group-hover:text-gold/5 transition-colors duration-700">
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
