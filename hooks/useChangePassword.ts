import { changePasswordSchema } from "@/schemas/change-password.schema";
import authService from "@/services/auth.service";
import { TChangePassword } from "@/types/auth";
import { addToast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useChangePassword = () => {
  const [isVisibleOldPassword, setIsVisibleOldPassword] = useState(false);
  const [isVisibleNewPassword, setIsVisibleNewPassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);

  const { data: session } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const changePasswordService = async (payload: TChangePassword) => {
    const res = await authService.changePassword(
      payload,
      session?.user?.token as string
    );
    return res.data.data;
  };

  const { mutate: mutateChangePassword, isPending: isPendingChangePassword } =
    useMutation({
      mutationFn: changePasswordService,
      onSuccess: () => {
        addToast({
          title: "Berhasil",
          description: "Password berhasil diubah",
          color: "success",
        });
        reset();
      },
      onError: (error: any) => {
        console.log(error);
        addToast({
          title: "Gagal",
          description: error.response?.data?.message,
          color: "danger",
        });
      },
    });

  const handleChangePassword = (payload: TChangePassword) =>
    mutateChangePassword(payload);

  return {
    // form
    control,
    handleSubmit,
    errors,
    // mutation
    handleChangePassword,
    isPendingChangePassword,
    // visibility
    isVisibleOldPassword,
    setIsVisibleOldPassword,
    isVisibleNewPassword,
    setIsVisibleNewPassword,
    isVisibleConfirmPassword,
    setIsVisibleConfirmPassword,
  };
};

export default useChangePassword;
