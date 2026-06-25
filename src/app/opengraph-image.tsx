import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Amason — Swedish supergroup · new album 2027";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#07070b",
          backgroundImage:
            "radial-gradient(60% 70% at 15% 20%, rgba(124,92,255,0.55), transparent 70%), radial-gradient(60% 70% at 85% 30%, rgba(255,93,177,0.5), transparent 70%), radial-gradient(70% 80% at 60% 100%, rgba(255,184,107,0.45), transparent 70%)",
          color: "#f5f2ec",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#cfc9dc",
          }}
        >
          New album · 2027
        </div>
        <div
          style={{
            fontSize: 240,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          AMASON
        </div>
        <div style={{ fontSize: 34, color: "#cfc9dc", maxWidth: 900 }}>
          Swedish supergroup — Amanda Bergman · Dungen · Miike Snow
        </div>
      </div>
    ),
    { ...size },
  );
}
