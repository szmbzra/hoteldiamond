import type { Metadata } from "next";
import { getPackage, getCategoryItems, getSiteRegulars } from "@/lib/data";
import { buildMetadata, buildPackageSchemas } from "@/lib/metadata";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import RestaurantList from "@/components/restaurant/RestaurantList";

// CMS `package`/`subpackage` parent_id for the Restaurant category.
const RESTAURANT_PARENT_ID = "7";

export async function generateMetadata(): Promise<Metadata> {
  const pkg = await getPackage(RESTAURANT_PARENT_ID);
  return buildMetadata(
    "restaurant",
    {
      ...(pkg?.meta_title && { title: pkg.meta_title }),
      ...(pkg?.meta_description && { description: pkg.meta_description }),
      ...(pkg?.meta_keywords && { keywords: pkg.meta_keywords }),
      ...(pkg?.fb_img && { openGraph: { images: [{ url: pkg.fb_img }] } }),
    },
    "/restaurant",
  );
}

export default async function RestaurantPage() {
  const [pkg, outlets, siteRegulars] = await Promise.all([
    getPackage(RESTAURANT_PARENT_ID),
    getCategoryItems(RESTAURANT_PARENT_ID),
    getSiteRegulars(),
  ]);

  // Prefer the package's dedicated banner; fall back to the first outlet image.
  const heroImage =
    pkg?.banner_img?.[0]?.url ??
    (outlets[0]?.gallery_images?.[0] as any)?.src ??
    outlets[0]?.gallery_images?.[0] ??
    siteRegulars?.default ??
    "";

  const schemas = buildPackageSchemas(pkg);

  return (
    <>
      {schemas.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}
      <Breadcrumb
        title="Dining"
        backgroundImage={
          typeof heroImage === "string"
            ? heroImage
            : ((heroImage as any)?.src ?? "")
        }
        items={[{ label: "Home", href: "/" }, { label: "Restaurant" }]}
      />
      <div className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        {pkg?.description && (
          <div
            className="luxury-subtitle max-w-3xl mx-auto text-center mb-16"
            style={{ color: "var(--luxury-muted)" }}
            dangerouslySetInnerHTML={{ __html: pkg.description }}
          />
        )}
        <RestaurantList outlets={outlets} />
      </div>
    </>
  );
}
