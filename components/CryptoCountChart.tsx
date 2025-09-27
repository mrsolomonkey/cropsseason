"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  LabelList,
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

// --- Example datasets ---
const dailyData = [
  { date: "2025-09-20", btcCount: 0.5, ethCount: 2, solCount: 10 },
  { date: "2025-09-21", btcCount: 0.52, ethCount: 2.1, solCount: 11 },
  { date: "2025-09-22", btcCount: 0.53, ethCount: 2.2, solCount: 11 },
  { date: "2025-09-23", btcCount: 0.54, ethCount: 2.3, solCount: 12 },
  { date: "2025-09-24", btcCount: 0.55, ethCount: 2.4, solCount: 12 },
  { date: "2025-09-25", btcCount: 0.56, ethCount: 2.5, solCount: 13 },
  { date: "2025-09-26", btcCount: 0.57, ethCount: 2.6, solCount: 13 },
  { date: "2025-09-27", btcCount: 0.58, ethCount: 2.7, solCount: 14 },
]

const weeklyData = [
  { date: "2025-08-01", btcCount: 0.60, ethCount: 2.3, solCount: 11 },
  { date: "2025-08-08", btcCount: 0.62, ethCount: 2.35, solCount: 11.5 },
  { date: "2025-08-15", btcCount: 0.64, ethCount: 2.4, solCount: 12 },
  { date: "2025-08-22", btcCount: 0.66, ethCount: 2.45, solCount: 12.5 },
  { date: "2025-08-29", btcCount: 0.68, ethCount: 2.5, solCount: 13 },
]

const monthlyData = [
  { date: "2025-01-01", btcCount: 0.40, ethCount: 1.5, solCount: 7 },
  { date: "2025-02-01", btcCount: 0.45, ethCount: 1.6, solCount: 8 },
  { date: "2025-03-01", btcCount: 0.50, ethCount: 1.7, solCount: 8.5 },
  { date: "2025-04-01", btcCount: 0.55, ethCount: 1.8, solCount: 9 },
]

const yearlyData = [
  { date: "2022-01-01", btcCount: 0.45, ethCount: 1.6, solCount: 7 },
  { date: "2023-01-01", btcCount: 0.50, ethCount: 1.8, solCount: 8 },
  { date: "2024-01-01", btcCount: 0.55, ethCount: 2.0, solCount: 9 },
  { date: "2025-01-01", btcCount: 0.60, ethCount: 2.2, solCount: 10 },
]

// Chart config
const chartConfig = {
  btcCount: { label: "BTC", color: "var(--chart-1)" },
  ethCount: { label: "ETH", color: "var(--chart-2)" },
  solCount: { label: "SOL", color: "var(--chart-3)" },
} satisfies ChartConfig

export function CryptoCountsChart() {
  const [activeCoin, setActiveCoin] = useState<keyof typeof chartConfig | null>(
    null
  )
  const [range, setRange] = useState<"daily" | "weekly" | "monthly" | "yearly">(
    "daily"
  )

  const getData = () => {
    switch (range) {
      case "weekly":
        return weeklyData
      case "monthly":
        return monthlyData
      case "yearly":
        return yearlyData
      default:
        return dailyData
    }
  }

  const toggleCoin = (coin: keyof typeof chartConfig) => {
    setActiveCoin((prev) => (prev === coin ? null : coin))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Coin Holdings Over Time</CardTitle>
            <CardDescription>
              Click a coin label to emphasize its line. Reset to show all.
            </CardDescription>
          </div>
          {/* Dropdown for date filter */}
          <select
            value={range}
            onChange={(e) =>
              setRange(e.target.value as "daily" | "weekly" | "monthly" | "yearly")
            }
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={getData()} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(5)}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

              {Object.keys(chartConfig).map((key) => {
                const coinKey = key as keyof typeof chartConfig
                const isActive = !activeCoin || activeCoin === coinKey
                return (
                  <Line
                    key={coinKey}
                    dataKey={coinKey}
                    type="monotone"
                    stroke={chartConfig[coinKey].color}
                    strokeWidth={isActive ? 3 : 0}
                    dot={isActive}
                    connectNulls
                  >
                    {isActive && (
                      <LabelList
                        dataKey={coinKey}
                        position="top"
                        fontSize={10}
                      />
                    )}
                  </Line>
                )
              })}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Coin selectors */}
        <div className="flex gap-4 mt-4 justify-center flex-wrap">
          {Object.entries(chartConfig).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => toggleCoin(key as keyof typeof chartConfig)}
              className={`text-sm font-medium ${
                activeCoin === key || activeCoin === null
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
              style={{ color: cfg.color }}
            >
              {cfg.label}
            </button>
          ))}
          {/* Reset button */}
          <button
            onClick={() => setActiveCoin(null)}
            className="text-sm font-medium text-blue-600 underline"
          >
            Reset
          </button>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Holdings trend visualized{" "}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-muted-foreground">
              Showing {range} data
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
