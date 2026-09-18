import type { Metadata } from "next";
import { findPackageBySlug, getCategoryItems } from "@/lib/data";
import { buildMetadata, buildPackageSchemas } from "@/lib/metadata";
import { BreadcrumbNoBanner } from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import EventsList from "@/components/events/EventsList";
import { GeometricAccent } from "@/components/ui/GeometricAccents";
import { CATEGORY_IDS } from "@/config/site";
import { DUMMY_EVENT_VENUES } from "@/data/data";

// CMS `package` record (slug "meeting-events", type "0") supplies the
// listing's own title/intro copy/meta; individual venues come from
// `subpackage` under CATEGORY_IDS.events — falls back to DUMMY_EVENT_VENUES
// until the CMS has real entries there.
async function getEventsPackage() {
  return findPackageBySlug("meeting-events", "0");
}

export async function generateMetadata(): Promise<Metadata> {
  const pkg = await getEventsPackage();
  return buildMetadata(
    "events",
    {
      ...(pkg?.meta_title && { title: pkg.meta_title }),
      ...(pkg?.meta_description && { description: pkg.meta_description }),
      ...(pkg?.meta_keywords && { keywords: pkg.meta_keywords }),
      ...(pkg?.fb_img && { openGraph: { images: [{ url: pkg.fb_img }] } }),
    },
    "/events",
  );
}

export default async function EventsRoute() {
  const [pkg, items] = await Promise.all([
    getEventsPackage(),
    getCategoryItems(CATEGORY_IDS.events),
  ]);

  const venues = items.length > 0 ? items : DUMMY_EVENT_VENUES;
  const schemas = buildPackageSchemas(pkg);

  return (
    <>
      {schemas.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}
      <BreadcrumbNoBanner
        title={pkg?.title || "Meeting & Events"}
        sub_title={pkg?.sub_title || "Meeting & Events"}
      />

      <section className="relative overflow-hidden pb-24 px-6 md:px-12 bg-[#f9f7f2]">
        <GeometricAccent side="left" color="dark" opacity={0.5} />
        <GeometricAccent side="right" color="dark" opacity={0.5} />
        <div className="relative max-w-7xl mx-auto mt-5">
          {pkg?.description ? (
            <div
              className="luxury-subtitle max-w-5xl mx-auto text-center mb-16"
              dangerouslySetInnerHTML={{ __html: pkg.description }}
            />
          ) : (
            <p className="luxury-subtitle max-w-4xl mx-auto text-center mb-16">
              From an intimate boardroom to a pillar-free ballroom and an
              open-air lawn — find the right setting for your meeting,
              conference or celebration.
            </p>
          )}
          <EventsList events={venues} />
        </div>
      </section>
    </>
  );
}
