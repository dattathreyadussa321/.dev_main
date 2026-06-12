import { ImageResponse } from "next/og";

export const runtime = "edge";

/** Dynamic Open Graph image served at /og.png. */
export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #060913 0%, #0b101f 55%, #111a3a 100%)",
          color: "#e8ecf8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg, #4f46e5, #7c3aed, #0ea5a4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 700,
              color: "white",
            }}
          >
            P
          </div>
          <div style={{ fontSize: 44, fontWeight: 700 }}>Patashala.Dev</div>
        </div>
        <div style={{ marginTop: 48, fontSize: 64, fontWeight: 700, lineHeight: 1.15, maxWidth: 980 }}>
          Build, Launch & Scale Modern Software
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "#98a2bd", maxWidth: 920 }}>
          SaaS · LMS · CRM · Full-Stack Development · Practical Training · AgriTech Innovation
        </div>
        <div style={{ marginTop: 56, fontSize: 26, color: "#818cf8" }}>patashala.dev</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
