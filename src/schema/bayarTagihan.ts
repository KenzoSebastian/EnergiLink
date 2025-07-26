import z from "zod";

export const bayarTagihanSchema = z.object({
  id: z.string({ message: "id wajib di isi" }).min(1, { message: "id wajib di isi" }),
  amount: z.coerce.number({ message: "amount harus berupa angka" }).min(1, { message: "amount wajib di isi" }),
});

export type BayarTagihanSchemaValue = z.infer<typeof bayarTagihanSchema>;
