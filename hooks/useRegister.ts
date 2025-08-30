import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { regsiterSchema } from "@/schemas/register.schema";
import { IRegister } from "@/types/auth";

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
      username: "",
      email: "",
      address: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerService = async (data: IRegister) => authService.register(data);

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onSuccess: () => {
      router.push("/auth/register-success");
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data);
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
