import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const geist = Geist({ subsets: ["latin"], display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bittensor-halving.com"),
  title: "Bittensor Halving Countdown | TAO Halving Schedule & Stats",
  description:
    "Track the Bittensor (TAO) halving schedule. Live countdown, block rewards, inflation stats, and Stock-to-Flow model comparison with Bitcoin. Learn about decentralized AI mining.",
  keywords: [
    "Bittensor",
    "TAO",
    "Halving",
    "Countdown",
    "Crypto",
    "AI",
    "Decentralized Intelligence",
    "Stock to Flow",
    "Blockchain",
  ],
  openGraph: {
    title: "Bittensor Halving Countdown",
    description: "The next era of machine intelligence scarcity. Track the TAO halving event.",
    type: "website",
    siteName: "Bittensor-Halving.com",
    url: "https://bittensor-halving.com",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Bittensor Halving Countdown",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bittensor Halving Countdown",
    description: "The next era of machine intelligence scarcity. Track the TAO halving event.",
    images: ["/api/og"],
    creator: "@daredevil3x7",
  },
  generator: "v0.app",
  icons: {
    icon: "/bittensor-logo.png",
    shortcut: "/bittensor-logo.png",
    apple: "/bittensor-logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geist.className} ${geistMono.className} font-sans antialiased bg-background text-foreground min-h-screen selection:bg-white/20`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
