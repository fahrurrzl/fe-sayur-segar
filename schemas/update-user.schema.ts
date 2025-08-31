import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(3, "Nama minimal 3 karakter"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  gender: z.string().nonempty("Gender tidak boleh kosong"),
  birthDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Tanggal lahir tidak valid",
    })
    .transform((val) => new Date(val))
    .refine(
      (date) => {
        if (!(date instanceof Date) || isNaN(date.getTime())) return false;
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const m = today.getMonth() - date.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
          age--;
        }
        return age >= 17;
      },
      { message: "Umur minimal 17 tahun" }
    ),
  photo: z.string().optional(),
  email: z.string().email("Email tidak valid"),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
  phone: z.string().min(10, "Nomor telepon minimal 10 karakter"),
});
