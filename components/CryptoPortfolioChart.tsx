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

// Example historical counts only
const chartData = [
  { date: "2025-09-20", btcCount: 0.5, ethCount: 2, solCount: 10 },
  { date: "2025-09-21", btcCount: 0.52, ethCount: 2.1, solCount: 11 },
  { date: "2025-09-22", btcCount: 0.53, ethCount: 2.2, solCount: 11 },
  { date: "2025-09-23", btcCount: 0.54, ethCount: 2.3, solCount: 12 },
  { date: "2025-09-24", btcCount: 0.55, ethCount: 2.4, solCount: 12 },
  { date: "2025-09-25", btcCount: 0.56, ethCount: 2.5, solCount: 13 },
  { date: "2025-09-26", btcCount: 0.57, ethCount: 2.6, solCount: 13 },
  { date: "2025-09-27", btcCount: 0.58, ethCount: 2.7, solCount: 14 },
]

const chartConfig = {
  btcCount: { label: "BTC Count", color: "var(--chart-1)" },
  ethCount: { label: "ETH Count", color: "var(--chart-2)" },
  solCount: { label: "SOL Count", color: "var(--chart-3)" },
} satisfies ChartConfig

export function CryptoCountsChart() {
  const [activeKey, setActiveKey] = useState<keyof typeof chartConfig | null>(
    null
  )

  const handleLabelClick = (key: keyof typeof chartConfig) => {
    setActiveKey((prev) => (prev === key ? null : key))
  }

  // Decide which keys to render: either all, or just the active one
  const visibleKeys =
    activeKey === null ? Object.keys(chartConfig) : [activeKey]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Coin Holdings Over Time</CardTitle>
        <CardDescription>
          Click a label to isolate that coin’s count
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)} // show day only
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            {visibleKeys.includes("btcCount") && (
              <Line
                dataKey="btcCount"
                type="monotone"
                stroke="var(--color-btcCount)"
                strokeWidth={2}
                dot
              >
                <LabelList dataKey="btcCount" position="top" fontSize={10} />
              </Line>
            )}
            {visibleKeys.includes("ethCount") && (
              <Line
                dataKey="ethCount"
                type="monotone"
                stroke="var(--color-ethCount)"
                strokeWidth={2}
                dot
              >
                <LabelList dataKey="ethCount" position="top" fontSize={10} />
              </Line>
            )}
            {visibleKeys.includes("solCount") && (
              <Line
                dataKey="solCount"
                type="monotone"
                stroke="var(--color-solCount)"
                strokeWidth={2}
                dot
              >
                <LabelList dataKey="solCount" position="top" fontSize={10} />
              </Line>
            )}
          </LineChart>
        </ChartContainer>

        {/* Custom clickable legend */}
        <div className="flex gap-4 mt-4">
          {Object.entries(chartConfig).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => handleLabelClick(key as keyof typeof chartConfig)}
              className={`text-sm font-medium ${
                activeKey === key || activeKey === null
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
              style={{ color: cfg.color }}
            >
              {cfg.label}
            </button>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Holdings trend looks positive{" "}
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              Sept 20 – Sept 27, 2025
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
