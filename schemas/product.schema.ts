import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Nama minimal 3 karakter")
    .nonempty("Nama tidak boleh kosong"),
  price: z.number().min(1, "Harga tidak boleh kosong"),
  stock: z.number().min(1, "Stok tidak boleh kosong"),
  unitId: z.string().nonempty("Satuan tidak boleh kosong"),
  categoryId: z.string().nonempty("Kategori tidak boleh kosong"),
  description: z.string().nonempty("Deskripsi tidak boleh kosong"),
  imageUrl: z.string().nonempty("Foto tidak boleh kosong"),
});
