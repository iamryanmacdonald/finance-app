import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { convertAmountFromMilliUnits } from "@/lib/utils";

export const useGetTransactions = () => {
  const params = useSearchParams();
  const accountId = params.get("accountId") || "";
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const query = useQuery({
    queryFn: async () => {
      const response = await client.api.transactions.$get({
        query: {
          accountId,
          from,
          to,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch transactions");

      const { data } = await response.json();
      return data.map((transaction) => ({
        ...transaction,
        amount: convertAmountFromMilliUnits(transaction.amount),
      }));
    },
    queryKey: ["transactions", { accountId, from, to }],
  });

  return query;
};
