import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  gender: z.string().min(3, "Gender minimal 3 karakter"),
  birthDate: z.string().min(3, "Tanggal lahir minimal 3 karakter"),
  photo: z.string().optional(),
  email: z.string().email("Email tidak valid"),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
  phone: z.string().min(10, "Nomor telepon minimal 10 karakter"),
});
