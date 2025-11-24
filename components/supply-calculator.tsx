"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { TrendingUp, Clock, Coins } from "lucide-react"

// Current supply as of Dec 2024
const CURRENT_SUPPLY = 10_273_217
const CURRENT_BLOCK_REWARD = 1.0
const BLOCKS_PER_DAY = 7200 // 1 block every 12 seconds
const MAX_SUPPLY = 21_000_000

function generateHalvingSchedule() {
  const halvings = []
  let supply = 10_500_000 // First halving at 50% of max supply
  let reward = 0.5 // Reward after first halving
  const year = 2025

  // Generate halvings until reward becomes negligible (continue indefinitely)
  for (let i = 0; i < 20; i++) {
    // Generate 20 halvings to cover extreme timeframes
    halvings.push({
      supply: supply,
      date: new Date(`${year + 4 * i}-12-10`),
      reward: reward,
    })

    // Next halving occurs when we add half of remaining supply
    const remaining = MAX_SUPPLY - supply
    supply = supply + remaining / 2
    reward = reward / 2
  }

  return halvings
}

const HALVINGS = generateHalvingSchedule()

export function SupplyCalculator() {
  const [days, setDays] = useState([365])

  const calculation = useMemo(() => {
    const targetDays = days[0]
    let accumulatedSupply = CURRENT_SUPPLY
    let totalIssued = 0
    let currentReward = CURRENT_BLOCK_REWARD

    for (const halving of HALVINGS) {
      if (accumulatedSupply >= halving.supply) {
        currentReward = halving.reward
      } else {
        break // Stop once we find the next halving
      }
    }

    for (let day = 0; day < targetDays; day++) {
      const dailyEmission = BLOCKS_PER_DAY * currentReward

      // Check if we cross a halving threshold this day
      const nextHalving = HALVINGS.find(
        (h) => accumulatedSupply < h.supply && accumulatedSupply + dailyEmission >= h.supply,
      )

      if (nextHalving) {
        // Calculate emission before and after halving
        const blocksBeforeHalving = Math.floor((nextHalving.supply - accumulatedSupply) / currentReward)
        const emissionBeforeHalving = blocksBeforeHalving * currentReward
        const blocksAfterHalving = BLOCKS_PER_DAY - blocksBeforeHalving
        const emissionAfterHalving = blocksAfterHalving * nextHalving.reward

        const totalDailyEmission = emissionBeforeHalving + emissionAfterHalving
        totalIssued += totalDailyEmission
        accumulatedSupply += totalDailyEmission
        currentReward = nextHalving.reward
      } else {
        totalIssued += dailyEmission
        accumulatedSupply += dailyEmission
      }

      // Cap at max supply
      if (accumulatedSupply >= MAX_SUPPLY) {
        accumulatedSupply = MAX_SUPPLY
        break
      }
    }

    const finalSupply = Math.min(accumulatedSupply, MAX_SUPPLY)
    const percentOfMax = (finalSupply / MAX_SUPPLY) * 100

    return {
      totalIssued: Math.round(totalIssued),
      finalSupply: Math.round(finalSupply),
      percentOfMax: percentOfMax.toFixed(2),
      avgDailyEmission: Math.round(totalIssued / targetDays),
    }
  }, [days])

  const timeframePresets = [
    { label: "1 Month", days: 30 },
    { label: "3 Months", days: 90 },
    { label: "6 Months", days: 180 },
    { label: "1 Year", days: 365 },
    { label: "2 Years", days: 730 },
    { label: "5 Years", days: 1825 },
  ]

  return (
    <Card className="w-full bg-card/50 border-border/50 backdrop-blur-sm rounded-sm">
      <CardHeader>
        <CardTitle className="font-mono tracking-tight">TAO SUPPLY CALCULATOR</CardTitle>
        <CardDescription className="font-mono">
          Project future TAO issuance and circulating supply across different timeframes. Includes upcoming halving
          events.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Timeframe Selector */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
            <Label className="font-mono text-xs sm:text-sm text-muted-foreground">Select Timeframe (Days)</Label>
            <div className="relative w-full sm:w-32">
              <Input
                type="number"
                value={days[0]}
                onChange={(e) => {
                  const val = Number.parseInt(e.target.value)
                  if (!isNaN(val) && val >= 0) setDays([val])
                }}
                className="font-mono text-right pr-8 h-9 sm:h-8 bg-black/20 border-white/10 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground font-mono">
                d
              </span>
            </div>
          </div>

          <Slider value={days} onValueChange={setDays} min={1} max={3650} step={1} className="w-full" />

          {/* Quick Presets */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {timeframePresets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => setDays([preset.days])}
                className={`px-3 py-2.5 sm:py-2 rounded-sm border font-mono text-xs transition-all ${
                  days[0] === preset.days
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card/30 border-white/10 hover:border-white/30 hover:bg-card/50"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-white/10">
          {/* TAO Issued */}
          <div className="bg-background/50 border border-white/10 p-4 rounded-sm">
            <div className="flex items-center gap-2 mb-2">
              <Coins className="w-4 h-4 text-primary" />
              <h4 className="font-mono text-xs text-muted-foreground uppercase">TAO Issued</h4>
            </div>
            <p className="font-mono text-xl sm:text-2xl font-bold text-primary break-all">
              {calculation.totalIssued.toLocaleString()}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-1">
              Avg: {calculation.avgDailyEmission.toLocaleString()} TAO/day
            </p>
          </div>

          {/* Final Circulating Supply */}
          <div className="bg-background/50 border border-white/10 p-4 rounded-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h4 className="font-mono text-xs text-muted-foreground uppercase">Final Supply</h4>
            </div>
            <p className="font-mono text-xl sm:text-2xl font-bold text-primary break-all">
              {calculation.finalSupply.toLocaleString()}
            </p>
            <p className="font-mono text-xs text-muted-foreground mt-1">{calculation.percentOfMax}% of max supply</p>
          </div>

          {/* Time Period */}
          <div className="bg-background/50 border border-white/10 p-4 rounded-sm sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-primary" />
              <h4 className="font-mono text-xs text-muted-foreground uppercase">Time Period</h4>
            </div>
            <p className="font-mono text-xl sm:text-2xl font-bold text-primary">{days[0]}</p>
            <p className="font-mono text-xs text-muted-foreground mt-1">{(days[0] / 365).toFixed(1)} years</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-card/30 border border-white/10 p-4 rounded-sm">
          <h4 className="font-mono text-xs text-muted-foreground uppercase mb-3">Supply Breakdown</h4>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Supply:</span>
              <span className="text-primary">{CURRENT_SUPPLY.toLocaleString()} TAO</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">New Issuance:</span>
              <span className="text-green-500">+{calculation.totalIssued.toLocaleString()} TAO</span>
            </div>
            <div className="h-px bg-white/10 my-2" />
            <div className="flex justify-between font-bold">
              <span>Projected Supply:</span>
              <span className="text-primary">{calculation.finalSupply.toLocaleString()} TAO</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Remaining Until Max:</span>
              <span className="text-muted-foreground">
                {(MAX_SUPPLY - calculation.finalSupply).toLocaleString()} TAO
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between font-mono text-xs text-muted-foreground">
            <span>Supply Progress</span>
            <span>{calculation.percentOfMax}%</span>
          </div>
          <div className="h-2 bg-background/50 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/50 transition-all duration-500"
              style={{ width: `${calculation.percentOfMax}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
