// Line drawings for works that have no photograph yet.
const DRAWINGS: Record<string, string[]> = {
  teatro: [
    "M20 170 H380",
    "M60 170 V80 H340 V170",
    "M40 80 L200 30 L360 80",
    "M110 170 V110 H150 V170 M180 170 V110 H220 V170 M250 170 V110 H290 V170",
    "M60 95 H340",
    "M20 185 H380 M20 180 V190 M380 180 V190",
  ],
  banco: [
    "M40 40 H360 V180 H40 Z",
    "M40 110 H360",
    "M140 40 V180 M260 40 V180",
    "M60 60 H120 V90 H60 Z M160 60 H240 V90 H160 Z M280 60 H340 V90 H280 Z",
    "M60 130 h12 v30 h-12 Z M84 130 h12 v30 h-12 Z M108 130 h12 v30 h-12 Z",
    "M190 180 A20 20 0 0 1 210 160",
    "M40 195 H360 M40 190 V200 M360 190 V200",
  ],
  camara: [
    "M30 170 H370",
    "M70 170 V70 H330 V170",
    "M70 70 H330 L310 50 H90 Z",
    "M100 170 V100 M140 170 V100 M180 170 V100 M220 170 V100 M260 170 V100 M300 170 V100",
    "M175 170 V130 H225 V170",
    "M340 70 V30 L360 36 L340 42",
  ],
  revista: [
    "M110 20 H300 V190 H110 Z",
    "M130 40 H280 V120 H130 Z",
    "M150 110 V80 L205 55 L260 80 V110",
    "M130 140 H280 M130 152 H250 M130 164 H265",
    "M300 30 L316 36 V196 L126 196 L110 190",
  ],
};

export function TechDrawing({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 400 210" className={className} aria-hidden="true" data-draw>
      {(DRAWINGS[name] ?? []).map((d) => (
        <path key={d} d={d} pathLength={1} className="stroke" />
      ))}
    </svg>
  );
}
