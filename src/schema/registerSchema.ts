import z from "zod";

export const registerSchema = z.object({
  username: z.string({ message: "Username wajib di isi" }),
  alamat: z.string({ message: "Alamat wajib di isi" }),
  nomorKwh: z.coerce
    .number({ message: "Nomor KWH harus berupa angka" })
    .min(99999999999, { message: "Nomor KWH minimal 12 angka" })
    .max(999999999999, { message: "Nomor KWH maksimal 12 angka" }),
  email: z.email({ message: "Format email tidak sesuai" }),
  password: z
    .string({ message: "Password wajib di isi" })
    .min(8, { message: "Password minimal 8 karakter" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)/, {
      message: "Password harus terdiri dari huruf dan angka",
    }),
});

export type RegisterSchemaValue = z.infer<typeof registerSchema>;
