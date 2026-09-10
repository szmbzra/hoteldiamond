// Decorative mandala line-art — a delicate, low-opacity ornamental motif
// tucked into a section's corner. Chosen over a plain blob/icon pattern for
// the About page: mandalas echo the sacred, ornamental Himalayan/Nepali
// setting (Manakamana) the copy already leans on, and read as an extension
// of the site's existing thin gold "luxury-divider" line style rather than
// a generic background graphic.
//
// Usage — render as the FIRST children of a `relative` section, immediately
// before a content wrapper that itself has `relative` on it. Plain,
// non-positioned content always paints *before* a positioned sibling in
// normal CSS paint order, so without the wrapper also being `relative` the
// motif would end up on top of the real content instead of behind it:
//
//   <section className="relative overflow-hidden ...">
//     <DecorativeGlow variant="gold-dark" />
//     <div className="relative ...">...actual section content...</div>
//   </section>

type MandalaColor = "gold" | "dark";
type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";

const CORNER_CLASS: Record<Corner, string> = {
  "top-left": "-top-16 -left-16 md:-top-24 md:-left-24",
  "top-right": "-top-16 -right-16 md:-top-24 md:-right-24",
  "bottom-left": "-bottom-16 -left-16 md:-bottom-24 md:-left-24",
  "bottom-right": "-bottom-16 -right-16 md:-bottom-24 md:-right-24",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
};

const COLOR_CLASS: Record<MandalaColor, string> = {
  gold: "text-gold",
  dark: "text-luxury-dark",
};

const OPACITY: Record<MandalaColor, number> = {
  gold: 0.16,
  dark: 0.08,
};

// A hand-built line-art mandala: concentric rings + a ring of radiating
// petals, all stroke-only (no fill) so it reads as fine engraving rather
// than a solid shape. Petal count/angles are fixed (never randomised) so
// server and client markup always match.
function MandalaSVG({ className }: { className?: string }) {
  const petalCount = 12;
  const petals = Array.from({ length: petalCount }, (_, i) => (360 / petalCount) * i);

  return (
    <svg viewBox="0 0 200 200" className={className} fill="none">
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="56" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="5" stroke="currentColor" strokeWidth="0.6" />

      {petals.map((angle) => (
        <g key={angle} transform={`rotate(${angle} 100 100)`}>
          <path
            d="M100 4 C 110 22, 110 40, 100 56 C 90 40, 90 22, 100 4 Z"
            stroke="currentColor"
            strokeWidth="0.6"
          />
          <line x1="100" y1="56" x2="100" y2="78" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="11" r="2.4" stroke="currentColor" strokeWidth="0.6" />
        </g>
      ))}
    </svg>
  );
}

function Mandala({
  color,
  corner,
  size,
  rotate = 0,
}: {
  color: MandalaColor;
  corner: Corner;
  size: number;
  rotate?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute hidden sm:block ${CORNER_CLASS[corner]}`}
      style={{ width: size, height: size, opacity: OPACITY[color], transform: `rotate(${rotate}deg)` }}
    >
      <MandalaSVG className={`w-full h-full ${COLOR_CLASS[color]}`} />
    </div>
  );
}

const VARIANTS: Record<
  "gold-dark" | "dark-gold" | "gold-gold" | "dark-dark",
  [MandalaColor, Corner, MandalaColor, Corner]
> = {
  "gold-dark": ["gold", "top-right", "dark", "bottom-left"],
  "dark-gold": ["dark", "top-left", "gold", "bottom-right"],
  "gold-gold": ["gold", "top-left", "gold", "bottom-right"],
  "dark-dark": ["dark", "top-right", "dark", "bottom-left"],
};

export function DecorativeGlow({
  variant = "gold-dark",
  sizeA = 300,
  sizeB = 260,
}: {
  variant?: keyof typeof VARIANTS;
  sizeA?: number;
  sizeB?: number;
}) {
  const [colorA, cornerA, colorB, cornerB] = VARIANTS[variant];
  return (
    <>
      <Mandala color={colorA} corner={cornerA} size={sizeA} rotate={-8} />
      <Mandala color={colorB} corner={cornerB} size={sizeB} rotate={14} />
    </>
  );
}

/** A single mandala accent — for smaller sections that only need one. */
export function DecorativeAccent({
  color = "gold",
  corner = "top-right",
  size = 260,
}: {
  color?: MandalaColor;
  corner?: Corner;
  size?: number;
}) {
  return <Mandala color={color} corner={corner} size={size} />;
}
