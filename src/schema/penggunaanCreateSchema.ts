import z from "zod";

export const penggunaanCreateSchema = z.object({
  idPelanggan: z
    .string({ message: "ID Pelanggan harus diisi" })
    .min(1, { message: "ID Pelanggan tidak boleh kosong" }),
  idTarif: z
    .string({ message: "ID Tarif harus diisi" })
    .min(1, { message: "ID Tarif tidak boleh kosong" }),
  bulan: z
    .string({ message: "Bulan harus diisi" })
    .min(1, { message: "Bulan tidak boleh kosong" }),
  tahun: z.coerce
    .number({ message: "Tahun tidak valid" })
    .min(1, { message: "Tahun tidak boleh kosong" }),
  meterAwal: z.coerce
    .number({ message: "Meter awal harus berupa angka" })
    .min(1, { message: "Meter awal tidak boleh kosong" }),
  meterAkhir: z.coerce
    .number({ message: "Meter akhir harus berupa angka" })
    .min(1, { message: "Meter akhir tidak boleh kosong" }),
});

export type PenggunaanCreateSchemaValue = z.infer<
  typeof penggunaanCreateSchema
>;
