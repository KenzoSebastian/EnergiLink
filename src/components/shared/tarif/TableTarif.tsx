"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditButtonTarif from "./EditButtonTarif";
import { useState } from "react";

export type dataTarifType = {
  _id: string;
  namaTarif: string;
  daya: number;
  harga: number;
};

const columns: ColumnDef<dataTarifType>[] = [
  {
    accessorKey: "_id",
    header: "id",
    cell: ({ row }) => <div>{row.getValue("_id")}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "namaTarif",
    header: "Nama Tarif",
    cell: ({ row }) => <div>{row.getValue("namaTarif")}</div>,
  },
  {
    accessorKey: "daya",
    header: "Daya (VA)",
    cell: ({ row }) => {
      return <div>{row.getValue("daya")}</div>;
    },
  },
  {
    accessorKey: "harga",
    header: "Tarif per kWh (Rp)",
    cell: ({ row }) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(row.getValue("harga"));
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <EditButtonTarif row={row} />;
    },
  },
];

export function TableTarif({ data }: { data: dataTarifType[] }) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    ["_id"]: false,
  });
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
      <div className="flex items-center py-4 gap-1 sm:gap-4 justify-center"></div>
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
                <TableRow key={row.id}>
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
