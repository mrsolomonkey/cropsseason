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

const coins = ["Bitcoin", "Ethereum", "Solana"]

const rawData = [
  { coin: "Bitcoin", count: 0.50, timestamp: "2025-07-01" },
  { coin: "Ethereum", count: 2.00, timestamp: "2025-07-01" },
  { coin: "Solana", count: 10.0, timestamp: "2025-07-01" },
  { coin: "Bitcoin", count: 0.60, timestamp: "2025-07-14" },
  { coin: "Ethereum", count: 2.4, timestamp: "2025-07-14" },
  { coin: "Solana", count: 12.0, timestamp: "2025-07-14" },
  { coin: "Bitcoin", count: 0.70, timestamp: "2025-08-01" },
  { coin: "Ethereum", count: 2.7, timestamp: "2025-08-01" },
  { coin: "Solana", count: 14.0, timestamp: "2025-08-01" },
]

function transformData(raw: typeof rawData) {
  const grouped: Record<string, any> = {}
  raw.forEach((d) => {
    if (!grouped[d.timestamp]) grouped[d.timestamp] = { timestamp: d.timestamp }
    grouped[d.timestamp][d.coin] = d.count
  })
  return Object.values(grouped).sort(
    (a: any, b: any) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )
}

const chartConfig = coins.reduce((acc, coin, idx) => {
  acc[coin] = { label: coin, color: `hsl(var(--chart-${(idx % 6) + 1}))` }
  return acc
}, {} as ChartConfig)

export function CryptoCountsLineChart() {
  const [activeCoins, setActiveCoins] = useState<string[]>(coins)
  const data = transformData(rawData)

  const toggleCoin = (coin: string) => {
    setActiveCoins((prev) =>
      prev.includes(coin) ? prev.filter((c) => c !== coin) : [...prev, coin]
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Coin Counts</CardTitle>
        <CardDescription>Click a coin name to toggle its line</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {activeCoins.map((coin) => (
                <Line
                  key={coin}
                  type="monotone"
                  dataKey={coin}
                  stroke={chartConfig[coin]?.color}
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Coin selector */}
        <div className="flex flex-wrap gap-3 mt-4 justify-center">
          {coins.map((coin) => (
            <button
              key={coin}
              onClick={() => toggleCoin(coin)}
              className={`text-sm font-medium ${
                activeCoins.includes(coin)
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
              style={{ color: chartConfig[coin]?.color }}
            >
              {coin}
            </button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Holdings trend visualized{" "}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
      </CardFooter>
    </Card>
  )
}
