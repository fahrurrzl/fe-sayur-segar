import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
  phone: z.string().min(10, "Nomor telepon minimal 10 karakter"),
});
