import { z } from "zod";

export const sellerSchema = z.object({
  storeName: z.string().min(3, "Nama lapak minimal 3 karakter"),
  storeLocation: z.string().nonempty("Lokasi lapak tidak boleh kosong"),
  description: z.string().optional(),
  bankName: z.string().nonempty("Nama bank tidak boleh kosong"),
  accountName: z.string().nonempty("Nama rekening tidak boleh kosong"),
  accountNumber: z.string().nonempty("Nomor rekening tidak boleh kosong"),
});
