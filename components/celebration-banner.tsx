"use client"

import { useState } from "react"
import { X, Sparkles } from "lucide-react"

export function CelebrationBanner() {
  const [isVisible, setIsVisible] = useState(true)

  const halvingDate = new Date("2024-12-15T00:00:00Z")
  const today = new Date()
  const hasHalvingHappened = today >= halvingDate

  if (!hasHalvingHappened || !isVisible) {
    return null
  }

  return (
    <div className="w-full bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 border-b border-yellow-500/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent animate-pulse" />

      <div className="container mx-auto px-4 py-3 sm:py-4 relative">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 animate-pulse flex-shrink-0" />
          <div className="text-center">
            <p className="font-mono text-sm sm:text-base md:text-lg font-bold text-white">
              🎉 The First Bittensor Halving Happened on December 15th! 🎉
            </p>
            <p className="font-mono text-xs sm:text-sm text-yellow-100/80 mt-1">
              Block reward reduced from 1.0 TAO to 0.5 TAO
            </p>
          </div>
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 animate-pulse flex-shrink-0" />

          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            aria-label="Close celebration banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
