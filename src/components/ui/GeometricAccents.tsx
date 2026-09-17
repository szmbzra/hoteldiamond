// Geometric decorative accents — a loose vertical cluster of line-art
// shapes (circle, triangle, diamond, dots, a thin connecting line) tucked
// against a section's edge, replacing an earlier organic leaf/bird
// treatment with an abstract geometric one per the client's direction.
// Hand-drawn inline SVG (no image asset to host); the same cluster is
// mirrored for the right side rather than drawing two different shapes.
//
// Usage — render as early children of a `relative` section, before a
// content wrapper that itself has `relative` on it (plain, non-positioned
// content always paints *before* a positioned sibling in normal CSS paint
// order, so the content wrapper needs `relative` too or this accent will
// sit on top of it instead of behind it):
//
//   <section className="relative overflow-hidden ...">
//     <GeometricAccent side="left" />
//     <GeometricAccent side="right" />
//     <div className="relative ...">...actual section content...</div>
//   </section>

type AccentColor = "gold" | "dark";

const COLOR_VAR: Record<AccentColor, string> = {
  gold: "var(--luxury-gold-dim)",
  dark: "var(--luxury-dark)",
};

function GeometricClusterSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 420"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      {/* large outlined circle */}
      <circle cx="60" cy="60" r="46" />
      {/* thin connecting line */}
      <line x1="60" y1="106" x2="60" y2="180" />
      {/* outlined triangle */}
      <polygon points="60,150 100,225 20,225" />
      {/* small solid dot */}
      <circle cx="130" cy="200" r="6" fill="currentColor" stroke="none" />
      {/* outlined diamond (rotated square) */}
      <rect x="25" y="275" width="56" height="56" transform="rotate(45 53 303)" />
      {/* small outlined circle */}
      <circle cx="140" cy="330" r="16" />
      {/* small solid dot */}
      <circle cx="90" cy="390" r="5" fill="currentColor" stroke="none" />
      {/* thin diagonal line */}
      <line x1="10" y1="405" x2="60" y2="380" />
    </svg>
  );
}

export function GeometricAccent({
  side = "left",
  color = "gold",
  height = 420,
  opacity = 0.5,
  className = "",
}: {
  side?: "left" | "right";
  color?: AccentColor;
  height?: number;
  opacity?: number;
  className?: string;
}) {
  const sideClass =
    side === "left"
      ? "left-0 -translate-x-1/4"
      : "right-0 translate-x-1/4 -scale-x-100";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 hidden md:block ${sideClass} ${className}`}
      style={{ width: height * 0.48, height, color: COLOR_VAR[color], opacity }}
    >
      <GeometricClusterSVG className="w-full h-full" />
    </div>
  );
}
