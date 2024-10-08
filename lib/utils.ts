import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { twMerge } from "tailwind-merge";

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) return previous === current ? 0 : 100;

  return (100 * (current - previous)) / previous;
}

export function convertAmountFromMilliUnits(amount: number) {
  return amount / 1000;
}

export function convertAmountToMilliUnits(amount: number) {
  return Math.round(amount * 1000);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fillMissingDays(
  activeDays: {
    date: Date;
    expenses: number;
    income: number;
  }[],
  startDate: Date,
  endDate: Date,
) {
  if (activeDays.length === 0) return [];

  const allDays = eachDayOfInterval({
    end: endDate,
    start: startDate,
  });

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));

    if (found) return found;

    return {
      date: day,
      expenses: 0,
      income: 0,
    };
  });

  return transactionsByDay;
}

export function formatCurrency(value: number) {
  return Intl.NumberFormat("en-US", {
    currency: "USD",
    minimumFractionDigits: 2,
    style: "currency",
  }).format(value);
}

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export function formatDateRange(period?: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    return `${format(defaultFrom, "LLL dd")} - ${format(defaultTo, "LLL dd, y")}`;
  }

  if (period.to) {
    return `${format(period.from, "LLL dd")} - ${format(period.to, "LLL dd, y")}`;
  }

  return format(period.from, "LLL dd, y");
}

export function formatPercentage(
  value: number,
  options: { addPrefix?: boolean } = { addPrefix: false },
) {
  const result = new Intl.NumberFormat("en-US", {
    style: "percent",
  }).format(value / 100);

  if (options.addPrefix && value > 0) return `+${result}`;

  return result;
}
