import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Nama minimal 3 karakter")
    .nonempty("Nama tidak boleh kosong"),
  price: z.string().nonempty("Harga tidak boleh kosong"),
  stock: z.string().nonempty("Stok tidak boleh kosong"),
  categoryId: z.string().nonempty("Kategori tidak boleh kosong"),
  description: z.string().nonempty("Deskripsi tidak boleh kosong"),
  imageUrl: z.string().nonempty("Foto tidak boleh kosong"),
});
