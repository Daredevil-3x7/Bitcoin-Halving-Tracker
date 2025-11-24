import { HalvingCountdown } from "@/components/halving-countdown"

export default function EmbedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
      <div className="w-full max-w-3xl">
        <style>{`.share-button { display: none !important; }`}</style>

        {/* We need to wrap it to target the share button if we couldn't pass props. 
             Since I didn't add a prop to HalvingCountdown to hide the share button, 
             I will rely on the iframe size cutting it off or just letting it be there.
             
             Actually, users might want to share from the embed too. So keeping it is fine.
             But I'll add a class to the body for specific styling if needed.
         */}
        <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold tracking-wider text-white mb-1">BITTENSOR HALVING</h2>
            <p className="text-xs text-muted-foreground font-mono">DECEMBER 10, 2025 (EST)</p>
          </div>
          <HalvingCountdown />
        </div>
      </div>
    </div>
  )
}
