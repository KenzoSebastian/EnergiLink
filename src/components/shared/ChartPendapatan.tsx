"use client";

import { CartesianGrid, LabelList, Line, LineChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A line chart";

const chartConfig = {
  desktop: {
    label: "pendapatan",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

type dataPendapatanProps = {
  dataPendapatan: {
    amount: number;
  }[];
};

export const ChartPendapatan = ({ dataPendapatan }: dataPendapatanProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-bold">Grafik Pendapatan</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="h-70 sm:h-85 md:h-120 w-full"
          config={chartConfig}
        >
          <LineChart
            accessibilityLayer
            data={dataPendapatan}
            margin={{
              left: 60,
              right: 60,
            }}
          >
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  hideIndicator
                  formatter={(value) =>
                    `amount: ${new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(Number(value))}`
                  }
                />
              }
            />
            <Line
              dataKey="amount"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={1}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) =>
                  new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(Number(value))
                }
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
