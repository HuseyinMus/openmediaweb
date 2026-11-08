import { ImageResponse } from "next/og";

export const alt = "Open Media — Better Content. Better Sales.";
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
          padding: 72,
          color: "white",
          backgroundColor: "#0B1120",
          backgroundImage:
            "radial-gradient(circle at 85% 0%, rgba(36,91,255,0.85) 0%, transparent 55%), radial-gradient(circle at 0% 100%, rgba(23,68,212,0.8) 0%, transparent 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 44,
              border: "9px solid #245BFF",
              borderTopColor: "transparent",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 30, letterSpacing: 6, fontWeight: 700 }}>OPEN MEDIA</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>Better Content.</div>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1, color: "#E9FF57" }}>
            Better Sales.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "rgba(255,255,255,0.7)" }}>
            AI-Powered Creative &amp; Digital Growth Studio
          </div>
        </div>
      </div>
    ),
    size,
  );
}
