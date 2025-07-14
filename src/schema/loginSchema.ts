import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Format email tidak sesuai" }),
  password: z.string({ message: "Password wajib di isi" }),
});

export type LoginSchemaValue = z.infer<typeof loginSchema>;