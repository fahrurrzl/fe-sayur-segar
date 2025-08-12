import { z } from "zod";

export const sellerSchema = z.object({
  storeName: z.string().min(3, "Nama lapak minimal 3 karakter"),
  storeLocation: z.string().nonempty("Lokasi lapak tidak boleh kosong"),
  bankAccount: z.string().nonempty("Nomor rekening tidak boleh kosong"),
  bankName: z.string().nonempty("Nama bank tidak boleh kosong"),
});
