// Ambient decorative background pattern — a loose scatter of soft,
// low-opacity Lucide icons tucked into a section's corner (a diamond motif
// by default, echoing "Hotel Diamond Palace"), so a flat/plain section
// doesn't read as dull. No image assets needed.
//
// Usage — render as the FIRST children of a `relative` section, immediately
// before a content wrapper that itself has `relative` on it. Plain,
// non-positioned content always paints *before* a positioned sibling in
// normal CSS paint order, so without the wrapper also being `relative` the
// pattern would end up on top of the real content instead of behind it:
//
//   <section className="relative overflow-hidden ...">
//     <DecorativeGlow variant="gold-dark" />
//     <div className="relative ...">...actual section content...</div>
//   </section>

import type { LucideIcon } from "lucide-react";
import { Gem } from "lucide-react";

type IconColor = "gold" | "dark";
type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const CORNER_CLASS: Record<Corner, string> = {
  "top-left": "top-2 left-2 md:top-6 md:left-6",
  "top-right": "top-2 right-2 md:top-6 md:right-6",
  "bottom-left": "bottom-2 left-2 md:bottom-6 md:left-6",
  "bottom-right": "bottom-2 right-2 md:bottom-6 md:right-6",
};

const COLOR_CLASS: Record<IconColor, string> = {
  gold: "text-gold",
  dark: "text-luxury-dark",
};

const OPACITY_CLASS: Record<IconColor, string> = {
  gold: "opacity-[0.16]",
  dark: "opacity-[0.08]",
};

// Deterministic scatter (never Math.random — must render identically on the
// server and the client) laying icons out as a loose cluster rather than a
// rigid grid. Each entry is a fraction of the cluster's own box.
const SCATTER: { x: number; y: number; scale: number; rotate: number }[] = [
  { x: 0.5, y: 0.42, scale: 1.7, rotate: -10 },
  { x: 0.16, y: 0.14, scale: 0.9, rotate: 18 },
  { x: 0.84, y: 0.18, scale: 1.05, rotate: -22 },
  { x: 0.1, y: 0.8, scale: 0.8, rotate: 8 },
  { x: 0.8, y: 0.84, scale: 1.15, rotate: 26 },
  { x: 0.5, y: 0.92, scale: 0.7, rotate: -16 },
];

function IconCluster({
  icon: Icon,
  color,
  corner,
  size,
}: {
  icon: LucideIcon;
  color: IconColor;
  corner: Corner;
  size: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute hidden sm:block ${CORNER_CLASS[corner]}`}
      style={{ width: size, height: size }}
    >
      {SCATTER.map((s, i) => (
        <Icon
          key={i}
          strokeWidth={1.1}
          className={`absolute ${COLOR_CLASS[color]} ${OPACITY_CLASS[color]}`}
          style={{
            width: size * 0.14 * s.scale,
            height: size * 0.14 * s.scale,
            top: `${s.y * 100}%`,
            left: `${s.x * 100}%`,
            transform: `translate(-50%, -50%) rotate(${s.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

const VARIANTS: Record<
  "gold-dark" | "dark-gold" | "gold-gold" | "dark-dark",
  [IconColor, Corner, IconColor, Corner]
> = {
  "gold-dark": ["gold", "top-right", "dark", "bottom-left"],
  "dark-gold": ["dark", "top-left", "gold", "bottom-right"],
  "gold-gold": ["gold", "top-left", "gold", "bottom-right"],
  "dark-dark": ["dark", "top-right", "dark", "bottom-left"],
};

export function DecorativeGlow({
  variant = "gold-dark",
  icon = Gem,
  iconA,
  iconB,
  sizeA = 220,
  sizeB = 200,
}: {
  variant?: keyof typeof VARIANTS;
  /** Icon used for both clusters unless iconA/iconB override it — pick one
   * relevant to the page (e.g. BedDouble for rooms, UtensilsCrossed for
   * dining, PartyPopper for events, Tag for offers). Defaults to a diamond. */
  icon?: LucideIcon;
  iconA?: LucideIcon;
  iconB?: LucideIcon;
  sizeA?: number;
  sizeB?: number;
}) {
  const [colorA, cornerA, colorB, cornerB] = VARIANTS[variant];
  return (
    <>
      <IconCluster icon={iconA ?? icon} color={colorA} corner={cornerA} size={sizeA} />
      <IconCluster icon={iconB ?? icon} color={colorB} corner={cornerB} size={sizeB} />
    </>
  );
}

/** A single icon cluster — for smaller sections that only need one accent. */
export function DecorativeAccent({
  color = "gold",
  corner = "top-right",
  icon = Gem,
  size = 200,
}: {
  color?: IconColor;
  corner?: Corner;
  icon?: LucideIcon;
  size?: number;
}) {
  return <IconCluster icon={icon} color={color} corner={corner} size={size} />;
}
