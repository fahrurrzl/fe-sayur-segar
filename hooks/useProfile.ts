import authService from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useProfile = () => {
  const { data: session } = useSession();

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
    enabled: true,
  });

  return {
    dataUser,
    isLoadingUser,
    isErrorUser,
  };
};

export default useProfile;
