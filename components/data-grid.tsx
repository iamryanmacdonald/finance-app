"use client";

import { useSearchParams } from "next/navigation";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

import { DataCard, DataCardLoading } from "@/components/data-card";
import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { formatDateRange } from "@/lib/utils";

export const DataGrid = () => {
  const { data, isLoading } = useGetSummary();

  const params = useSearchParams();
  const from = params.get("from") || undefined;
  const to = params.get("to") || undefined;

  const dateRangeLabel = formatDateRange({ from, to });

  if (isLoading)
    return (
      <div className="mb-8 grid grid-cols-1 gap-8 pb-2 lg:grid-cols-3">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );

  return (
    <div className="mb-8 grid grid-cols-1 gap-8 pb-2 lg:grid-cols-3">
      <DataCard
        dateRange={dateRangeLabel}
        icon={FaPiggyBank}
        percentageChange={data?.remainingChange}
        title="Remaining"
        value={data?.remainingAmount}
        variant="default"
      />
      <DataCard
        dateRange={dateRangeLabel}
        icon={FaArrowTrendUp}
        percentageChange={data?.incomeChange}
        title="Income"
        value={data?.incomeAmount}
        variant="default"
      />
      <DataCard
        dateRange={dateRangeLabel}
        icon={FaArrowTrendDown}
        percentageChange={data?.expensesChange}
        title="Expenses"
        value={data?.expensesAmount}
        variant="default"
      />
    </div>
  );
};
