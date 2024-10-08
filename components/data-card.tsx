/* eslint-disable @typescript-eslint/no-unused-vars */
import { cva, VariantProps } from "class-variance-authority";
import { IconType } from "react-icons/lib";

import { CountUp } from "@/components/count-up";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";

const boxVariant = cva("rounded-md p-3 shrink-0", {
  variants: {
    defaultVariant: {
      variant: "default",
    },
    variant: {
      danger: "bg-rose-500/20",
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      warning: "bg-yellow-500/20",
    },
  },
});

type BoxVariants = VariantProps<typeof boxVariant>;

const iconVariant = cva("size-6", {
  variants: {
    defaultVariant: {
      variant: "default",
    },
    variant: {
      danger: "fill-rose-500",
      default: "fill-blue-500",
      success: "fill-emerald-500",
      warning: "fill-yellow-500",
    },
  },
});

type IconVariants = VariantProps<typeof iconVariant>;

interface DataCardProps extends BoxVariants, IconVariants {
  dateRange: string;
  icon: IconType;
  percentageChange?: number;
  title: string;
  value?: number;
}

export const DataCard = ({
  dateRange,
  icon: Icon,
  percentageChange = 0,
  title,
  value = 0,
  variant,
}: DataCardProps) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="line-clamp-1 text-2xl">{title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {dateRange}
          </CardDescription>
        </div>
        <div className={cn(boxVariant({ variant }))}>
          <Icon className={cn(iconVariant({ variant }))} />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="mb-2 line-clamp-1 break-all text-2xl font-bold">
          <CountUp
            decimalPlaces={2}
            decimals={2}
            end={value}
            formattingFn={formatCurrency}
            start={0}
            preserveValue
          />
        </h1>
        <p
          className={cn(
            "line-clamp-1 text-sm text-muted-foreground",
            percentageChange > 0 && "text-emerald-500",
            percentageChange < 0 && "text-rose-500",
          )}
        >
          {formatPercentage(percentageChange, { addPrefix: true })} from last
          period.
        </p>
      </CardContent>
    </Card>
  );
};

export const DataCardLoading = () => {
  return (
    <Card className="h-[192px] border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="size-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-2 h-10 w-24 shrink-0" />
        <Skeleton className="h-4 w-40 shrink-0" />
      </CardContent>
    </Card>
  );
};
