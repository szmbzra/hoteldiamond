import { HERO_DATA } from "@/data/data";
import { getSlideshow } from "@/lib/data";
import HeroClient from "./HeroClient";

export default async function HeroVideo() {
  const slideshow = await getSlideshow();
  const data = HERO_DATA;

  return <HeroClient slideshow={slideshow} fallbackData={data} />;
}


