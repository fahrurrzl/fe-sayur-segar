import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(8, { message: "Silahkan isi password lama" }),
    newPassword: z.string().min(8, { message: "Silahkan isi password baru" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Silahkan isi ulang password baru" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });
