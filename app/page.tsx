"use client"

import { useState } from "react"
import { HalvingCountdown } from "@/components/halving-countdown"
import { StatsGrid } from "@/components/stats-grid"
import { SupplyCalculator } from "@/components/supply-calculator"
import { NetworkBackground } from "@/components/network-background"
import { ScanningBeam } from "@/components/scanning-beam"
import { LiveBlockCounter } from "@/components/live-block-counter"
import { Button } from "@/components/ui/button"
import { FaqSection } from "@/components/faq-section"
import { GlossarySection } from "@/components/glossary-section"
import { HalvingScheduleTable } from "@/components/halving-schedule-table"
import { MouseTrail } from "@/components/mouse-trail"
import { MobileNav } from "@/components/mobile-nav"
import { CelebrationBanner } from "@/components/celebration-banner"
import { Terminal, ExternalLink } from "lucide-react"
import Link from "next/link"
import { AddToCalendar } from "@/components/add-to-calendar"
import { CustomVideoPlayer } from "@/components/custom-video-player"
import { getNextHalving } from "@/lib/halving-dates"

export default function Home() {
  const [currentBlock, setCurrentBlock] = useState<number>(0)
  const nextHalving = getNextHalving()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Bittensor Halving Countdown",
    description:
      "Track the Bittensor (TAO) halving schedule with live countdown, block rewards, and emission statistics.",
    url: "https://bittensor-halving.com",
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: "Bittensor Halving Tracker",
      logo: "https://bittensor-halving.com/icon.svg",
      sameAs: ["https://x.com/daredevil3x7"],
    },
    creator: {
      "@type": "Person",
      name: "Daredevil3x7",
      url: "https://x.com/daredevil3x7",
    },
    about: {
      "@type": "Thing",
      name: "Bittensor",
      description: "Decentralized AI network using Proof of Intelligence consensus",
    },
    keywords: "Bittensor, TAO, Halving, Cryptocurrency, AI, Decentralized Intelligence, Blockchain",
  }

  return (
    <div className="min-h-screen relative flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <NetworkBackground />
      <MouseTrail />

      {/* Celebration Banner */}
      <CelebrationBanner />

      {/* Header */}
      <header className="w-full border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 sm:gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center flex-shrink-0">
              <img src="/bittensor-logo.png" alt="Bittensor Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <span className="font-mono font-bold text-base sm:text-lg tracking-tight hidden sm:inline-block">
              BITTENSOR HALVING
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            <Link
              href="/partner"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              Be our Partner
            </Link>
            <Link href="#faq" className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono">
              FAQ
            </Link>
            <Link
              href="#glossary"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono"
            >
              Glossary
            </Link>
            <Link
              href="https://docs.learnbittensor.org/"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono flex items-center gap-1"
            >
              Docs <ExternalLink className="w-3 h-3" />
            </Link>
            <Link
              href="https://taostats.io/"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono flex items-center gap-1"
            >
              Network <ExternalLink className="w-3 h-3" />
            </Link>
          </nav>

          <MobileNav />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 flex flex-col gap-10 sm:gap-16 md:gap-24">
        {/* Hero Section */}
        <section
          className="flex flex-col items-center justify-center gap-6 sm:gap-8 text-center pt-4 sm:pt-10 pb-4 sm:pb-6 relative"
          aria-labelledby="hero-heading"
        >
          <ScanningBeam className="opacity-50" triggerScan={currentBlock} />

          <div className="space-y-3 sm:space-y-4 max-w-3xl relative z-10">
            <LiveBlockCounter onBlockUpdate={setCurrentBlock} />
            <h2
              id="hero-heading"
              className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tighter font-mono leading-tight"
            >
              THE NEXT ERA OF
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                MACHINE INTELLIGENCE
              </span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-mono text-xs sm:text-sm md:text-base leading-relaxed px-4 sm:px-0">
              Tracking the deflationary mechanics of the Bittensor network. The halving event reduces emission by 50%,
              increasing scarcity for the world's neural network.
            </p>
          </div>

          <div className="w-full">
            <HalvingCountdown />

            {nextHalving && (
              <div className="flex justify-center mt-4 sm:mt-6">
                <AddToCalendar
                  date={nextHalving.date}
                  title={`Bittensor (TAO) ${nextHalving.phase}`}
                  description={`The ${nextHalving.phase} Bittensor Halving event. Block reward will be reduced by 50%.`}
                />
              </div>
            )}

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <Button
                asChild
                className="font-mono h-11 sm:h-12 px-6 sm:px-8 rounded-sm text-sm sm:text-base bg-white text-black hover:bg-white/90 w-full sm:w-auto"
                size="lg"
              >
                <Link href="https://bittensor.com/whitepaper" target="_blank">
                  <Terminal className="mr-2 h-4 w-4" />
                  Read Whitepaper
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="font-mono h-11 sm:h-12 px-6 sm:px-8 rounded-sm text-sm sm:text-base border-white/20 hover:bg-white/10 bg-transparent w-full sm:w-auto"
                size="lg"
              >
                <Link href="https://www.coingecko.com/en/coins/bittensor" target="_blank" className="flex items-center">
                  Buy TAO <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="relative w-full max-w-5xl mx-auto" aria-label="Bittensor Network Video">
          <CustomVideoPlayer src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video5303223955501384139-3h360Ch5ppifpiDjh3ULLQceYltM8H.mp4" poster="/bittensor-logo.png" />
        </section>

        {/* Stats Grid */}
        <section aria-labelledby="stats-heading">
          <h2 id="stats-heading" className="sr-only">
            Network Statistics
          </h2>
          <StatsGrid />
        </section>

        {/* Halving Schedule Table */}
        <section className="space-y-4" aria-labelledby="schedule-heading">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <h2 id="schedule-heading" className="font-mono text-sm text-white/40">
              ISSUANCE SCHEDULE
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <HalvingScheduleTable />
        </section>

        {/* Chart Section */}
        <section className="grid lg:grid-cols-3 gap-6 sm:gap-8" aria-labelledby="calculator-heading">
          <div className="lg:col-span-2">
            <h2 id="calculator-heading" className="sr-only">
              Supply Calculator
            </h2>
            <SupplyCalculator />
          </div>
          <div className="space-y-4 sm:space-y-6 flex flex-col justify-center">
            <div className="bg-card/30 border border-white/10 p-5 sm:p-6 rounded-sm backdrop-blur-sm">
              <h3 className="font-mono font-bold mb-3 sm:mb-4 text-base sm:text-lg text-primary">
                What is the Halving?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4 font-mono">
                Similar to Bitcoin, Bittensor (TAO) has a fixed supply cap of 21,000,000 tokens. To control inflation,
                the block reward is cut in half at specific supply milestones.
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-mono">
                This "Halving" reduces the rate at which new TAO is created, theoretically increasing scarcity and value
                over time assuming demand remains constant or grows.
              </p>
            </div>

            <div className="bg-card/30 border border-white/10 p-5 sm:p-6 rounded-sm backdrop-blur-sm">
              <h3 className="font-mono font-bold mb-3 sm:mb-4 text-base sm:text-lg text-primary">Key Data</h3>
              <ul className="space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted-foreground">Ticker</span>
                  <span>TAO</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted-foreground">Algorithm</span>
                  <span className="flex items-center gap-2 group relative">
                    <span>Proof of Intelligence</span>
                    <svg
                      className="w-4 h-4 text-yellow-500 hover:text-yellow-400 transition-colors cursor-help flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="absolute bottom-full right-0 mb-2 w-64 sm:w-72 p-3 bg-black/95 border border-yellow-600/50 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 shadow-xl">
                      <p className="text-xs font-mono text-yellow-100/90 leading-relaxed">
                        Bittensor's consensus mechanism where validators assess the quality and usefulness of AI model
                        outputs from miners. Network participants earn TAO by contributing valuable machine
                        intelligence.
                      </p>
                    </div>
                  </span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-muted-foreground">Max Supply</span>
                  <span>21,000,000</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Halving Schedule</span>
                  <span>Every ~4 Years</span>
                </li>
              </ul>
              <Link
                href="https://coinmarketcap.com/currencies/bittensor/"
                target="_blank"
                className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:py-2 rounded-sm bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-mono transition-colors"
              >
                View Live Price <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="sr-only">
            Frequently Asked Questions
          </h2>
          <FaqSection />
        </section>

        {/* Glossary Section */}
        <section aria-labelledby="glossary-heading">
          <h2 id="glossary-heading" className="sr-only">
            Glossary
          </h2>
          <GlossarySection />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12 mt-12">
        <div className="container mx-auto px-4 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3 border-b border-white/10 pb-6">
            <p className="text-sm text-muted-foreground font-mono">
              Made with curiosity by{" "}
              <Link
                href="https://x.com/daredevil3x7"
                target="_blank"
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                Daredevil3x7
              </Link>
            </p>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-sm px-4 py-2">
              <span className="text-xs text-muted-foreground font-mono">TAO Wallet:</span>
              <code className="text-xs font-mono text-white/90">5GxjL65bRAHTuDh2Zpziu4adGTDSLaWXa5vp65tJCECu2BtA</code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("5GxjL65bRAHTuDh2Zpziu4adGTDSLaWXa5vp65tJCECu2BtA")
                  const btn = document.activeElement as HTMLButtonElement
                  const originalText = btn.textContent
                  btn.textContent = "Copied!"
                  setTimeout(() => {
                    btn.textContent = originalText
                  }, 2000)
                }}
                className="text-xs font-mono text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded hover:bg-white/5"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-muted-foreground font-mono">
              © 2025 Bittensor Halving Tracker. Not official Bittensor site.
            </p>
            <nav className="flex gap-8" aria-label="Social media links">
              <Link
                href="https://github.com/Daredevil-3x7/Bitcoin-Halving-Tracker"
                target="_blank"
                className="text-xs text-muted-foreground hover:text-white font-mono uppercase tracking-wider"
              >
                GitHub
              </Link>
              <Link
                href="https://x.com/opentensor"
                target="_blank"
                className="text-xs text-muted-foreground hover:text-white font-mono uppercase tracking-wider"
              >
                Twitter
              </Link>
              <Link
                href="https://discord.gg/bittensor"
                target="_blank"
                className="text-xs text-muted-foreground hover:text-white font-mono uppercase tracking-wider"
              >
                Discord
              </Link>
              <Link
                href="https://bittensor.com"
                target="_blank"
                className="text-xs text-muted-foreground hover:text-white font-mono uppercase tracking-wider"
              >
                Opentensor
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
