// Ambient decorative background glow — soft, large, blurred color blobs
// tucked into a section's corners so flat/plain sections don't read as
// dull. Same "ambient glow" treatment already used in
// src/components/home/ServicesSection.tsx, packaged here so it can be
// reused consistently across every page.
//
// Usage — the blob must be able to paint BEHIND the section's real
// content, so it relies on DOM order + `position: relative` rather than
// z-index tricks (matches the existing ServicesSection pattern exactly):
//
//   <section className="relative overflow-hidden ...">
//     <DecorativeGlow variant="gold-dark" />
//     <div className="relative ...">...actual section content...</div>
//   </section>
//
// The outer section needs `relative` (containing block for the blobs).
// The content wrapper that follows needs `relative` too — otherwise, per
// normal CSS paint order, plain non-positioned content paints *before*
// positioned (absolute) siblings and the blob would end up on top of it
// instead of behind it.

type BlobColor = "gold" | "dark";
type BlobCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const CORNER_CLASS: Record<BlobCorner, string> = {
  "top-left": "-top-28 -left-28 md:-top-40 md:-left-40",
  "top-right": "-top-28 -right-20 md:-top-40 md:-right-32",
  "bottom-left": "-bottom-28 -left-20 md:-bottom-40 md:-left-32",
  "bottom-right": "-bottom-28 -right-20 md:-bottom-44 md:-right-32",
};

const COLOR_CLASS: Record<BlobColor, string> = {
  gold: "bg-gold/10",
  dark: "bg-luxury-dark/[0.05]",
};

function Blob({
  color,
  corner,
  size,
}: {
  color: BlobColor;
  corner: BlobCorner;
  size: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-[120px] ${CORNER_CLASS[corner]} ${COLOR_CLASS[color]}`}
      style={{ width: size, height: size }}
    />
  );
}

const VARIANTS: Record<
  "gold-dark" | "dark-gold" | "gold-gold" | "dark-dark",
  [BlobColor, BlobCorner, BlobColor, BlobCorner]
> = {
  "gold-dark": ["gold", "top-right", "dark", "bottom-left"],
  "dark-gold": ["dark", "top-left", "gold", "bottom-right"],
  "gold-gold": ["gold", "top-left", "gold", "bottom-right"],
  "dark-dark": ["dark", "top-right", "dark", "bottom-left"],
};

export function DecorativeGlow({
  variant = "gold-dark",
  sizeA = 480,
  sizeB = 440,
}: {
  variant?: keyof typeof VARIANTS;
  sizeA?: number;
  sizeB?: number;
}) {
  const [colorA, cornerA, colorB, cornerB] = VARIANTS[variant];
  return (
    <>
      <Blob color={colorA} corner={cornerA} size={sizeA} />
      <Blob color={colorB} corner={cornerB} size={sizeB} />
    </>
  );
}

/** A single soft blob — for smaller sections that only need one accent. */
export function DecorativeAccent({
  color = "gold",
  corner = "top-right",
  size = 380,
}: {
  color?: BlobColor;
  corner?: BlobCorner;
  size?: number;
}) {
  return <Blob color={color} corner={corner} size={size} />;
}
