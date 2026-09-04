import { getMenuItems, getSiteRegulars } from "@/lib/data";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const menuItems = await getMenuItems(1);
  const siteRegulars = await getSiteRegulars();
  const logoUrl = siteRegulars?.logo_upload || "";

  return <NavbarClient menu={menuItems} logoUrl={logoUrl} />;
}
