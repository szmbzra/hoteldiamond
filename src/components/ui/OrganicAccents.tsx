// Organic decorative accents — a tall fern/leaf branch tucked against one
// edge of a section and a small flock of flying-bird marks against the
// other, echoing the classic resort-site "leaf left, bird right" hero
// treatment (matching the reference the client shared). Both are hand-drawn
// inline SVGs (no image assets to host), rendered as pale silhouettes in the
// site's own gold/dark palette.
//
// Usage — render as early children of a `relative` section, before a
// content wrapper that itself has `relative` on it (plain, non-positioned
// content always paints *before* a positioned sibling in normal CSS paint
// order, so the content wrapper needs `relative` too or these accents will
// sit on top of it instead of behind it):
//
//   <section className="relative overflow-hidden ...">
//     <LeafAccent side="left" />
//     <BirdAccent side="right" />
//     <div className="relative ...">...actual section content...</div>
//   </section>

type AccentColor = "gold" | "dark";

const COLOR_VAR: Record<AccentColor, string> = {
  gold: "var(--luxury-gold-dim)",
  dark: "var(--luxury-dark)",
};

function LeafBranchSVG({ className }: { className?: string }) {
  const stemTop = 10;
  const stemBottom = 390;
  const pairs = 7;

  return (
    <svg viewBox="0 0 120 400" className={className} fill="currentColor">
      <line
        x1="60"
        y1={stemBottom}
        x2="63"
        y2={stemTop}
        stroke="currentColor"
        strokeWidth="2"
      />
      {Array.from({ length: pairs }).map((_, i) => {
        const t = i / (pairs - 1); // 0 at the base, 1 at the tip
        const y = stemBottom - t * (stemBottom - stemTop) - 12;
        const scale = 1 - t * 0.6; // leaves taper toward the tip
        const rx = 26 * scale;
        const ry = 12 * scale;
        const offsetX = 20 * scale;
        const stemX = 60 + t * 3;
        return (
          <g key={i}>
            <ellipse
              cx={stemX - offsetX}
              cy={y}
              rx={rx}
              ry={ry}
              transform={`rotate(-35 ${stemX - offsetX} ${y})`}
            />
            <ellipse
              cx={stemX + offsetX}
              cy={y}
              rx={rx}
              ry={ry}
              transform={`rotate(35 ${stemX + offsetX} ${y})`}
            />
          </g>
        );
      })}
    </svg>
  );
}

function BirdMark({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <path
      d={`M ${x} ${y + 10 * scale} Q ${x + 15 * scale} ${y} ${x + 30 * scale} ${y + 10 * scale} Q ${x + 45 * scale} ${y} ${x + 60 * scale} ${y + 10 * scale}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  );
}

function FlyingBirdsSVG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 170 90" className={className}>
      <BirdMark x={65} y={8} scale={1.15} />
      <BirdMark x={15} y={34} scale={0.85} />
    </svg>
  );
}

export function LeafAccent({
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
  const sideClass = side === "left" ? "left-0 -translate-x-1/4" : "right-0 translate-x-1/4 -scale-x-100";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 hidden md:block ${sideClass} ${className}`}
      style={{ width: height * 0.3, height, color: COLOR_VAR[color], opacity }}
    >
      <LeafBranchSVG className="w-full h-full" />
    </div>
  );
}

export function BirdAccent({
  side = "right",
  color = "gold",
  width = 190,
  opacity = 0.5,
  className = "",
}: {
  side?: "left" | "right";
  color?: AccentColor;
  width?: number;
  opacity?: number;
  className?: string;
}) {
  const sideClass = side === "right" ? "right-6 md:right-16" : "left-6 md:left-16 -scale-x-100";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute top-8 hidden md:block ${sideClass} ${className}`}
      style={{ width, color: COLOR_VAR[color], opacity }}
    >
      <FlyingBirdsSVG className="w-full h-auto" />
    </div>
  );
}
