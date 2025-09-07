import { z } from "zod";

export const photoProfileSchema = z.object({
  photo: z.string().nonempty("Foto tidak boleh kosong"),
});
