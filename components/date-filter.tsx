"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format, subDays } from "date-fns";
import { ChevronDown } from "lucide-react";
import qs from "query-string";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDateRange } from "@/lib/utils";

export const DateFilter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();
  const accountId = params.get("accountId") || "";
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (dateRange: DateRange | undefined) => {
    const query = {
      accountId,
      from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
      to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
    };

    const url = qs.stringifyUrl(
      {
        query,
        url: pathname,
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  };

  const onReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-9 w-full rounded-md border-none bg-white/10 px-3 font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus:ring-transparent focus:ring-offset-0 lg:w-auto"
          disabled={false}
          size="sm"
          variant="outline"
        >
          <span>{formatDateRange(paramState)}</span>
          <ChevronDown className="ml-2 size-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full p-0 lg:w-auto">
        <Calendar
          defaultMonth={date?.from}
          disabled={false}
          mode="range"
          numberOfMonths={2}
          onSelect={setDate}
          selected={date}
          initialFocus
        />
        <div className="flex w-full items-center gap-x-2 p-4">
          <PopoverClose asChild>
            <Button
              className="w-full"
              disabled={!date?.from || !date?.to}
              onClick={onReset}
              variant="outline"
            >
              Reset
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              className="w-full"
              disabled={!date?.from || !date?.to}
              onClick={() => pushToUrl(date)}
            >
              Apply
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
