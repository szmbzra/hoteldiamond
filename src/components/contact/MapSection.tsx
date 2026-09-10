import { getSiteRegulars } from "@/lib/data";

export default async function MapSection() {
  const siteregulars = await getSiteRegulars();
  return (
    <div className="relative w-full">
      <iframe
        className="absolute inset-0 w-full h-full"
        loading="lazy"
        src={siteregulars?.location_map}
        title={siteregulars?.sitetitle}
      />
    </div>
  );
}
