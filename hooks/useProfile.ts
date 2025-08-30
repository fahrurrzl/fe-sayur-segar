import { updateUserSchema } from "@/schemas/update-user.schema";
import authService from "@/services/auth.service";
import { IUpdateUser } from "@/types/auth";
import { addToast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const useProfile = () => {
  const { data: session, update } = useSession();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      username: "",
      gender: "",
      birthDate: "",
      photo: "",
    },
  });

  // get user by id
  const getUserByIdService = async () => {
    const res = await authService.getUserById(session?.user?.token as string);
    return res.data.data;
  };

  const {
    data: dataUser,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserByIdService,
    enabled: !!session,
  });

  // update user
  const updateUserService = async (payload: IUpdateUser) => {
    const res = await authService.updateUser(
      payload,
      session?.user?.token as string
    );
    return res.data.data;
  };

  const queryClient = useQueryClient();

  const { mutate: mutateUpdateUser, isPending: isPendingUpdateUser } =
    useMutation({
      mutationFn: updateUserService,
      onSuccess: async (updatedUser) => {
        addToast({
          title: "Berhasil",
          description: "User berhasil diubah",
          color: "success",
        });
        await update({
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          username: updatedUser.username,
          gender: updatedUser.gender,
          birthDate: updatedUser.birthDate,
          photo: updatedUser.photo,
        });
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
      onError: (error) => {
        console.log(error);
        addToast({
          title: "Gagal",
          description: "User gagal diubah",
          color: "danger",
        });
      },
    });

  const handleUpdateUser = (payload: IUpdateUser) => mutateUpdateUser(payload);

  return {
    // form
    control,
    handleSubmit,
    setValue,
    errors,
    // query
    dataUser,
    isLoadingUser,
    isErrorUser,
    // mutation
    isPendingUpdateUser,
    handleUpdateUser,
  };
};

export default useProfile;
