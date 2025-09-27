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

  const data = getData()

  return (
    <div className="space-y-6">
      {/* Dropdown filter */}
      <div className="flex justify-end">
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

      {/* Render one card per coin */}
      {Object.entries(chartConfig).map(([key, cfg]) => (
        <Card key={key}>
          <CardHeader>
            <CardTitle>{cfg.label} Holdings </CardTitle>
            <CardDescription>
              {cfg.label} trend over {range}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(5)}
                  />
                  <YAxis
                    width={typeof window !== "undefined" && window.innerWidth < 640 ? 30 : 50}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={4}
                    />
                  <Line
                    dataKey={key}
                    type="monotone"
                    stroke={cfg.color}
                    strokeWidth={3}
                    dot
                    connectNulls
                  >
                    <LabelList dataKey={key} position="top" fontSize={10} />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>Showing {range} data</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
