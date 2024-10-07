import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { SelectSingleEventHandler } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type Props = {
  disabled?: boolean;
  onChange?: SelectSingleEventHandler;
  value?: Date;
};

export const DatePicker = ({ disabled, onChange, value }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
          disabled={disabled}
          variant="outline"
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          disabled={disabled}
          mode="single"
          onSelect={onChange}
          selected={value}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
