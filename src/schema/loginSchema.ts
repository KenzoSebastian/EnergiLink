import z from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Format email tidak sesuai" }),
  password: z
    .string({ message: "Password wajib di isi" })
    .min(8, { message: "Password minimal 8 karakter" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, {
      message: "Password harus terdiri dari huruf dan angka",
    }),
});

export type LoginSchemaValue = z.infer<typeof loginSchema>;
