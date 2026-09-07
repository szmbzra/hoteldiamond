import dynamic from "next/dynamic";
import { Metadata } from "next";
import {
  getCategoryItems,
  getTestimonials,
  getPackage,
  getSocialGroup,
  getPopupItems,
} from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import { CATEGORY_IDS } from "@/config/site";

// Above the fold - static import
import HeroVideo from "@/components/home/HeroVideo";
import Popup from "@/components/popup/Popup";
import PageSchemas from "@/components/seo/PageSchemas";
import HallParallax from "@/components/home/HallParallax";

// Below the fold - dynamic imports
const AboutSection = dynamic(() => import("@/components/home/AboutSection"));
const RoomsSection = dynamic(() => import("@/components/home/RoomsSection"));
const FacilitiesSection = dynamic(() => import("@/components/home/FacilitiesSection"));
const DineBanner = dynamic(() => import("@/components/home/DineBanner"));
const ServicesSection = dynamic(() => import("@/components/home/ServicesSection"));
const HomeGallery = dynamic(() => import("@/components/home/HomeGallery"));
const NearbyLandmarks = dynamic(() => import("@/components/home/NearbyLandmarks"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const LatestNews = dynamic(() => import("@/components/home/LatestNews"));
const PartnerSlider = dynamic(() => import("@/components/ui/PartnerSlider"));

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("home", {}, "/");
}

export default async function Home() {
  const testimonials = await getTestimonials();
  const socialLinks = await getSocialGroup(2);
  const popupData = await getPopupItems();

  const rooms = await getCategoryItems(CATEGORY_IDS.rooms);
  const packageData = await getPackage("1");

  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <PageSchemas slug="home" />
      <Popup popupData={popupData} />
      <HeroVideo />
      <AboutSection />
      <RoomsSection rooms={rooms} packageTitle={packageData?.title} />
      {/* <FacilitiesSection /> */}
      {/* <DineBanner /> */}
      <ServicesSection />
      <HomeGallery />
      <HallParallax />
      <NearbyLandmarks />
      <Testimonials testimonials={testimonials} />
      {/* <LatestNews /> */}
      <PartnerSlider items={socialLinks?.items}/>
    </main>
  );
}
