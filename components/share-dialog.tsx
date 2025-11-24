"use client"

import { useState, useEffect } from "react"
import { Copy, Check, Share2, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ShareDialog() {
  const [copied, setCopied] = useState(false)
  const [url, setUrl] = useState("")
  const [embedCode, setEmbedCode] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentUrl = window.location.origin
      setUrl(currentUrl)
      setEmbedCode(
        `<iframe src="${currentUrl}/embed/countdown" width="100%" height="200" frameborder="0" scrolling="no" style="border-radius: 8px; overflow: hidden;"></iframe>`,
      )
    }
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareText =
    "Counting down to the Bittensor Halving. The era of digital intelligence scarcity is approaching. #Bittensor #TAO"

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-white/10 hover:bg-white/5 hover:text-white bg-transparent"
        >
          <Share2 className="h-4 w-4" />
          Share & Embed
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-black/90 border-white/10 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle>Share Countdown</DialogTitle>
          <DialogDescription>Share the halving countdown or embed it on your website.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="social" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="embed">Embed Widget</TabsTrigger>
          </TabsList>
          <TabsContent value="social" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="w-full gap-2 border-white/10 hover:bg-[#1DA1F2]/20 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 bg-transparent"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
                    "_blank",
                  )
                }
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2 border-white/10 hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] hover:border-[#0A66C2]/50 bg-transparent"
                onClick={() =>
                  window.open(
                    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                    "_blank",
                  )
                }
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
            </div>
            <div className="space-y-2">
              <Label>Or copy link</Label>
              <div className="flex gap-2">
                <Input value={url} readOnly className="bg-white/5 border-white/10" />
                <Button size="icon" variant="outline" onClick={() => copyToClipboard(url)} className="border-white/10">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="embed" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Iframe Code</Label>
              <div className="relative">
                <textarea
                  className="flex min-h-[80px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono text-xs"
                  value={embedCode}
                  readOnly
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 h-6 w-6 hover:bg-white/10"
                  onClick={() => copyToClipboard(embedCode)}
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Copy this code and paste it into your website's HTML to display the countdown.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
