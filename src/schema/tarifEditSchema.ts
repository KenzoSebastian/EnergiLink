import z from "zod";

export const tarifEditSchema = z.object({
  daya: z.coerce
    .number({ message: "daya harus berupa angka" })
    .min(1, { message: "daya minimal 1" }),
  harga: z.coerce
    .number({ message: "harga harus berupa angka" })
    .min(1, { message: "harga minimal 1" }),
});

export type TarifEditSchemaValue = z.infer<typeof tarifEditSchema>;
