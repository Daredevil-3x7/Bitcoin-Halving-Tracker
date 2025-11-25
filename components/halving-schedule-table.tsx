"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

const halvingSchedule = [
  {
    phase: "Genesis (Current)",
    milestone: "0 - 10,500,000",
    reward: "1.00 TAO",
    emission: "7,200 / day",
    date: "Jan 2021 - Dec 2025",
    status: "Active",
  },
  {
    phase: "1st Halving",
    milestone: "10,500,000",
    reward: "0.50 TAO",
    emission: "3,600 / day",
    date: "Dec 13, 2025",
    status: "Upcoming",
  },
  {
    phase: "2nd Halving",
    milestone: "15,750,000",
    reward: "0.25 TAO",
    emission: "1,800 / day",
    date: "Dec 11, 2029",
    status: "Future",
  },
  {
    phase: "3rd Halving",
    milestone: "18,375,000",
    reward: "0.125 TAO",
    emission: "900 / day",
    date: "Dec 08, 2033",
    status: "Future",
  },
  {
    phase: "4th Halving",
    milestone: "19,687,500",
    reward: "0.0625 TAO",
    emission: "450 / day",
    date: "Dec 05, 2037",
    status: "Future",
  },
  {
    phase: "5th Halving",
    milestone: "20,343,750",
    reward: "0.03125 TAO",
    emission: "225 / day",
    date: "Dec 03, 2041",
    status: "Future",
  },
  {
    phase: "6th Halving",
    milestone: "20,671,875",
    reward: "0.015625 TAO",
    emission: "112.5 / day",
    date: "Nov 30, 2045",
    status: "Future",
  },
  {
    phase: "7th Halving",
    milestone: "20,835,937.5",
    reward: "0.0078125 TAO",
    emission: "56.25 / day",
    date: "Nov 27, 2049",
    status: "Future",
  },
  {
    phase: "8th Halving",
    milestone: "20,917,968.75",
    reward: "0.00390625 TAO",
    emission: "28.125 / day",
    date: "Nov 25, 2053",
    status: "Future",
  },
  {
    phase: "9th Halving",
    milestone: "20,958,984.375",
    reward: "0.001953125 TAO",
    emission: "14.0625 / day",
    date: "Nov 22, 2057",
    status: "Future",
  },
  {
    phase: "10th Halving",
    milestone: "20,979,492.1875",
    reward: "0.0009765625 TAO",
    emission: "7.03125 / day",
    date: "Nov 19, 2061",
    status: "Future",
  },
  {
    phase: "11th Halving",
    milestone: "20,989,746.09375",
    reward: "0.00048828125 TAO",
    emission: "3.515625 / day",
    date: "Nov 17, 2065",
    status: "Future",
  },
  {
    phase: "12th Halving",
    milestone: "20,994,873.046875",
    reward: "0.000244140625 TAO",
    emission: "1.7578125 / day",
    date: "Nov 14, 2069",
    status: "Future",
  },
]

export function HalvingScheduleTable() {
  const [isExpanded, setIsExpanded] = useState(false)

  const visibleSchedule = isExpanded ? halvingSchedule : halvingSchedule.slice(0, 4)
  const hasMore = halvingSchedule.length > 4

  return (
    <Card className="w-full border-white/10 bg-black/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="font-mono text-lg md:text-xl uppercase tracking-wider text-white">
            Halving Phases & Emission Schedule
          </CardTitle>
          <div className="relative group">
            <div className="text-yellow-500 hover:text-yellow-400 transition-colors cursor-help">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="absolute right-0 md:left-0 top-8 w-72 md:w-96 bg-yellow-900/95 border border-yellow-600/50 rounded-sm p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 backdrop-blur-sm">
              <p className="text-xs font-mono text-yellow-100 leading-relaxed">
                <strong className="text-yellow-200 block mb-2">Network History:</strong>
                The first TAO issuance began in <strong>January 2021</strong> with the Kusanagi network. The network was
                halted in May 2021 and relaunched as "Nakamoto" in <strong>November 2021</strong> starting from block 0,
                carrying the previously mined TAO forward. The current main iteration, "Finney," launched in{" "}
                <strong>March 2023</strong>, but the initial issuance and token creation began with Kusanagi in January
                2021.
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto -mx-6 px-6 pb-2">
          <Table className="min-w-[800px]">
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-white/60">Phase</TableHead>
                <TableHead className="text-white/60">Date (Est.)</TableHead>
                <TableHead className="text-white/60">Supply Milestone (TAO)</TableHead>
                <TableHead className="text-white/60">Block Reward</TableHead>
                <TableHead className="text-right text-white/60">Daily Emission</TableHead>
                <TableHead className="text-right text-white/60">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleSchedule.map((phase) => (
                <TableRow key={phase.phase} className="border-white/10 hover:bg-white/5">
                  <TableCell className="font-mono font-medium text-white">{phase.phase}</TableCell>
                  <TableCell className="font-mono text-white/80">{phase.date}</TableCell>
                  <TableCell className="font-mono text-white/80">{phase.milestone}</TableCell>
                  <TableCell className="font-mono text-white/80">{phase.reward}</TableCell>
                  <TableCell className="text-right font-mono text-white/80">{phase.emission}</TableCell>
                  <TableCell
                    className={`text-right font-mono ${
                      phase.status === "Active"
                        ? "text-emerald-400 animate-pulse"
                        : phase.status === "Upcoming"
                          ? "text-amber-400"
                          : "text-white/40"
                    }`}
                  >
                    {phase.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm transition-all duration-200 font-mono text-sm text-white/70 hover:text-white"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show {halvingSchedule.length - 4} More Halvings
              </>
            )}
          </button>
        )}
      </CardContent>
    </Card>
  )
}
