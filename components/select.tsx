"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type Props = {
  disabled?: boolean;
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
  options?: { label: string; value: string }[];
  placeholder?: string;
  value?: string | null | undefined;
};

export const Select = ({
  disabled,
  onChange,
  onCreate,
  options = [],
  placeholder,
  value,
}: Props) => {
  const onSelect = (option: SingleValue<{ label: string; value: string }>) =>
    onChange(option?.value);

  const formattedValue = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );

  return (
    <CreatableSelect
      className="h-10 text-sm"
      isDisabled={disabled}
      onChange={onSelect}
      onCreateOption={onCreate}
      options={options}
      placeholder={placeholder}
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#E2E8F0",
          ":hover": {
            borderColor: "#E2E8F0",
          },
        }),
      }}
      value={formattedValue}
    />
  );
};
