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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  tarifEditSchema,
  type TarifEditSchemaValue,
} from "@/schema/tarifEditSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useForm } from "react-hook-form";
import { type dataTarifType } from "./TableTarif";
import { useState } from "react";

const EditButtonTarif = ({ row }: { row: Row<dataTarifType> }) => {
  const editTarifForm = useForm<
    TarifEditSchemaValue,
    any,
    TarifEditSchemaValue
  >({
    resolver: zodResolver(tarifEditSchema),
    defaultValues: {
      daya: row.getValue("daya"),
      harga: row.getValue("harga"),
    },
  });
  // ada error di sini
  const [open, setOpen] = useState<boolean>(false);

  const handleEditTarif = (data: TarifEditSchemaValue) => {
    alert(`Editing Tarif: ${row.getValue("namaTarif")}\nDaya: ${data.daya}\nHarga: ${data.harga}`);
    
  };

  return (
    <Form {...editTarifForm}>
      <AlertDialog open={open} >
        <AlertDialogTrigger className="flex items-center gap-2 w-full">
          <Button variant="outline">Edit</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Edit Tarif {row.getValue("namaTarif")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <FormField
                control={editTarifForm.control}
                name="daya"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Daya</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editTarifForm.control}
                name="harga"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>harga</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {}}>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={editTarifForm.handleSubmit(handleEditTarif)}>Simpan</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};

export default EditButtonTarif;
