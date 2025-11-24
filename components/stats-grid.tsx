import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Box, Coins, Zap } from "lucide-react"

export function StatsGrid() {
  // Mock data based on Bittensor documentation
  const currentBlockReward = "1.00 TAO"
  const nextBlockReward = "0.50 TAO"
  const currentSupply = "10,324,521 TAO" // Approximate
  const halvingTarget = "10,500,000 TAO"

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Current Block Reward" value={currentBlockReward} icon={Box} subtext="At 10.5M Issued Supply" />
      <StatCard title="Next Block Reward" value={nextBlockReward} icon={Zap} subtext="Estimated Dec 2025" />
      <StatCard title="Circulating Supply" value={currentSupply} icon={Coins} subtext="Of 21,000,000 Max" />
      <StatCard title="Halving Target" value={halvingTarget} icon={Activity} subtext="Trigger condition" />
    </div>
  )
}

function StatCard({ title, value, icon: Icon, subtext }: any) {
  return (
    <Card className="bg-card/50 border-border/50 backdrop-blur-sm hover:bg-card/80 transition-colors rounded-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium font-mono text-muted-foreground">{title.toUpperCase()}</CardTitle>
        <Icon className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-mono tracking-tight">{value}</div>
        <p className="text-xs text-muted-foreground mt-1 font-mono">{subtext}</p>
      </CardContent>
    </Card>
  )
}
