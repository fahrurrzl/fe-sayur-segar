import walletService from "@/services/wallet.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useWallet = () => {
  const { data: session } = useSession();

  const getBalanceService = async () => {
    const res = await walletService.getBalance(session?.user?.token as string);
    return res.data;
  };

  const { data: dataBalance, isLoading: isLoadingBalance } = useQuery({
    queryKey: ["balance"],
    queryFn: getBalanceService,
  });

  return {
    dataBalance,
    isLoadingBalance,
  };
};

export default useWallet;
