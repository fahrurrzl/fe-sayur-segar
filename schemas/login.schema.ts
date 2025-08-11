import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Silahkan isi email yang valid" })
    .nonempty({ message: "Silahkan isi email Anda" }),
  password: z.string().nonempty({ message: "Silahkan isi password Anda" }),
});
