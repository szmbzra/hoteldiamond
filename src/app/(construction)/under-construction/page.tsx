import UnderConstruction from "@/components/ui/UnderConstruction";
import { getMenuItems, getSiteRegulars } from "@/lib/data";

export default async function UnderConstructionPage() {
  const [siteRegulars, menuItems] = await Promise.all([
    getSiteRegulars(),
    getMenuItems(0),
  ]);

  return (
    <UnderConstruction
      menu={menuItems}
      logoUrl={siteRegulars?.logo_upload}
      message={siteRegulars?.constrcution_content}
    />
  );
}
