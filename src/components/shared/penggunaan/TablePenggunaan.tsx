"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type dataPenggunaanType = {
  namaPelanggan: string;
  bulan: string;
  tahun: number;
  meterAwal: number;
  meterAkhir: number;
  totalPenggunaan: number;
};

const columns: ColumnDef<dataPenggunaanType>[] = [
  {
    accessorKey: "namaPelanggan",
    header: "Nama Pelanggan",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("namaPelanggan")}</div>
    ),
  },
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

export function TablePenggunaan({ data }: { data: dataPenggunaanType[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({ bulan: false, tahun: false });
  const [rowSelection, setRowSelection] = React.useState<
    Record<string, boolean>
  >({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-1 sm:gap-4 justify-center">
        <Input
          placeholder="Cari berdasarkan nama..."
          value={
            (table.getColumn("namaPelanggan")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("namaPelanggan")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colums <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => {
                return (
                  column.getCanHide() &&
                  column.id !== "bulan" &&
                  column.id !== "tahun"
                );
              })
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
