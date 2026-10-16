import { ImageResponse } from "next/og";
import { MONOGRAM_PATHS } from "@/components/ui/Monogram";
import { content } from "@/content/content";

export const dynamic = "force-static";
export const alt = content.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0f0f0d", color: "#d9d4ca", padding: 72, alignItems: "flex-end", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 96, letterSpacing: -3, lineHeight: 0.95, display: "flex", flexDirection: "column" }}>
            <span>Edivaldo</span>
            <span>Sanches</span>
          </div>
          <div style={{ fontSize: 30, color: "#b8875a" }}>{`${content.brand.role} · ${content.brand.place}`}</div>
        </div>
        <svg width="360" height="312" viewBox="-2 -2 124 104">
          {MONOGRAM_PATHS.map((d) => (
            <path key={d} d={d} fill="none" stroke="#b8875a" strokeWidth="1.6" />
          ))}
        </svg>
      </div>
    ),
    size,
  );
}
