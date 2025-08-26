import walletTransactionService from "@/services/wallet-transaction.service";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useWalletTransaction = () => {
  const { data: session } = useSession();
  const getWalletTransactionsService = async () => {
    const res = await walletTransactionService.getWalletTransactions(
      session?.user.token as string
    );
    return res.data;
  };

  const {
    data: dataWalletTransactions,
    isLoading: isLoadingWalletTransactions,
  } = useQuery({
    queryKey: ["wallet-transactions"],
    queryFn: getWalletTransactionsService,
  });

  return {
    dataWalletTransactions,
    isLoadingWalletTransactions,
  };
};

export default useWalletTransaction;
