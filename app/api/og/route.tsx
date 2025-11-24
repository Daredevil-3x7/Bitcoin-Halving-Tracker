import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET() {
  const targetDate = new Date("2025-12-13T00:48:06Z")
  const now = new Date()

  const diff = targetDate.getTime() - now.getTime()

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  // Basic styling variables
  const bg = "#000000"
  const fg = "#ffffff"
  const muted = "#666666"

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: bg,
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {/* Simple Logo Representation */}
        <div style={{ display: "flex", color: fg, fontSize: 40, fontWeight: "bold" }}>BITTENSOR HALVING</div>
      </div>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 80, fontWeight: "bold", color: fg }}>{days}</span>
          <span style={{ fontSize: 24, color: muted }}>DAYS</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 80, fontWeight: "bold", color: fg }}>:</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 80, fontWeight: "bold", color: fg }}>{hours}</span>
          <span style={{ fontSize: 24, color: muted }}>HOURS</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 80, fontWeight: "bold", color: fg }}>:</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 80, fontWeight: "bold", color: fg }}>{minutes}</span>
          <span style={{ fontSize: 24, color: muted }}>MINS</span>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 24,
          color: muted,
        }}
      >
        ESTIMATED DEC 13, 2025
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  )
}
