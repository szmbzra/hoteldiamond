import type { Metadata } from "next";
import { findPackageBySlug, getCategoryItems } from "@/lib/data";
import { buildMetadata, buildPackageSchemas } from "@/lib/metadata";
import { BreadcrumbNoBanner } from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import RestaurantList from "@/components/restaurant/RestaurantList";
import { GeometricAccent } from "@/components/ui/GeometricAccents";
import { CATEGORY_IDS } from "@/config/site";
import { DUMMY_DINING_OUTLETS } from "@/data/data";

// CMS `package` record for the live dining-bar page (slug "dining-bar", type "0").
// Individual outlets come from `subpackage` under CATEGORY_IDS.restaurant and
// fall back to DUMMY_DINING_OUTLETS until those CMS entries are populated.
async function getDiningPackage() {
  return findPackageBySlug("dining-bar", "0");
}

export async function generateMetadata(): Promise<Metadata> {
  const pkg = await getDiningPackage();

  return buildMetadata(
    "restaurant",
    {
      ...(pkg?.meta_title && { title: pkg.meta_title }),
      ...(pkg?.meta_description && { description: pkg.meta_description }),
      ...(pkg?.meta_keywords && { keywords: pkg.meta_keywords }),
      ...(pkg?.fb_img && { openGraph: { images: [{ url: pkg.fb_img }] } }),
    },
    "/dining-bar",
  );
}

export default async function DiningRoute() {
  const [pkg, items] = await Promise.all([
    getDiningPackage(),
    getCategoryItems(CATEGORY_IDS.restaurant),
  ]);

  const outlets = items.length > 0 ? items : DUMMY_DINING_OUTLETS;
  const schemas = buildPackageSchemas(pkg);

  return (
    <>
      {schemas.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}
      <BreadcrumbNoBanner
        title={pkg?.title || "Dining & Bar"}
        sub_title={pkg?.sub_title || "Dining"}
      />

      <section className="relative overflow-hidden pb-24 px-6 md:px-12 bg-[#f9f7f2]">
        <GeometricAccent side="left" color="gold" opacity={0.5} />
        <GeometricAccent side="right" color="gold" opacity={0.5} />
        <div className="relative max-w-7xl mx-auto mt-5">
          {pkg?.description ? (
            <div
              className="luxury-subtitle max-w-5xl mx-auto text-center mb-16"
              dangerouslySetInnerHTML={{ __html: pkg.description }}
            />
          ) : (
            <p
              className="luxury-subtitle max-w-5xl mx-auto text-center mb-16"
              style={{ color: "var(--luxury-muted)" }}
            >
              From an elegant multi-cuisine restaurant to a rooftop lounge and a
              relaxed garden café — every outlet at Hotel Diamond Palace is
              built around a great view and an easy pace.
            </p>
          )}
          <RestaurantList outlets={outlets} />
        </div>
      </section>
    </>
  );
}
