import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableHeadSelect } from "./table-head-select";

type Props = {
  body: string[][];
  headers: string[];
  onTableHeadSelectChange: (columnIndex: number, value: string | null) => void;
  selectedColumns: Record<string, string | null>;
};

export const ImportTable = ({
  body,
  headers,
  onTableHeadSelectChange,
  selectedColumns,
}: Props) => {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {headers.map((_item, index) => (
              <TableHead key={index}>
                <TableHeadSelect
                  columnIndex={index}
                  onChange={onTableHeadSelectChange}
                  selectedColumns={selectedColumns}
                />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {body.map((row, index) => (
            <TableRow key={index}>
              {row.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
