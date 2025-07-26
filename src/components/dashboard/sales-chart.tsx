"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", spend: 4000 },
  { month: "February", spend: 3000 },
  { month: "March", spend: 2000 },
  { month: "April", spend: 2780 },
  { month: "May", spend: 1890 },
  { month: "June", spend: 2390 },
  { month: "July", spend: 3490 },
]

const chartConfig = {
  spend: {
    label: "Spend",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function SalesChart() {
  return (
     <ChartContainer config={chartConfig} className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="month" 
            tickLine={false} 
            axisLine={false} 
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis 
            tickFormatter={(value) => `₹${Number(value) / 1000}k`}
            tickLine={false} 
            axisLine={false} 
            tickMargin={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel indicator="line" />} />
          <Line 
            dataKey="spend" 
            type="monotone" 
            stroke="var(--color-spend)" 
            strokeWidth={3} 
            dot={{ r: 6, fill: 'var(--color-spend)', stroke: 'hsl(var(--card))', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
