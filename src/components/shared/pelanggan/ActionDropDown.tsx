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
import { Row } from "@tanstack/react-table";
import { useMutation } from "convex/react";
import { Copy, Info, MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../../../convex/_generated/api";
import { dataPelangganType } from "./TablePelanggan";

const ActionDropDown = ({ row }: { row: Row<dataPelangganType> }) => {
  const deleteUser = useMutation(api.tables.user.deleteUsers);

  const [open, setOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      const result = await deleteUser({ idArray: [row.getValue("_id")] });
      toast.success(`${result.deletedCount} Pelanggan berhasil dihapus.`);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Gagal menghapus pelanggan.");
    }
    setOpen(false);
  };
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(row.getValue("_id"));
      toast.success("ID Pelanggan berhasil disalin!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Gagal menyalin ID Pelanggan.");
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
          <AlertDialog>
            <AlertDialogTrigger className="flex items-center gap-2 w-full">
              <Info color="blue" /> detail pelanggan
            </AlertDialogTrigger>
            <AlertDialogContent className="overflow-auto">
              <AlertDialogHeader>
                <AlertDialogTitle>Detail Pelanggan</AlertDialogTitle>
              </AlertDialogHeader>
              <table className="text-black">
                <tbody>
                  <tr>
                    <td className="py-2">Id Pelanggan</td>
                    <td className="px-2 py-2">:</td>
                    <td className="py-2 flex items-center gap-2">
                      {row.getValue("_id")}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer relative group"
                        onClick={handleCopyToClipboard}
                      >
                        <p className="absolute -top-6 opacity-0 transition-all duration-300 group-hover:opacity-100">
                          Salin
                        </p>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">Username</td>
                    <td className="px-2 py-2">:</td>
                    <td className="py-2">{row.getValue("username")}</td>
                  </tr>
                  <tr>
                    <td className="py-2">Email</td>
                    <td className="px-2 py-2">:</td>
                    <td className="py-2">{row.getValue("email")}</td>
                  </tr>
                  <tr>
                    <td className="py-2">no KWH</td>
                    <td className="px-2 py-2">:</td>
                    <td className="py-2">{row.getValue("nomorKwh")}</td>
                  </tr>
                </tbody>
              </table>
              <AlertDialogDescription></AlertDialogDescription>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)}>
                  Tutup
                </AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">
          <AlertDialog>
            <AlertDialogTrigger className="flex items-center gap-2 w-full">
              <Trash color="red" /> hapus pelanggan
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
                <AlertDialogDescription>
                  Anda akan menghapus pelanggan ini. Tindakan ini tidak dapat
                  dibatalkan.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpen(false)}>
                  Batal
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600"
                  onClick={handleDelete}
                >
                  Hapus
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDropDown;
