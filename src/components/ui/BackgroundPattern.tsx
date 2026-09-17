// A subtle, full-bleed repeating diamond-lattice texture used as a section
// background — an inline SVG tile (not a raster image), so it stays crisp
// at any size/zoom and needs no separate asset to host. The diamond motif
// echoes "Hotel Diamond Palace". Fades toward the section's edges by
// default so it reads as texture, not a hard-edged wallpaper.
//
// Usage — render as the FIRST child of a `relative overflow-hidden` section,
// before a content wrapper that itself has `relative` on it (plain,
// non-positioned content always paints *before* a positioned sibling in
// normal CSS paint order, so the content wrapper needs `relative` too or
// the pattern will sit on top of it instead of behind it):
//
//   <section className="relative overflow-hidden ...">
//     <BackgroundPattern />
//     <div className="relative ...">...actual section content...</div>
//   </section>

type PatternColor = "gold" | "dark";

export function BackgroundPattern({
  color = "gold",
  opacity = 0.5,
  size = 56,
  fade = true,
  className = "",
}: {
  color?: PatternColor;
  /** Opacity of the lattice lines themselves (the wrapping fade mask, if
   * enabled, is separate and controls how far it reaches into the section). */
  opacity?: number;
  /** Diamond cell size in px, before the 45° rotation. */
  size?: number;
  /** Fade the pattern out toward the section's edges instead of a hard cut. */
  fade?: boolean;
  className?: string;
}) {
  const strokeColor = color === "gold" ? "var(--luxury-gold-dim)" : "var(--luxury-dark)";
  const patternId = `diamond-lattice-${color}-${size}`;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={
        fade
          ? {
              maskImage:
                "radial-gradient(ellipse 80% 70% at 50% 0%, black 25%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 70% at 50% 0%, black 25%, transparent 85%)",
            }
          : undefined
      }
    >
      <svg width="100%" height="100%" style={{ opacity }}>
        <defs>
          <pattern
            id={patternId}
            width={size}
            height={size}
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect
              width={size}
              height={size}
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
