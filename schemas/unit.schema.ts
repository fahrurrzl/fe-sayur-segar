import { z } from "zod";

export const unitSchema = z.object({
  name: z.string().nonempty("Nama tidak boleh kosong"),
  symbol: z.string().min(1, "Simbol minimal 1 karakter"),
});
