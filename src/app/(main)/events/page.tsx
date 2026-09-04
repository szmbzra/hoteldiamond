import type { Metadata } from "next";
import { getPackage, getCategoryItems, getSiteRegulars } from "@/lib/data";
import { buildMetadata, buildPackageSchemas } from "@/lib/metadata";
import Breadcrumb from "@/components/ui/Breadcrumb";
import JsonLd from "@/components/seo/JsonLd";
import EventsList from "@/components/events/EventsList";

// CMS `package`/`subpackage` parent_id for the Event Venues category.
const EVENTS_PARENT_ID = "6";

export async function generateMetadata(): Promise<Metadata> {
  const pkg = await getPackage(EVENTS_PARENT_ID);
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

export default async function EventsPage() {
  const [pkg, events, siteRegulars] = await Promise.all([
    getPackage(EVENTS_PARENT_ID),
    getCategoryItems(EVENTS_PARENT_ID),
    getSiteRegulars(),
  ]);

  // Prefer the package's dedicated banner; fall back to the first venue image.
  const heroImage =
    pkg?.banner_img?.[0]?.url ??
    events[0]?.gallery_images?.[0]?.src ??
    events[0]?.gallery_images?.[0] ??
    siteRegulars?.default ??
    "";

  const schemas = buildPackageSchemas(pkg);

  return (
    <>
      {schemas.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}
      <Breadcrumb
        title="Event Venues"
        backgroundImage={
          typeof heroImage === "string" ? heroImage : (heroImage?.src ?? "")
        }
        items={[{ label: "Home", href: "/" }, { label: "Events" }]}
      />
      <div className="max-w-[1400px] mx-auto py-20 px-6 md:px-12 lg:px-24">
        {pkg?.description && (
          <div
            className="luxury-subtitle max-w-5xl mx-auto text-center mb-16"
            style={{ color: "var(--luxury-muted)" }}
            dangerouslySetInnerHTML={{ __html: pkg.description }}
          />
        )}
        <EventsList events={events} />
      </div>
    </>
  );
}
