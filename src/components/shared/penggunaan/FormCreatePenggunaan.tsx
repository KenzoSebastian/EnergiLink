import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PenggunaanCreateSchemaValue } from "@/schema/penggunaanCreateSchema";
import { useQuery } from "convex/react";
import { CalendarIcon } from "lucide-react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { api } from "../../../../convex/_generated/api";

type FormCreatePenggunaanProps = {
  form: UseFormReturn<PenggunaanCreateSchemaValue>;
  onSubmitForm: (data: PenggunaanCreateSchemaValue) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
};

const FormCreatePenggunaan = ({
  form,
  onSubmitForm,
  currentDate,
  setCurrentDate,
}: FormCreatePenggunaanProps) => {
  const dataTarif = useQuery(api.tables.tarif.getAllTarif);

  const handleDateSelectMonth = (
    date: Date | undefined,
    field: ControllerRenderProps<
      {
        idPelanggan: string;
        idTarif: string;
        bulan: string;
        tahun: number;
        meterAwal: number;
        meterAkhir: number;
      },
      "bulan" | "tahun"
    >
  ) => {
    const month = date?.toLocaleString("id", { month: "long" });
    field.onChange(month);
    setCurrentDate(date || new Date());
  };

  const handleDateSelectYear = (
    date: Date | undefined,
    field: ControllerRenderProps<
      {
        idPelanggan: string;
        idTarif: string;
        bulan: string;
        tahun: number;
        meterAwal: number;
        meterAkhir: number;
      },
      "bulan" | "tahun"
    >
  ) => {
    const year = date?.getFullYear();
    field.onChange(year);
    setCurrentDate(date || new Date());
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitForm)}
        className="flex flex-col bg-white p-4 shadow rounded-lg"
      >
        <div className="flex flex-col md:flex-row gap-x-5 w-full justify-center">
          <FormField
            control={form.control}
            name="idPelanggan"
            render={({ field }) => (
              <FormItem className="mb-5 w-full">
                <FormLabel>Id Pelanggan</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="idTarif"
            render={({ field }) => (
              <FormItem className="mb-5 w-full">
                <FormLabel>Tarif</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Tarif Listrik" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dataTarif?.map((tarif) => (
                      <SelectItem key={tarif._id} value={tarif._id}>
                        {tarif.namaTarif}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-x-5 w-full justify-center">
          {" "}
          <FormField
            control={form.control}
            name="bulan"
            render={({ field }) => (
              <FormItem className="mb-5 w-full">
                <FormLabel>Bulan</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          <span>{field.value}</span>
                        ) : (
                          <span>
                            {currentDate.toLocaleString("id", {
                              month: "long",
                            })}
                          </span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      onMonthChange={(date) =>
                        handleDateSelectMonth(date, field)
                      }
                      disabled={true}
                      captionLayout="dropdown-months"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tahun"
            render={({ field }) => (
              <FormItem className="mb-5 w-full">
                <FormLabel>Tahun</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          <span>{field.value}</span>
                        ) : (
                          <span>{currentDate.getFullYear()}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={currentDate}
                      onMonthChange={(date) =>
                        handleDateSelectYear(date, field)
                      }
                      disabled={true}
                      captionLayout="dropdown-years"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-x-5 w-full justify-center">
          <FormField
            control={form.control}
            name="meterAwal"
            render={({ field }) => (
              <FormItem className="mb-5 w-full">
                <FormLabel>Meter Awal</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meterAkhir"
            render={({ field }) => (
              <FormItem className="mb-5 w-full">
                <FormLabel>Meter Akhir</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" variant="core" className="my-5 md:self-end">
          Simpan Penggunaan
        </Button>
      </form>
    </Form>
  );
};

export default FormCreatePenggunaan;
