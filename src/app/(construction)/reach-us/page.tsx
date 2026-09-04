import { notFound } from "next/navigation";
import ContactDetail from "@/components/contact/ContactDetail";
import MapSection from "@/components/contact/MapSection";
import UnderConstructionShell from "@/components/ui/UnderConstructionShell";
import { getSiteRegulars } from "@/lib/data";

// Only reachable while the site is under construction — must also be added
// to the CMS's "coming soon" menu (type 0) so src/proxy.ts lets it through.
// Has no /contact-us-style counterpart under (main), so it 404s once the
// flag is off rather than staying live after launch.
export default async function ReachUsPage() {
  const siteRegulars = await getSiteRegulars();

  if (siteRegulars?.site_under_contsruction !== "1") {
    notFound();
  }

  return (
    <UnderConstructionShell logoUrl={siteRegulars?.logo_upload}>
      {/* <div className="max-w-3xl mx-auto px-6 md:px-12 pt-10 md:pt-20 pb-10">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <ContactDetail />
        </div>
      </div> */}
      <MapSection />
    </UnderConstructionShell>
  );
}
