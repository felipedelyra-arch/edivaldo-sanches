// "ES" monogram drawn as plan lines: the E's spine is a wall, the S an orthogonal stair, a dimension line below.
export const MONOGRAM_PATHS = [
  "M8 8 V84",
  "M8 8 H46",
  "M8 46 H38",
  "M8 84 H46",
  "M112 8 H62 V46 H112 V84 H62",
  "M0 96 H120",
  "M0 92 V100",
  "M120 92 V100",
];

export function Monogram({ className, title, strokeWidth = 4 }: { className?: string; title?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="-2 -2 124 104" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title ? <title>{title}</title> : null}
      {MONOGRAM_PATHS.map((d) => (
        <path key={d} d={d} pathLength={1} className="stroke" strokeWidth={strokeWidth} data-mono="" />
      ))}
    </svg>
  );
}
