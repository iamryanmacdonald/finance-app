/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { format, parse } from "date-fns";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { convertAmountToMilliUnits } from "@/lib/utils";
import { ImportTable } from "./import-table";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "date", "payee"];

type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<
    Record<string, string | null>
  >({});

  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null,
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = {
        ...prev,
      };

      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumns[`column_${columnIndex}`] = value;

      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => column.split("_")[1];

    const mappedData = {
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });

          return transformedRow.every((item) => item === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
      headers: headers.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumns[`column_${columnIndex}`] || null;
      }),
    };

    const arrayOfData = mappedData.body.map((row) =>
      row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];

        if (header !== null) {
          acc[header] = cell;
        }

        return acc;
      }, {}),
    );

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMilliUnits(parseFloat(item.amount)),
      date: format(parse(item.date, dateFormat, new Date()), outputFormat),
    }));

    onSubmit(formattedData);
  };

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <CardTitle className="line-clamp-1 text-xl">
          Import Transaction(s)
        </CardTitle>
        <div className="flex flex-col items-center gap-x-2 gap-y-2 lg:flex-row">
          <Button className="w-full lg:w-auto" onClick={onCancel} size="sm">
            Cancel
          </Button>
          <Button
            className="w-full lg:w-auto"
            disabled={progress < requiredOptions.length}
            onClick={handleContinue}
            size="sm"
          >
            Continue ({progress} / {requiredOptions.length})
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ImportTable
          body={body}
          headers={headers}
          onTableHeadSelectChange={onTableHeadSelectChange}
          selectedColumns={selectedColumns}
        />
      </CardContent>
    </Card>
  );
};
