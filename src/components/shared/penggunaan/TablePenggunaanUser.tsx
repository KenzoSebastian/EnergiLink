"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import * as React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type dataPenggunaanUserType = {
  bulan: string;
  tahun: number;
  meterAwal: number;
  meterAkhir: number;
  totalPenggunaan: number;
};

const columns: ColumnDef<dataPenggunaanUserType>[] = [
  {
    accessorKey: "periode",
    header: "Periode",
    cell: ({ row }) => {
      const bulan = row.getValue("bulan");
      const tahun = row.getValue("tahun");
      return <div>{`${bulan} ${tahun}`}</div>;
    },
  },
  {
    accessorKey: "bulan",
  },
  {
    accessorKey: "tahun",
  },
  {
    accessorKey: "meterAwal",
    header: "Meter Awal",
    cell: ({ row }) => <div>{row.getValue("meterAwal")}</div>,
  },
  {
    accessorKey: "meterAkhir",
    header: "Meter Akhir",
    cell: ({ row }) => <div>{row.getValue("meterAkhir")}</div>,
  },
  {
    accessorKey: "totalPenggunaan",
    header: () => <div>Total Pemakaian (kWh)</div>,
    cell: ({ row }) => {
      const meterAwal: number = row.getValue("meterAwal");
      const meterAkhir: number = row.getValue("meterAkhir");
      return <div>{meterAkhir - meterAwal}</div>;
    },
  },
];

export function TablePenggunaanUser({ data }: { data: dataPenggunaanUserType[] }) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ bulan: false, tahun: false });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  return (
    <div className="w-full">
      <div className="bg-white p-4 shadow rounded-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 p-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>
    </div>
  );
}
