"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// --- Example: 13 coins ---
const coins = [
  "Bitcoin",
  "Ethereum",
  "Solana",
  "Cardano",
  "Polkadot",
  "Avalanche",
  "Polygon",
  "Litecoin",
  "Ripple",
  "Dogecoin",
  "Chainlink",
  "Stellar",
  "Tron",
]

// --- Sample raw data (shortened for demo) ---
const rawData = [
  { coin: "Bitcoin", count: 0.50, timestamp: "2025-07-01" },
  { coin: "Bitcoin", count: 0.51, timestamp: "2025-07-02" },
  { coin: "Bitcoin", count: 0.60, timestamp: "2025-07-14" },
  { coin: "Bitcoin", count: 0.70, timestamp: "2025-08-18" },
  { coin: "Bitcoin", count: 0.90, timestamp: "2025-09-01" },
  { coin: "Ethereum", count: 2.0, timestamp: "2025-07-01" },
  { coin: "Ethereum", count: 2.05, timestamp: "2025-07-02" },
  { coin: "Ethereum", count: 2.4, timestamp: "2025-07-24" },
  { coin: "Ethereum", count: 2.7, timestamp: "2025-09-01" },
  { coin: "Solana", count: 10.0, timestamp: "2025-07-01" },
  { coin: "Solana", count: 10.2, timestamp: "2025-07-02" },
  { coin: "Solana", count: 12.0, timestamp: "2025-08-01" },
  { coin: "Solana", count: 14.0, timestamp: "2025-09-01" },
  // ... add more for other coins
]

// --- Transform raw data into time-series per coin ---
function transformData(raw: typeof rawData) {
  // group by timestamp
  const grouped: Record<string, any> = {}
  raw.forEach((d) => {
    if (!grouped[d.timestamp]) grouped[d.timestamp] = { timestamp: d.timestamp }
    grouped[d.timestamp][d.coin] = d.count
  })
  return Object.values(grouped).sort(
    (a: any, b: any) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )
}

// Chart config
const chartConfig = coins.reduce((acc, coin, idx) => {
  acc[coin] = { label: coin, color: `hsl(var(--chart-${(idx % 6) + 1}))` }
  return acc
}, {} as ChartConfig)

export function CryptoCountsLineChart() {
  const [range, setRange] = useState<"daily" | "weekly" | "monthly" | "yearly">(
    "daily"
  )

  const data = transformData(rawData)

  // Line thickness based on range
  const strokeWidth =
    range === "daily" ? 1.5 : range === "weekly" ? 2 : range === "monthly" ? 2.5 : 3

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Coin Counts</CardTitle>
        <CardDescription>
          Multiple coins over time. Line width = time granularity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {coins.map((coin) => (
                <Line
                  key={coin}
                  type="monotone"
                  dataKey={coin}
                  stroke={chartConfig[coin]?.color}
                  strokeWidth={strokeWidth}
                  dot={false}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex gap-4 justify-center">
          {["daily", "weekly", "monthly", "yearly"].map((key) => (
            <button
              key={key}
              onClick={() =>
                setRange(key as "daily" | "weekly" | "monthly" | "yearly")
              }
              className={`text-sm font-medium capitalize ${
                range === key ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {key}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 leading-none font-medium mt-2">
          Holdings trend visualized{" "}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
      </CardFooter>
    </Card>
  )
}
