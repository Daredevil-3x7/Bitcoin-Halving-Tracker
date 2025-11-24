"use client"

import { Button } from "@/components/ui/button"
import { CalendarPlus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface AddToCalendarProps {
  date: Date
  title: string
  description: string
}

export function AddToCalendar({ date, title, description }: AddToCalendarProps) {
  const [copied, setCopied] = useState(false)

  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title,
  )}&dates=${date.toISOString().replace(/-|:|\.\d\d\d/g, "")}/${date
    .toISOString()
    .replace(/-|:|\.\d\d\d/g, "")}&details=${encodeURIComponent(description)}`

  const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
    title,
  )}&body=${encodeURIComponent(description)}&startdt=${date.toISOString()}&enddt=${date.toISOString()}`

  const downloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${date.toISOString().replace(/-|:|\.\d\d\d/g, "")}
DTEND:${date.toISOString().replace(/-|:|\.\d\d\d/g, "")}
SUMMARY:${title}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "bittensor-halving.ics")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 font-mono border-white/20 hover:bg-white/10 bg-transparent">
          <CalendarPlus className="h-4 w-4" />
          Add to Calendar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/90 border-white/10 backdrop-blur-xl">
        <DropdownMenuItem asChild>
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer font-mono text-muted-foreground hover:text-white focus:text-white focus:bg-white/10"
          >
            Google Calendar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer font-mono text-muted-foreground hover:text-white focus:text-white focus:bg-white/10"
          >
            Outlook Calendar
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={downloadIcs}
          className="cursor-pointer font-mono text-muted-foreground hover:text-white focus:text-white focus:bg-white/10"
        >
          Download .ICS
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
