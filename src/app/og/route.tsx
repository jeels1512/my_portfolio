import { ImageResponse } from "next/og";

export const runtime = "edge";

const size = { width: 1200, height: 630 };

// Generated OG image — modern dark navy + teal.
export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0f1c",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 24, color: "#2dd4bf", letterSpacing: 2 }}>
        OFFENSIVE SECURITY · CLOUD PENTESTING
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 92, color: "#e6edf6", fontWeight: 700 }}>
          Jeels Patel
        </div>
        <div style={{ display: "flex", fontSize: 40, color: "#94a6c0", marginTop: 10 }}>
          I break things to learn how they&apos;re secured.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 24,
          color: "#94a6c0",
        }}
      >
        <span style={{ display: "flex" }}>Cybersecurity Student</span>
        <span style={{ display: "flex", alignItems: "center", gap: 12, color: "#2dd4bf" }}>
          <span
            style={{
              display: "flex",
              width: 12,
              height: 12,
              borderRadius: 6,
              background: "#2dd4bf",
            }}
          />
          Toronto, ON
        </span>
      </div>
    </div>,
    { ...size },
  );
}
