import Image from "next/image";
import Link from "next/link";
import UnderConstructionFooter from "./UnderConstructionFooter";

interface Props {
  children: React.ReactNode;
  logoUrl?: string;
}

/**
 * Wraps a page that stays reachable during under-construction mode (see the
 * CMS "coming soon" menu allow-list in src/proxy.ts) in the same dark/gold
 * branding as the coming-soon screen itself, instead of the normal
 * Navbar/Footer chrome.
 */
export default function UnderConstructionShell({ children, logoUrl }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-luxury-dark text-luxury-cream">
      <div className="fixed top-0 left-0 w-full h-1 z-20 bg-gold" />

      {logoUrl && (
        <div className="pt-10 pb-4 flex justify-center">
          <Link href="/">
            <Image
              src={logoUrl}
              alt="Hotel Diamond Pvt. Ltd"
              width={140}
              height={70}
              className="object-contain mx-auto"
              priority
            />
          </Link>
        </div>
      )}

      <main className="flex-1">{children}</main>

      <UnderConstructionFooter />
    </div>
  );
}
