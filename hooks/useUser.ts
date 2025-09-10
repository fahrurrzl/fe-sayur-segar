import userService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import useChangeUrl from "./useChangeUrl";
import { useState } from "react";

const useUser = () => {
  const [sellectedId, setSellectedId] = useState("");

  const { data: session } = useSession();
  const { limit, page, search } = useChangeUrl();

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

  const getUserService = async () => {
    const res = await userService.getUser(sellectedId);
    return res.data;
  };

  const { data: dataUser, isLoading: isLoadingDataUser } = useQuery({
    queryKey: ["user", sellectedId],
    queryFn: getUserService,
    enabled: sellectedId !== "",
  });

  return {
    // query
    dataUsers,
    isLoadingDataUsers,
    dataUser,
    isLoadingDataUser,
    // use state
    setSellectedId,
  };
};

export default useUser;
