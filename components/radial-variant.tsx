/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Legend,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

import { formatCurrency } from "@/lib/utils";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export const RadialVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer height={350} width="100%">
      <RadialBarChart
        barSize={10}
        cx="50%"
        cy="30%"
        data={data.map((item, index) => ({
          ...item,
          fill: COLORS[index % COLORS.length],
        }))}
        innerRadius="90%"
        outerRadius="40%"
      >
        <RadialBar
          dataKey="value"
          label={{
            fill: "#FFFFFF",
            fontSize: "12px",
            position: "insideStart",
          }}
          background
        />
        <Legend
          align="right"
          content={({ payload }: any) => (
            <ul className="flex flex-col space-y-2">
              {payload.map((entry: any, index: number) => (
                <li
                  className="flex items-center space-x-2"
                  key={`item-${index}`}
                >
                  <span
                    className="size-2 rounded-full"
                    style={{
                      backgroundColor: entry.color,
                    }}
                  />
                  <div className="space-x-1">
                    <span className="text-sm text-muted-foreground">
                      {entry.value}
                    </span>
                    <span className="text-sm">
                      {formatCurrency(entry.payload.value)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};
