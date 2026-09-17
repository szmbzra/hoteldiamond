// Solid organic "blob" decorative shapes — a crisp, irregular blobmaker-style
// silhouette with a flat translucent fill, tucked into a section's corners.
// Unlike DecorativeBlobs.tsx (soft, heavily blurred circles that read as
// almost invisible at low opacity), this reads clearly as a blob shape at a
// glance while staying subtle enough to sit behind real content.
//
// Usage — render as the first children of a `relative` section, before a
// content wrapper that is itself `relative` (otherwise normal paint order
// puts the blob on top of, not behind, the real content):
//
//   <section className="relative overflow-hidden ...">
//     <OrganicBlobGlow variant="gold-dark" />
//     <div className="relative ...">...actual section content...</div>
//   </section>

type BlobColor = "gold" | "dark";
type BlobCorner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const CORNER_CLASS: Record<BlobCorner, string> = {
  "top-left": "-top-16 -left-20 md:-top-24 md:-left-28",
  "top-right": "-top-16 -right-16 md:-top-24 md:-right-24",
  "bottom-left": "-bottom-16 -left-16 md:-bottom-24 md:-left-24",
  "bottom-right": "-bottom-16 -right-20 md:-bottom-24 md:-right-28",
};

const COLOR_CLASS: Record<BlobColor, string> = {
  gold: "text-gold",
  dark: "text-luxury-dark",
};

const OPACITY: Record<BlobColor, number> = {
  gold: 0.18,
  dark: 0.1,
};

// A hand-picked organic blob silhouette (flat fill, crisp edges) on a
// 200x200 viewBox. Fixed path (never randomised) so server/client markup
// always match.
function BlobSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <path
        fill="currentColor"
        d="M145.3,41.9C158.5,50.3,168.1,65.4,171.7,82C175.3,98.6,172.9,116.7,164.5,131.4C156.1,146.1,141.7,157.4,125.4,163.6C109.1,169.8,90.9,170.9,74.2,165.8C57.5,160.7,42.3,149.4,33.6,134.3C24.9,119.2,22.7,100.3,27.5,83.5C32.3,66.7,44.1,52,58.8,42.9C73.5,33.8,91.1,30.3,107.5,31.9C123.9,33.5,132.1,33.5,145.3,41.9Z"
      />
    </svg>
  );
}

function Blob({
  color,
  corner,
  size,
  rotate = 0,
}: {
  color: BlobColor;
  corner: BlobCorner;
  size: number;
  rotate?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${CORNER_CLASS[corner]}`}
      style={{
        width: size,
        height: size,
        opacity: OPACITY[color],
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <BlobSVG className={`w-full h-full ${COLOR_CLASS[color]}`} />
    </div>
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

export function OrganicBlobGlow({
  variant = "gold-dark",
  sizeA = 320,
  sizeB = 280,
}: {
  variant?: keyof typeof VARIANTS;
  sizeA?: number;
  sizeB?: number;
}) {
  const [colorA, cornerA, colorB, cornerB] = VARIANTS[variant];
  return (
    <>
      <Blob color={colorA} corner={cornerA} size={sizeA} rotate={-6} />
      <Blob color={colorB} corner={cornerB} size={sizeB} rotate={10} />
    </>
  );
}

/** A single blob accent — for smaller sections that only need one. */
export function OrganicBlobAccent({
  color = "gold",
  corner = "top-right",
  size = 300,
}: {
  color?: BlobColor;
  corner?: BlobCorner;
  size?: number;
}) {
  return <Blob color={color} corner={corner} size={size} />;
}
