"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Heart, Copy, Check, ExternalLink } from "lucide-react"

interface TipDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TipDialog({ open, onOpenChange }: TipDialogProps) {
  const [copied, setCopied] = useState(false)
  const walletAddress = "5GxjL65bRAHTuDh2Zpziu4adGTDSLaWXa5vp65tJCECu2BtA"

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("[v0] Failed to copy wallet address:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-black/95 border border-white/20 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="font-mono text-xl flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            Support This Project
          </DialogTitle>
          <DialogDescription className="font-mono text-muted-foreground pt-2">
            Help keep this resource free and up-to-date
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-sm p-4 space-y-3">
            <p className="text-sm font-mono text-white/90 leading-relaxed">
              I'm happy to contribute to Bittensor and create more reach for the ecosystem. If you like to tip my
              effort, send TAO to the wallet below.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              TAO Wallet Address
            </label>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-black/50 border border-white/10 rounded-sm p-3 font-mono text-xs text-white/90 break-all">
                {walletAddress}
              </div>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="icon"
                className="h-11 w-11 flex-shrink-0 border-white/20 hover:bg-white/10 rounded-sm bg-transparent"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {copied && (
              <p className="text-xs font-mono text-green-500 flex items-center gap-1">
                <Check className="h-3 w-3" /> Address copied to clipboard!
              </p>
            )}
          </div>

          <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-sm p-3">
            <p className="text-xs font-mono text-yellow-100/80 leading-relaxed flex items-center gap-2">
              <span className="font-bold">Created by:</span>
              <a
                href="https://x.com/daredevil3x7"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-50 transition-colors underline underline-offset-2 flex items-center gap-1"
              >
                Daredevil3x7
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
