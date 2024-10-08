/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { CategoryTooltip } from "@/components/category-tooltip";
import { formatPercentage } from "@/lib/utils";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export const PieVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer height={350} width="100%">
      <PieChart data={data}>
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
                      {formatPercentage(entry.payload.percent * 100)}
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
        <Tooltip content={<CategoryTooltip />} />
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          dataKey="value"
          fill="#8884D8"
          labelLine={false}
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
        >
          {data.map((_entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} key={`cell-${index}`} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
