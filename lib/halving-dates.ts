export const HALVING_DATES = [
  { phase: "1st Halving", date: new Date("2024-12-14T00:00:00.000Z"), milestone: "10,500,000" },
  { phase: "2nd Halving", date: new Date("2029-12-11T00:00:00.000Z"), milestone: "15,750,000" },
  { phase: "3rd Halving", date: new Date("2033-12-08T00:00:00.000Z"), milestone: "18,375,000" },
  { phase: "4th Halving", date: new Date("2037-12-05T00:00:00.000Z"), milestone: "19,687,500" },
  { phase: "5th Halving", date: new Date("2041-12-03T00:00:00.000Z"), milestone: "20,343,750" },
  { phase: "6th Halving", date: new Date("2045-11-30T00:00:00.000Z"), milestone: "20,671,875" },
  { phase: "7th Halving", date: new Date("2049-11-27T00:00:00.000Z"), milestone: "20,835,937.5" },
  { phase: "8th Halving", date: new Date("2053-11-25T00:00:00.000Z"), milestone: "20,917,968.75" },
  { phase: "9th Halving", date: new Date("2057-11-22T00:00:00.000Z"), milestone: "20,958,984.375" },
  { phase: "10th Halving", date: new Date("2061-11-19T00:00:00.000Z"), milestone: "20,979,492.1875" },
  { phase: "11th Halving", date: new Date("2065-11-17T00:00:00.000Z"), milestone: "20,989,746.09375" },
  { phase: "12th Halving", date: new Date("2069-11-14T00:00:00.000Z"), milestone: "20,994,873.046875" },
]

export function getNextHalving(): { phase: string; date: Date; milestone: string } | null {
  const now = new Date()
  const nextHalving = HALVING_DATES.find((halving) => halving.date > now)
  return nextHalving || null
}
