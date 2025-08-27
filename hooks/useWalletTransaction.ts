import { walletTransactionSchema } from "@/schemas/wallet-transaction.schema";
import walletTransactionService from "@/services/wallet-transaction.service";
import { addToast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const useWalletTransaction = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data: session } = useSession();

  // get all wallet transaction (superadmin)
  const getAllWalletTransactionsService = async () => {
    const res = await walletTransactionService.getAllWalletTransacions(
      session?.user.token as string
    );
    return res.data;
  };

  const {
    data: dataAllWalletTransactions,
    isLoading: isLoadingGetAllTransactions,
  } = useQuery({
    queryKey: ["all-wallet-transactions"],
    queryFn: getAllWalletTransactionsService,
    staleTime: 0,
  });

  // get wallet transaction
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

  // get wallet transaction by id
  const getWalletTransactionByIdService = async () => {
    const res = await walletTransactionService.getWalletTransactionById(
      selectedId as string,
      session?.user.token as string
    );
    return res.data;
  };

  const {
    data: dataWalletTransactionById,
    isLoading: isLoadingWalletTransactionById,
  } = useQuery({
    queryKey: ["wallet-transaction-by-id", selectedId],
    queryFn: getWalletTransactionByIdService,
    enabled: selectedId !== null,
  });

  // use form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(walletTransactionSchema),
    defaultValues: {
      amount: "",
    },
  });

  const queryClient = useQueryClient();

  // create wallet transaction
  const createWalletTransactionService = async (payload: {
    amount: number;
  }) => {
    const res = await walletTransactionService.createWalletTransaction(
      payload,
      session?.user.token as string
    );

    return res.data;
  };

  const {
    mutate: createWalletTransaction,
    isPending: isCreating,
    isSuccess: isSuccessCreate,
  } = useMutation({
    mutationFn: createWalletTransactionService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      addToast({
        title: "Berhasil",
        description: "Transaksi berhasil dibuat",
        color: "success",
      });
      reset();
    },
    onError: (error: any) => {
      console.log(error);
      addToast({
        title: "Gagal membuat transaksi",
        description: error?.response?.data.message,
        color: "danger",
      });
    },
  });

  const handleCreateWalletTransaction = (payload: { amount: string }) => {
    createWalletTransaction({
      ...payload,
      amount: Number(payload.amount),
    });
  };

  // delete wallet transaction (superadmin)
  const deleteWalletTransactionService = async (id: string) => {
    const res = await walletTransactionService.deleteWalletTransaction(
      id,
      session?.user.token as string
    );
    return res.data;
  };

  const {
    mutate: mutateDeleteWalletTransaction,
    isPending: isPendingDeleteWalletTransaction,
    isSuccess: isSuccessDeleteWalletTransaction,
  } = useMutation({
    mutationFn: deleteWalletTransactionService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-wallet-transactions"] });
      addToast({
        title: "Berhasil",
        description: "Transaksi berhasil dihapus",
        color: "success",
      });
    },
    onError: (error: any) => {
      console.log(error);
      addToast({
        title: "Gagal",
        description: "Transaksi gagal dihapus",
        color: "danger",
      });
    },
  });

  return {
    // get wallet transaction
    dataWalletTransactions,
    isLoadingWalletTransactions,
    dataAllWalletTransactions,
    isLoadingGetAllTransactions,
    // get wallet transaction by id
    dataWalletTransactionById,
    isLoadingWalletTransactionById,
    selectedId,
    setSelectedId,
    // use form
    control,
    errors,
    handleSubmit,
    // create wallet transaction
    handleCreateWalletTransaction,
    isCreating,
    isSuccessCreate,
    // delete wallet transaction
    mutateDeleteWalletTransaction,
    isPendingDeleteWalletTransaction,
    isSuccessDeleteWalletTransaction,
  };
};

export default useWalletTransaction;
