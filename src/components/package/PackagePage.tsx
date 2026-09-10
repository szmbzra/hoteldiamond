"use client";

import PackageHero from "./sections/PackageHero";
import PackageIntro from "./sections/PackageIntro";
import AmenitiesGrid from "./sections/AmenitiesGrid";

export default function PackagePage({
  pkg,
  isArticle = false,
}: {
  pkg: any;
  isArticle?: boolean;
}) {
  if (!pkg) return null;

  const { title, subtitle,gallery_images = [], description, amenities = [] } = pkg;

  return (
    <div style={{ background: "var(--luxury-ivory)" }}>
      {/* <PackageHero title={title} images={gallery_images} label="Services" /> */}

      <PackageIntro label={title} title={subtitle} description={description} />

      {!isArticle && <AmenitiesGrid amenities={amenities} />}
    </div>
  );
}
