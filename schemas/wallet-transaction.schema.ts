import { z } from "zod";

export const walletTransactionSchema = z.object({
  amount: z.string().nonempty({ message: "Masukkan jumlah penarikan" }),
});
