import type { Metadata } from "next";
import { getPackage, getCategoryItems } from "@/lib/data";
import { buildMetadata, buildPackageSchemas } from "@/lib/metadata";
import { BreadcrumbNoBanner } from "@/components/ui/Breadcrumb";
import { GeometricAccent } from "@/components/ui/GeometricAccents";
import JsonLd from "@/components/seo/JsonLd";
import RoomsList from "@/components/rooms/RoomsList";
import { CATEGORY_IDS } from "@/config/site";

// CMS `package`/`subpackage` parent_id for the Rooms & Suites category.
const ROOMS_PARENT_ID = CATEGORY_IDS.rooms;

export async function generateMetadata(): Promise<Metadata> {
  const pkg = await getPackage(ROOMS_PARENT_ID);
  return buildMetadata(
    "rooms",
    {
      ...(pkg?.meta_title && { title: pkg.meta_title }),
      ...(pkg?.meta_description && { description: pkg.meta_description }),
      ...(pkg?.meta_keywords && { keywords: pkg.meta_keywords }),
      ...(pkg?.fb_img && { openGraph: { images: [{ url: pkg.fb_img }] } }),
    },
    "/accommodations",
  );
}

export default async function RoomsPage() {
  const [pkg, rooms] = await Promise.all([
    getPackage(ROOMS_PARENT_ID),
    getCategoryItems(ROOMS_PARENT_ID),
  ]);

  const schemas = buildPackageSchemas(pkg);

  return (
    <>
      {schemas.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}
      <BreadcrumbNoBanner title={pkg?.title} sub_title={pkg?.sub_title} />
      <section className="relative overflow-hidden">
        <GeometricAccent side="left" color="gold" opacity={0.5} />
        <GeometricAccent side="right" color="gold" opacity={0.5} />
        <div className="relative max-w-[1400px] mx-auto pt-5 pb-20 px-6 md:px-12 lg:px-24">
          {pkg?.description && (
            <div
              className="luxury-subtitle max-w-5xl mx-auto text-center mb-16 text-black"
              dangerouslySetInnerHTML={{ __html: pkg.description }}
            />
          )}
          <RoomsList rooms={rooms} />
        </div>
      </section>
    </>
  );
}
