"use client"

import { NetworkBackground } from "@/components/network-background"
import { MouseTrail } from "@/components/mouse-trail"
import { Button } from "@/components/ui/button"
import { ExternalLink, Mail, Handshake, TrendingUp, Users, Target } from "lucide-react"
import Link from "next/link"

export default function PartnerPage() {
  return (
    <div className="min-h-screen relative flex flex-col">
      <NetworkBackground />
      <MouseTrail />

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

          <Button asChild variant="outline" size="sm" className="font-mono bg-transparent">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Handshake className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-primary">Partnership Opportunities</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter font-mono">
              Be Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">Partner</span>
            </h1>
            <p className="text-lg text-muted-foreground font-mono max-w-2xl mx-auto">
              Reach the most engaged Bittensor community with exclusive advertising placements on the countdown tracker
              for the TAO halving event.
            </p>
          </div>

          {/* Why Advertise */}
          <div className="bg-card/30 border border-white/10 rounded-sm p-8 backdrop-blur-sm">
            <h2 className="text-2xl font-bold font-mono mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Why Advertise on Bittensor-Halving.com?
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-mono font-semibold mb-1">Highly Targeted Audience</h3>
                    <p className="text-sm text-muted-foreground font-mono">
                      TAO holders, validators, and subnet operators actively engaged in the Bittensor ecosystem
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-mono font-semibold mb-1">Growing Traffic</h3>
                    <p className="text-sm text-muted-foreground font-mono">
                      Rapidly accelerating visitor count as the halving event approaches, with high engagement rates
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <ExternalLink className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-mono font-semibold mb-1">Low Bounce Rate</h3>
                    <p className="text-sm text-muted-foreground font-mono">
                      82% of visitors explore multiple sections, demonstrating deep interest and quality traffic
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <Handshake className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-mono font-semibold mb-1">Exclusive Placements</h3>
                    <p className="text-sm text-muted-foreground font-mono">
                      No competing ads, ensuring your message gets maximum visibility and impact
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advertising Placements */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold font-mono">Available Advertising Placements</h2>

            <div className="grid gap-6">
              {/* Hero Banner */}
              <div className="bg-card/30 border border-white/10 rounded-sm p-6 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-mono mb-2">Hero Banner</h3>
                    <p className="text-sm text-muted-foreground font-mono">Above the fold, top center position</p>
                  </div>
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-mono rounded-full">PREMIUM</span>
                </div>
                <p className="text-sm text-muted-foreground font-mono mb-4">
                  Premium placement visible to 100% of visitors immediately upon landing. Maximum impact and brand
                  awareness.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Available
                </div>
              </div>

              {/* Featured Banner */}
              <div className="bg-card/30 border border-white/10 rounded-sm p-6 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-mono mb-2">Featured Banner</h3>
                    <p className="text-sm text-muted-foreground font-mono">
                      Center page, between countdown and content
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-mono rounded-full">POPULAR</span>
                </div>
                <p className="text-sm text-muted-foreground font-mono mb-4">
                  High engagement zone where users naturally focus after viewing the countdown and video. Perfect for
                  announcements.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Available
                </div>
              </div>

              {/* Top Navigation Banner */}
              <div className="bg-card/30 border border-white/10 rounded-sm p-6 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-mono mb-2">Top Navigation Banner</h3>
                    <p className="text-sm text-muted-foreground font-mono">Header position, persistent visibility</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-mono mb-4">
                  Sticky header placement ensures continuous visibility across all pages as users scroll and navigate.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Available
                </div>
              </div>

              {/* Pop-up Notification */}
              <div className="bg-card/30 border border-white/10 rounded-sm p-6 backdrop-blur-sm hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-mono mb-2">Pop-up Notification</h3>
                    <p className="text-sm text-muted-foreground font-mono">Timed appearance after 5-10 seconds</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-mono rounded-full">
                    HIGH IMPACT
                  </span>
                </div>
                <p className="text-sm text-muted-foreground font-mono mb-4">
                  Maximum attention for subnet launches, special offers, or important announcements. Non-intrusive
                  timing.
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Available
                </div>
              </div>
            </div>
          </div>

          {/* Long-Term Vision */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-sm p-8">
            <h2 className="text-2xl font-bold font-mono mb-4">Long-Term Vision & Growth Potential</h2>
            <p className="text-sm text-muted-foreground font-mono mb-4">
              I'm actively expanding the Bittensor ecosystem presence to create a comprehensive network of resources:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm font-mono">
                  <span className="text-white font-semibold">Bittensor-Subnets.com</span> (domain secured) – subnet
                  directory and comparison platform
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm font-mono">
                  SEO-optimized content targeting Bittensor-related search traffic across multiple properties
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p className="text-sm font-mono">
                  Educational resources (FAQ, Glossary, Network stats) to attract developers and investors
                </p>
              </li>
            </ul>
            <p className="text-sm text-primary font-mono font-semibold">
              Early sponsors benefit from grandfathered pricing as traffic scales and can be featured across multiple
              properties as they launch.
            </p>
          </div>

          {/* CTA Section */}
          <div className="bg-card/30 border border-white/10 rounded-sm p-8 text-center backdrop-blur-sm">
            <h2 className="text-2xl font-bold font-mono mb-4">Ready to Partner?</h2>
            <p className="text-muted-foreground font-mono mb-6 max-w-2xl mx-auto">
              Let's discuss which advertising package works best for your goals. Custom solutions available for specific
              requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="font-mono">
                <a href="mailto:Poundmotionstudio@gmail.com" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Me
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-mono bg-transparent">
                <Link href="https://x.com/daredevil3x7" target="_blank" className="flex items-center gap-2">
                  Twitter/X
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-mono bg-transparent">
                <Link
                  href="https://linkedin.com/in/patrik-g-n-bauer"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  LinkedIn
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center text-sm text-muted-foreground font-mono space-y-2">
            <p>Volume discounts available for longer commitments (3, 6, or 12 months)</p>
            <p>Banner design services available • Payment in USD, TAO, or USDC accepted</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            © 2025 Bittensor Halving Tracker. Created by{" "}
            <Link href="https://x.com/daredevil3x7" target="_blank" className="text-primary hover:underline">
              Daredevil3x7
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
