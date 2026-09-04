import { notFound } from "next/navigation";
import CareerForm from "@/components/careers/CareerForm";
import CareerIntro from "@/components/careers/CareerIntro";
import UnderConstructionShell from "@/components/ui/UnderConstructionShell";
import { getSiteRegulars } from "@/lib/data";

// Served in place of /work-with-us while the site is under construction —
// same content, but wrapped in the coming-soon branding instead of the
// full Navbar/Footer. See the rewrite in src/proxy.ts. Guarded directly
// (not just via the rewrite) since proxy.ts stops touching /uc/* once the
// site is live, so this path would otherwise stay reachable after launch.
export default async function WorkWithUsUnderConstructionPage() {
  const siteRegulars = await getSiteRegulars();

  if (siteRegulars?.site_under_contsruction !== "1") {
    notFound();
  }

  return (
    <UnderConstructionShell logoUrl={siteRegulars?.logo_upload}>
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-10 md:py-20">
        <CareerIntro siteName={siteRegulars?.name} dark />
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <CareerForm />
        </div>
      </div>
    </UnderConstructionShell>
  );
}
