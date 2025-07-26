/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  bayarTagihanSchema,
  type BayarTagihanSchemaValue,
} from "@/schema/bayarTagihan";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { dataTagihanUserType } from "./TableTagihanUser";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const ActionTagihan = ({ row }: { row: Row<dataTagihanUserType> }) => {
  const [open, setOpen] = useState<boolean>(false);

  const bayarTagihan = useMutation(api.tables.tagihan.bayarTagihan);

  const bayarTagihanForm = useForm<
    BayarTagihanSchemaValue,
    any,
    BayarTagihanSchemaValue
  >({
    resolver: zodResolver(bayarTagihanSchema),
    defaultValues: { id: row.getValue("_id") },
  });

  const handleSubmitForm = async (data: BayarTagihanSchemaValue) => {
    const totalTagihan = row.getValue("totalTagihan");
    if (typeof totalTagihan === "number") {
      if (totalTagihan < data.amount) {
        toast.error("Total bayar tidak boleh melebihi total tagihan.");
        return;
      }
      if (totalTagihan > data.amount) {
        toast.error("Total bayar tidak boleh kurang dari total tagihan.");
        return;
      }
      try {
        await bayarTagihan({ id: data.id as Id<"tagihan"> });
      } catch (error) {
        console.error("Error bayar tagihan:", error);
        toast.error("Gagal bayar tagihan.");
      }

      bayarTagihanForm.reset();
      setOpen(false);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={() => setOpen(true)}>
        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Form {...bayarTagihanForm}>
            <AlertDialog>
              <AlertDialogTrigger className="flex items-center gap-2 w-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-dollar-sign-icon lucide-dollar-sign"
                >
                  <line x1="12" x2="12" y1="2" y2="22" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>{" "}
                Bayar Tagihan
              </AlertDialogTrigger>
              <AlertDialogContent className="overflow-auto">
                <AlertDialogHeader>
                  <AlertDialogTitle>Bayar Tagihan</AlertDialogTitle>
                </AlertDialogHeader>
                <div>
                  <table className="text-black mb-5">
                    <tbody>
                      <tr>
                        <td className="py-2">Periode</td>
                        <td className="px-2 py-2">:</td>
                        <td className="py-2 flex items-center gap-2">
                          {row.getValue("periode")}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">Meter Awal</td>
                        <td className="px-2 py-2">:</td>
                        <td className="py-2">
                          {row.getValue("meterAwal")} kWh
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">Meter Akhir</td>
                        <td className="px-2 py-2">:</td>
                        <td className="py-2">
                          {row.getValue("meterAkhir")} kWh
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">Total Pemakaian</td>
                        <td className="px-2 py-2">:</td>
                        <td className="py-2">
                          {row.getValue("totalPenggunaan")} kWh
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <hr className="border-1 border-black my-2" />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">Jenis Tarif</td>
                        <td className="px-2 py-2">:</td>
                        <td className="py-2">
                          {row.getValue("jenisTarif")} kWh
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">Daya (VA)</td>
                        <td className="px-2 py-2">:</td>
                        <td className="py-2">{row.getValue("daya")} VA</td>
                      </tr>
                      <tr>
                        <td className="py-2">Harga per kWh</td>
                        <td className="px-2 py-2">:</td>
                        <td className="py-2">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(row.getValue("harga"))}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <hr className="border-1 border-black my-2" />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">Total Tagihan</td>
                        <td className="px-2 py-2">:</td>
                        <td className="py-2">
                          Total Pemakaian * Harga per kWh
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2"></td>
                        <td className="px-2 py-2">:</td>
                        <td className="py-2">
                          {row.getValue("totalPenggunaan")} kWh *{" "}
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(row.getValue("harga"))}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2"></td>
                        <td className="px-2 py-2">:</td>
                        <td className="py-2">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(row.getValue("totalTagihan"))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <FormField
                    control={bayarTagihanForm.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} hidden />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={bayarTagihanForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="mb-3">
                        <FormLabel>Masukan Jumlah Uang</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <AlertDialogDescription></AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => {
                      bayarTagihanForm.reset();
                    }}
                  >
                    Batal
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={bayarTagihanForm.handleSubmit(handleSubmitForm)}
                  >
                    Bayar Sekarang
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
