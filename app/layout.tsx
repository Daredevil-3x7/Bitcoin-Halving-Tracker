import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
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
  },
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
      </body>
    </html>
  )
}
