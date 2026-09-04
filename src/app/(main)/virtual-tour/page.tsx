import React from "react";
import { Metadata } from "next";
import { getPageHeroImage, getVirtualTour } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import Breadcrumb from "@/components/ui/Breadcrumb";
import VirtualTourSection from "@/components/virtual-tour/Virtualtour";
import { VirtualTourData } from "@/components/virtual-tour/useVirtualTour";

export async function generateMetadata(): Promise<Metadata> {
  // Use fallbacks gracefully for virtual tour page
  return buildMetadata("virtual_tour", {}, "/virtual-tour");
}

export default async function VirtualTourPage() {
  const backgroundImage = await getPageHeroImage("Virtualtour");
  const tourData = await getVirtualTour<VirtualTourData>();


  return (
    <main className="min-h-screen flex flex-col">
      <Breadcrumb
        backgroundImage={backgroundImage}
        title="360° Virtual Tour"
        items={[{ label: "Home", href: "/" }, { label: "Virtual Tour" }]}
      />

      {/* Intro Section */}
      <section className="pt-20 pb-8 px-6 text-center max-w-4xl mx-auto shrink-0">
        <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] uppercase text-gold-text mb-4 block">
          Immersive Journey
        </span>
        <h2 className="text-3xl md:text-5xl font-light tracking-[0.1em] uppercase mb-8 leading-tight text-gray-900">
          Experience Manakamana <br />{" "}
          <span className="italic text-gold-text">In 360 Degrees</span>
        </h2>
        <div className="w-16 h-[1.5px] bg-gold mx-auto mb-8"></div>
        <p className="text-sm md:text-base leading-relaxed tracking-wide font-light text-gray-500 max-w-2xl mx-auto">
          Embark on a virtual exploration of our breathtaking mountain resort. Traverse the elegant
          pathways, discover our luxurious amenities, and experience the majestic Himalayan scenery 
          directly from your screen.
        </p>
      </section>

      {/* Virtual Tour App Component */}
      <VirtualTourSection data={tourData || null} />
    </main>
  );
}
