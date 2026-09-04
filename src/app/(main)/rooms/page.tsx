import type { Metadata } from "next";
import { getPackage, getCategoryItems, getSiteRegulars } from "@/lib/data";
import { buildMetadata, buildPackageSchemas } from "@/lib/metadata";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import RoomsList from "@/components/rooms/RoomsList";

// CMS `package`/`subpackage` parent_id for the Rooms & Suites category.
const ROOMS_PARENT_ID = "5";

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
    "/rooms",
  );
}

export default async function RoomsPage() {
  const [pkg, rooms, siteRegulars] = await Promise.all([
    getPackage(ROOMS_PARENT_ID),
    getCategoryItems(ROOMS_PARENT_ID),
    getSiteRegulars(),
  ]);

  // Prefer the package's dedicated banner; fall back to the first room image.
  const heroImage =
    pkg?.banner_img?.[0]?.url ??
    rooms[0]?.gallery_images?.[0]?.src ??
    rooms[0]?.gallery_images?.[0] ??
    siteRegulars?.default ??
    "";

  const schemas = buildPackageSchemas(pkg);

  return (
    <>
      {schemas.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}
      <Breadcrumb
        title="Our Rooms"
        backgroundImage={
          typeof heroImage === "string" ? heroImage : (heroImage?.src ?? "")
        }
        items={[{ label: "Home", href: "/" }, { label: "Rooms" }]}
      />
      <div className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        {pkg?.description && (
          <div
            className="luxury-subtitle max-w-3xl mx-auto text-center mb-16"
            style={{ color: "var(--luxury-muted)" }}
            dangerouslySetInnerHTML={{ __html: pkg.description }}
          />
        )}
        <RoomsList rooms={rooms} />
      </div>
    </>
  );
}
