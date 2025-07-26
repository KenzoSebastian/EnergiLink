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
import { dataTagihanType } from "./TableTagihan";
import { Row } from "@tanstack/react-table";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

const ActionTagihanAdmin = ({ row }: { row: Row<dataTagihanType> }) => {
  const bayarTagihan = useMutation(api.tables.tagihan.bayarTagihan);

  const handleSubmit = async() => {
    try {
      await bayarTagihan({ id: row.getValue("_id") });
      toast.success("Tagihan berhasil diselesaikan.");
    } catch (error) {
      console.error("Error bayar tagihan:", error);
      toast.error("Gagal menyelesaikan tagihan.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-yellow-600 text-white p-2 hover:bg-yellow-700 shadow rounded-lg">
        Selesaikan Tagihan
      </AlertDialogTrigger>
      <AlertDialogContent className="overflow-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apa anda yakin ingin selesaikan tagihan ini?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription></AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>
            Selesaikan
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActionTagihanAdmin;
