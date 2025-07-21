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
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type dataTarifType } from "./TableTarif";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

const EditButtonTarif = ({ row }: { row: Row<dataTarifType> }) => {
  const editTarif = useMutation(api.tables.tarif.editTarif);

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
  const [open, setOpen] = useState<boolean>(false);

  const handleEditTarif = async (data: TarifEditSchemaValue) => {
    try {
      await editTarif({ ...data, id: row.getValue("_id") });
      toast.success("Tarif berhasil diedit.");
    } catch (error) {
      console.error("Error editing tarif:", error);
      toast.error("Gagal mengedit tarif.");
    }
    setOpen(false);
  };

  return (
    <Form {...editTarifForm}>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Edit Tarif {row.getValue("namaTarif")}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <div>
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
          </div>
          <AlertDialogDescription></AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {editTarifForm.reset()}}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={editTarifForm.handleSubmit(handleEditTarif)}
            >
              Simpan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};

export default EditButtonTarif;
