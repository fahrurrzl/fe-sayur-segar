import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { TRegister } from "@/types";
import { useRouter } from "next/navigation";

const regsiterSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Silahkan isi nama Anda" })
      .min(3, { message: "Nama minimal 3 karakter" }),
    email: z
      .string()
      .email({ message: "Silahkan isi email yang valid" })
      .nonempty({ message: "Silahkan isi email Anda" }),
    address: z.string().nonempty({ message: "Silahkan isi alamat Anda" }),
    phone: z
      .string()
      .nonempty({ message: "Silahkan isi nomor telepon Anda" })
      .max(15, { message: "Nomor telepon maksimal 15 karakter" }),
    password: z.string().nonempty({ message: "Silahkan isi password Anda" }),
    confirmPassword: z.string(),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

const useRegister = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(regsiterSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerService = async (data: TRegister) => authService.register(data);

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onSuccess: () => {
      reset();
      router.push("/auth/register-success");
    },
    onError: (error) => {
      console.log("error => ", error);
    },
  });

  const handleRegister = (data: TRegister) => mutateRegister(data);
  return {
    // state
    isVisiblePassword,
    setIsVisiblePassword,
    isVisibleConfirmPassword,
    setIsVisibleConfirmPassword,
    agreeToTerms,
    setAgreeToTerms,
    // mutation
    handleRegister,
    isPendingRegister,
    // form
    control,
    handleSubmit,
    errors,
  };
};

export default useRegister;
