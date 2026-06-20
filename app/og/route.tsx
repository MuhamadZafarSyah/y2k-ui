import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #8ed1fc 0%, #ff8fcf 50%, #b69cff 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, #1b1b3a 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.08,
          }}
        />

        {/* Y2K Window Chrome */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 700,
            border: "4px solid #1b1b3a",
            borderRadius: 12,
            background: "white",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#ffe45e",
              padding: "12px 16px",
              borderBottom: "4px solid #1b1b3a",
            }}
          >
            {/* Window controls */}
            <div style={{ display: "flex", gap: 6 }}>
              <div
                style={{
                  width: 16,
                  height: 16,
                  border: "2px solid #1b1b3a",
                  borderRadius: 4,
                  background: "white",
                }}
              />
              <div
                style={{
                  width: 16,
                  height: 16,
                  border: "2px solid #1b1b3a",
                  borderRadius: 4,
                  background: "white",
                }}
              />
              <div
                style={{
                  width: 16,
                  height: 16,
                  border: "2px solid #1b1b3a",
                  borderRadius: 4,
                  background: "white",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 14,
                fontWeight: 900,
                color: "#1b1b3a",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              y2kui.dev
            </span>
          </div>

          {/* Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "48px 32px",
              gap: 16,
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  border: "4px solid #1b1b3a",
                  borderRadius: 12,
                  background: "#ffe45e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  fontWeight: 900,
                  color: "#1b1b3a",
                }}
              >
                Y
              </div>
              <span
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  color: "#1b1b3a",
                  letterSpacing: "-0.02em",
                }}
              >
                Y2K UI
              </span>
            </div>

            {/* Tagline */}
            <p
              style={{
                fontSize: 20,
                color: "#1b1b3a",
                textAlign: "center",
                maxWidth: 500,
                lineHeight: 1.5,
                opacity: 0.8,
              }}
            >
              Modern Y2K / kawaii-retro component library
              <br />
              Built on shadcn + Radix UI
            </p>

            {/* Color swatches */}
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              {["#8ed1fc", "#ff8fcf", "#b69cff", "#8ff0d0", "#ffe45e"].map(
                (color) => (
                  <div
                    key={color}
                    style={{
                      width: 32,
                      height: 32,
                      border: "2px solid #1b1b3a",
                      borderRadius: 6,
                      background: color,
                    }}
                  />
                )
              )}
            </div>

            {/* Stats */}
            <div
              style={{
                display: "flex",
                gap: 24,
                marginTop: 16,
                fontSize: 14,
                fontWeight: 700,
                color: "#1b1b3a",
              }}
            >
              <span>30+ Components</span>
              <span>·</span>
              <span>MIT License</span>
              <span>·</span>
              <span>Free &amp; Open Source</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
