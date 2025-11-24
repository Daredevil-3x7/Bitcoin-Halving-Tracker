"use client"
import { cn } from "@/lib/utils"

interface ScanningBeamProps {
  className?: string
  triggerScan?: number // Add trigger prop to sync with block updates
}

export function ScanningBeam({ className, triggerScan }: ScanningBeamProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {triggerScan !== undefined && (
        <div key={triggerScan} className="absolute inset-0">
          <div className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-scan-block skew-x-12 blur-sm" />
          <div className="absolute top-0 bottom-0 w-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan-block skew-x-12 blur-md" />
        </div>
      )}
    </div>
  )
}
