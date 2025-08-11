import { z } from "zod";

export const regsiterSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Silahkan isi nama Anda" })
      .min(3, { message: "Nama minimal 3 karakter" }),
    email: z
      .string()
      .email({ message: "Silahkan isi email yang valid" })
      .nonempty({ message: "Silahkan isi email Anda" }),
    address: z.string().nonempty({ message: "Silahkan isi alamat Anda" }),
    phone: z
      .string()
      .nonempty({ message: "Silahkan isi nomor telepon Anda" })
      .max(15, { message: "Nomor telepon maksimal 15 karakter" }),
    password: z.string().nonempty({ message: "Silahkan isi password Anda" }),
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });
