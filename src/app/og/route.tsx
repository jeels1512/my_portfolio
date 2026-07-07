import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

// Generated OG image matching the Phosphor Recon look.
export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0b0e11",
        padding: "72px",
        fontFamily: "monospace",
      }}
    >
      <div style={{ display: "flex", fontSize: 22, color: "#8a6430", letterSpacing: 2 }}>
        ~/recon · target acquired
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 96, color: "#ffb454", fontWeight: 700 }}>
          Jeels Patel
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#9ba3ab", marginTop: 8 }}>
          breaks things to learn how they&apos;re secured.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 24,
          color: "#e8e6e1",
        }}
      >
        <span style={{ display: "flex" }}>Offensive Security &amp; Cloud Pentesting</span>
        <span style={{ display: "flex", alignItems: "center", gap: 12, color: "#5fd7a7" }}>
          <span
            style={{
              display: "flex",
              width: 12,
              height: 12,
              borderRadius: 6,
              background: "#5fd7a7",
            }}
          />
          Toronto, ON
        </span>
      </div>
    </div>,
    { ...size },
  );
}
