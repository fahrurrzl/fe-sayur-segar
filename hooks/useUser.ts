import userService from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useChangeUrl from "./useChangeUrl";
import { useState } from "react";
import { addToast } from "@heroui/react";

const useUser = () => {
  const [sellectedId, setSellectedId] = useState("");

  const { data: session } = useSession();
  const { limit, page, search } = useChangeUrl();

  // get all users
  const getUsersService = async () => {
    let params = `search=${search}&page=${page}&limit=${limit}`;
    if (!search && !page && !limit) {
      params = "";
    }
    const res = await userService.getUsers(
      params,
      session?.user?.token as string
    );
    return res.data;
  };

  const { data: dataUsers, isLoading: isLoadingDataUsers } = useQuery({
    queryKey: ["users", search, page, limit],
    queryFn: getUsersService,
    enabled: session?.user.role === "superadmin",
  });

  // get user
  const getUserService = async () => {
    const res = await userService.getUser(sellectedId);
    return res.data;
  };

  const { data: dataUser, isLoading: isLoadingDataUser } = useQuery({
    queryKey: ["user", sellectedId],
    queryFn: getUserService,
    enabled: sellectedId !== "",
  });

  const queryClient = useQueryClient();

  // delete user
  const deleteUserService = async (id: string) => {
    const res = await userService.deleteUser(id, session?.user.token as string);
    return res.data;
  };

  const {
    mutate: mutateDeleteUser,
    isPending: isPendingDeleteUser,
    isSuccess: isSuccessDeleteUser,
  } = useMutation({
    mutationFn: (id: string) => deleteUserService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setSellectedId("");
      addToast({
        title: "Berhasil",
        description: "User berhasil dihapus",
        color: "success",
      });
    },
    onError: (error) => {
      console.log("error", error);
      setSellectedId("");
      addToast({
        title: "Gagal",
        description: "User gagal dihapus",
        color: "danger",
      });
    },
  });

  return {
    // query
    dataUsers,
    isLoadingDataUsers,
    dataUser,
    isLoadingDataUser,
    // use state
    setSellectedId,
    sellectedId,
    // mutation
    mutateDeleteUser,
    isPendingDeleteUser,
    isSuccessDeleteUser,
  };
};

export default useUser;
