import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { convertAmountFromMilliUnits } from "@/lib/utils";

export const useGetSummary = () => {
  const params = useSearchParams();
  const accountId = params.get("accountId") || "";
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const query = useQuery({
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: {
          accountId,
          from,
          to,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch summary");

      const { data } = await response.json();
      return {
        ...data,
        remainingAmount: convertAmountFromMilliUnits(data.remainingAmount),
        incomeAmount: convertAmountFromMilliUnits(data.incomeAmount),
        expensesAmount: convertAmountFromMilliUnits(data.expensesAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmountFromMilliUnits(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          expenses: convertAmountFromMilliUnits(day.expenses),
          income: convertAmountFromMilliUnits(day.income),
        })),
      };
    },
    // TODO: Check if params are needed in the key
    queryKey: ["summary", { accountId, from, to }],
  });

  return query;
};
