"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "2025-09-20", Bitcoin: 1400000, Ethereum: 180000, Solana: 12000 },
  { date: "2025-09-25", Bitcoin: 1500000, Ethereum: 200000, Solana: 15000 },
  { date: "2025-09-27", Bitcoin: 1550000, Ethereum: 210000, Solana: 16000 },
];

export default function CryptoValueChart() {
  return (
    <ChartContainer
      className="h-[300px] w-full"
      config={{
        Bitcoin: { label: "Bitcoin", color: "hsl(var(--chart-1))" },
        Ethereum: { label: "Ethereum", color: "hsl(var(--chart-2))" },
        Solana: { label: "Solana", color: "hsl(var(--chart-3))" },
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="Bitcoin" stroke="hsl(var(--chart-1))" />
          <Line type="monotone" dataKey="Ethereum" stroke="hsl(var(--chart-2))" />
          <Line type="monotone" dataKey="Solana" stroke="hsl(var(--chart-3))" />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
