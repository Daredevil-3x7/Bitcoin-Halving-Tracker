"use client"

import { useState } from "react"
import { Menu, X, ExternalLink, Heart } from "lucide-react"
import Link from "next/link"
import { TipDialog } from "@/components/tip-dialog"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTipDialog, setShowTipDialog] = useState(false)

  const handleTipClick = () => {
    setIsOpen(false)
    setShowTipDialog(true)
  }

  return (
    <>
      <div className="md:hidden">
        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-white hover:text-primary transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />

            {/* Menu Panel */}
            <div className="fixed top-14 right-0 w-64 bg-black/95 border-l border-b border-white/10 shadow-2xl z-50 animate-in slide-in-from-right">
              <nav className="flex flex-col p-4 gap-1">
                <Link
                  href="#faq"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm text-white hover:bg-white/10 rounded-sm transition-colors font-mono"
                >
                  FAQ
                </Link>
                <Link
                  href="#glossary"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm text-white hover:bg-white/10 rounded-sm transition-colors font-mono"
                >
                  Glossary
                </Link>
                <Link
                  href="https://docs.learnbittensor.org/"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm text-white hover:bg-white/10 rounded-sm transition-colors font-mono flex items-center justify-between"
                >
                  Docs
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <Link
                  href="https://taostats.io/"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm text-white hover:bg-white/10 rounded-sm transition-colors font-mono flex items-center justify-between"
                >
                  Network
                  <ExternalLink className="w-4 h-4" />
                </Link>

                <button
                  onClick={handleTipClick}
                  className="mt-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 rounded-sm transition-colors font-mono flex items-center gap-2 border border-red-500/30"
                >
                  <Heart className="w-4 h-4 fill-red-500/50" />
                  Support
                </button>
              </nav>
            </div>
          </>
        )}
      </div>

      <TipDialog open={showTipDialog} onOpenChange={setShowTipDialog} />
    </>
  )
}
