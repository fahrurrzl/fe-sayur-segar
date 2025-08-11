import { loginSchema } from "@/schemas/login.schema";
import { TLogin } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useLogin = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginService = async (data: TLogin) => {
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl,
    });
    if (result?.error && result.status === 401) {
      throw new Error("Login gagal");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onSuccess: () => {
      router.push(callbackUrl);
    },
    onError: (error: any) => {
      console.log(error?.response.data);
    },
  });

  const handleLogin = (data: TLogin) => mutateLogin(data);

  return {
    // state
    isVisiblePassword,
    setIsVisiblePassword,

    // form
    control,
    handleSubmit,
    errors,

    // mutation
    handleLogin,
    isPendingLogin,
  };
};

export default useLogin;
