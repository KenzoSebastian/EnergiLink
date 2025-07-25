"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ActionTagihan } from "./ActionTagihan";

export type dataTagihanUserType = {
  _id: string;
  periode: string;
  totalPenggunaan: number;
  totalTagihan: number;
  status: "Lunas" | "Belum Lunas";
};

const columns: ColumnDef<dataTagihanUserType>[] = [
  {
    accessorKey: "_id",
    header: "id",
    cell: ({ row }) => <div>{row.getValue("_id")}</div>,
    enableHiding: true,
  },
  {
    accessorKey: "periode",
    header: "Periode",
    cell: ({ row }) => {
      return <div>{row.getValue("periode")}</div>;
    },
  },
  {
    accessorKey: "totalPenggunaan",
    header: "Total Penggunaan (kWh)",
    cell: ({ row }) => {
      return <div>{row.getValue("totalPenggunaan")} kWh</div>;
    },
  },
  {
    accessorKey: "totalTagihan",
    header: "Total Tagihan (Rp)",
    cell: ({ row }) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(row.getValue("totalTagihan"));
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          variant={
            row.getValue("status") === "Lunas" ? "secondary" : "destructive"
          }
          className={
            row.getValue("status") === "Lunas"
              ? "bg-green-700 text-white"
              : undefined
          }
        >
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <ActionTagihan row={row} />;
    },
  },
];

export function TableTagihanUser({ data }: { data: dataTagihanUserType[] }) {
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
