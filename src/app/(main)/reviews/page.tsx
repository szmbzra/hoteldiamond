import type { Metadata } from "next";
import { getTestimonials, getSiteRegulars } from "@/lib/data";
import { buildMetadata } from "@/lib/metadata";
import ReviewsPage from "@/components/reviews/ReviewsPage";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("reviews", {}, "/reviews");
}

export default async function ReviewsRoute() {
  const [reviews, siteRegulars] = await Promise.all([
    getTestimonials(),
    getSiteRegulars(),
  ]);
  const heroImage: string = siteRegulars?.default ?? "";

  return <ReviewsPage reviews={reviews} heroImage={heroImage} />;
}