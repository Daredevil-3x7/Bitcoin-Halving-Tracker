"use client"

import { useEffect, useState } from "react"
import { getNextHalving } from "@/lib/halving-dates"

interface CountdownDuration {
  years: number
  days: number
  hours: number
  minutes: number
}

export function HalvingCountdown() {
  const [currentHalving, setCurrentHalving] = useState<{ phase: string; date: Date; milestone: string } | null>(null)
  const [duration, setDuration] = useState<CountdownDuration>({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const nextHalving = getNextHalving()
    setCurrentHalving(nextHalving)
  }, [])

  useEffect(() => {
    if (!currentHalving) return

    const calculateDuration = () => {
      const now = new Date()

      if (now >= currentHalving.date) {
        const nextHalving = getNextHalving()
        if (nextHalving) {
          setCurrentHalving(nextHalving)
        } else {
          setDuration({ years: 0, days: 0, hours: 0, minutes: 0 })
        }
        return
      }

      const totalSeconds = Math.floor((currentHalving.date.getTime() - now.getTime()) / 1000)

      const years = Math.floor(totalSeconds / (365.25 * 24 * 60 * 60))
      const remainingAfterYears = totalSeconds - years * 365.25 * 24 * 60 * 60

      const days = Math.floor(remainingAfterYears / (24 * 60 * 60))
      const remainingAfterDays = remainingAfterYears - days * 24 * 60 * 60

      const hours = Math.floor(remainingAfterDays / (60 * 60))
      const remainingAfterHours = remainingAfterDays - hours * 60 * 60

      const minutes = Math.floor(remainingAfterHours / 60)

      setDuration({
        years,
        days,
        hours,
        minutes,
      })
    }

    calculateDuration()
    const timer = setInterval(calculateDuration, 60000) // Update every minute instead of every second

    return () => clearInterval(timer)
  }, [currentHalving])

  if (!isMounted || !currentHalving) {
    return <div className="h-32 animate-pulse bg-muted/10 rounded-xl" />
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-3xl mx-auto px-2 md:px-0">
      <div className="text-center mb-2">
        <h3 className="text-sm md:text-base font-mono text-primary/80 mb-1">Counting down to</h3>
        <h2 className="text-xl md:text-2xl font-mono font-bold text-primary uppercase tracking-wide">
          {currentHalving.phase}
        </h2>
        <p className="text-xs md:text-sm font-mono text-muted-foreground mt-1">
          Supply Milestone: {currentHalving.milestone} TAO
        </p>
      </div>

      <div className="relative group">
        <div className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors cursor-help">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs font-mono">Estimated Date</span>
        </div>

        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 md:w-80 p-4 bg-yellow-900/95 border border-yellow-600/50 rounded-sm backdrop-blur-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="text-xs font-mono space-y-2">
            <p className="text-yellow-200 leading-relaxed">
              The actual halving date changes due to daily TAO recycling. This estimate assumes current recycling rates
              continue.
            </p>
            <p className="text-yellow-200/70 text-[10px]">
              <span className="font-bold">TIP:</span> Revisit periodically for updated estimates.
            </p>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="border-8 border-transparent border-t-yellow-900/95" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
        <TimeUnit value={duration.years} label="YEARS" />
        <TimeUnit value={duration.days} label="DAYS" />
        <TimeUnit value={duration.hours} label="HOURS" />
        <TimeUnit value={duration.minutes} label="MINUTES" />
      </div>

      <div className="flex justify-center">{/* Removed ShareDialog component */}</div>
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-6 bg-card/30 backdrop-blur-sm border border-border/50 rounded-sm hover:border-primary/50 transition-colors relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="text-3xl sm:text-5xl md:text-7xl font-mono font-bold tracking-tighter text-primary tabular-nums relative z-10">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] md:text-sm text-muted-foreground font-mono mt-2 tracking-widest relative z-10">
        {label}
      </span>
    </div>
  )
}
