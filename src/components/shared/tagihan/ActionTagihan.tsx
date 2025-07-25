import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
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
import { bayarTagihanSchema, type BayarTagihanSchemaValue } from "@/schema/bayarTagihan";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { dataTagihanUserType } from "./TableTagihanUser";

export const ActionTagihan = ({ row }: { row: Row<dataTagihanUserType> }) => {
  const [open, setOpen] = useState<boolean>(false);

  const bayarTagihanForm = useForm<BayarTagihanSchemaValue>({
    resolver: zodResolver(bayarTagihanSchema),
  })

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
                <FormField
                  control={bayarTagihanForm.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel>id</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                      <FormLabel>amount</FormLabel>
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
                <AlertDialogCancel onClick={() => setOpen(false)}>
                  Tutup
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          </Form>

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
