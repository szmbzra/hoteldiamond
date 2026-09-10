import {BreadcrumbNoBanner}  from "@/components/ui/Breadcrumb";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import PageSchemas from "@/components/seo/PageSchemas";
import { getPageHeroImage, getGalleryImages } from "@/lib/data";
import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("gallery", {}, "/gallery");
}

export default async function GalleryPage() {
  const backgroundImage = await getPageHeroImage("gallery");
  const galleryImages = await getGalleryImages("Inner Page");

  return (
    <main className="min-h-screen">
      <PageSchemas slug="Gallery" />
      <BreadcrumbNoBanner title="Gallery"
       />

      {/* Intro Section */}
      <section className="pb-20 px-6 text-center max-w-4xl mx-auto">
        <p className=" text-sm md:text-base leading-relaxed tracking-wide font-light max-w-2xl mx-auto">
          Explore the breathtaking vistas, elegant interiors, and unforgettable
          experiences that await you at Hotel Diamond Pvt. Ltd. Every frame
          tells a story of peace and tranquility.
        </p>
      </section>

      {/* Gallery Section */}
      <section className="pb-32">
        {galleryImages?.length > 0 ? (
          <GalleryGrid items={galleryImages} />
        ) : (
          <div className="text-center py-20 text-white/30">
            <p className="uppercase tracking-[0.2em] text-sm">
              No gallery items found
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
