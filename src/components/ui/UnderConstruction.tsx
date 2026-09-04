import { getSlideshow } from "@/lib/data";
import { NavItem } from "@/types";
import Image from "next/image";
import NavLink from "./NavLink";
import ImageSlider from "./ImageSlider";
import UnderConstructionFooter from "./UnderConstructionFooter";

interface Props {
  logoUrl?: string;
  message?: string;
  menu?: NavItem[];
}

export default async function UnderConstruction({
  menu,
  logoUrl,
  message,
}: Props) {
  const displayMessage =
    message ||
    "We are coming, get ready for the best travel experience with us.";
  const slideshow = await getSlideshow();
  const bannerImages: { src: string; title?: string }[] =
    slideshow?.find(
      (group: { mediaType: string; items: { src: string; title?: string }[] }) =>
        group.mediaType === "image",
    )?.items || [];

  return (
    <div className="min-h-screen flex flex-col">
    <div className="relative flex-1 flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
      style={{ background: "var(--luxury-dark)", color: "var(--luxury-cream)" }}
    >
      {/* Background slider */}
      {bannerImages.length > 0 && (
        <div className="absolute inset-0 z-0">
          <ImageSlider
            images={bannerImages}
            title="Hotel Diamond Pvt. Ltd"
            fullHeight
            overlayClassName="bg-black/60"
          />
        </div>
      )}

      {/* Gold top bar */}
      <div
        className="fixed top-0 left-0 w-full h-1 z-20"
        style={{ background: "var(--luxury-gold)" }}
      />

      <div className="relative z-10 flex flex-col items-center">
      {/* Logo */}
      {logoUrl && (
        <div className="mb-10">
          <Image
            src={logoUrl}
            alt="Hotel Diamond Pvt. Ltd"
            width={160}
            height={80}
            className="object-contain mx-auto"
            priority
          />
        </div>
      )}

      {/* Ornamental rule */}
      <div className="flex items-center gap-4 mb-10">
        <span
          className="block w-16 h-px"
          style={{ background: "var(--luxury-gold)" }}
        />
      </div>

      {/* Headline */}
      <h1
        className="font-cinzel text-4xl md:text-6xl font-light tracking-widest uppercase mb-8"
        style={{ color: "var(--luxury-gold-light)" }}
      >
        Manakamana Hillcrest
      </h1>

      {/* Message */}
      <p
        className="max-w-lg text-base md:text-lg leading-relaxed font-light"
        style={{ color: "var(--luxury-cream-alt)" }}
      >
        {displayMessage}
      </p>

      {/* Quick links */}
      {menu && menu.length > 0 && (
        <nav
          aria-label="Quick links"
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mt-12"
        >
          {menu.map((item: NavItem) => (
            <NavLink
              key={item.id}
              href={item.link}
              linktype={item.linktype}
              className="text-xs tracking-[0.25em] uppercase text-[var(--luxury-cream-alt)] hover:text-gold border-b border-transparent hover:border-gold pb-1 transition-colors focus-visible:outline-none focus-visible:text-gold"
            >
              {item.title}
            </NavLink>
          ))}
        </nav>
      )}
      </div>
    </div>
      <UnderConstructionFooter />
    </div>
  );
}
