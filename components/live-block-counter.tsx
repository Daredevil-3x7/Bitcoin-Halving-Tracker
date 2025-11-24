"use client"

import { useEffect, useState, useRef } from "react"

interface LiveBlockCounterProps {
  onBlockUpdate?: (blockNumber: number) => void
}

export function LiveBlockCounter({ onBlockUpdate }: LiveBlockCounterProps) {
  const [currentBlock, setCurrentBlock] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const hasInitialized = useRef(false)

  useEffect(() => {
    const calculateEstimatedBlock = () => {
      const genesisTimestamp = new Date("2023-03-28T00:00:00Z").getTime()
      const now = Date.now()
      const secondsElapsed = (now - genesisTimestamp) / 1000
      const estimatedBlock = Math.floor(secondsElapsed / 12)
      return estimatedBlock
    }

    const initialBlock = calculateEstimatedBlock()
    setCurrentBlock(initialBlock)
    setIsLoading(false)
    hasInitialized.current = true
  }, [])

  useEffect(() => {
    if (hasInitialized.current && currentBlock !== null && onBlockUpdate) {
      onBlockUpdate(currentBlock)
    }
  }, [currentBlock, onBlockUpdate])

  useEffect(() => {
    if (!hasInitialized.current) return

    const interval = setInterval(() => {
      setCurrentBlock((prev) => (prev !== null ? prev + 1 : null))
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading || currentBlock === null) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-muted-foreground">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        NETWORK ACTIVE • LOADING...
      </div>
    )
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-muted-foreground">
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      NETWORK ACTIVE • BLOCK {currentBlock.toLocaleString()}
    </div>
  )
}
