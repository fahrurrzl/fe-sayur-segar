import { useMutation, useQueryClient } from "@tanstack/react-query";
import transferService from "@/services/transfer.service";
import { ITransfer } from "@/types/transfer";
import { useSession } from "next-auth/react";
import { addToast } from "@heroui/react";

const useTransfer = () => {
  const { data: session } = useSession();

  const createTransferService = async (payload: ITransfer) => {
    const res = await transferService.createTransfer(
      payload,
      session?.user?.token as string
    );
    return res.data;
  };

  const queryClient = useQueryClient();

  const {
    mutate: mutateTransfer,
    isPending: isPendingTransfer,
    isSuccess: isSuccessTransfer,
  } = useMutation({
    mutationFn: createTransferService,
    onSuccess: async (data) => {
      addToast({
        title: "Sukses",
        description: "Transfer berhasil",
        color: "success",
      });
      await queryClient.refetchQueries({
        queryKey: ["all-wallet-transactions"],
      });
      await queryClient.refetchQueries({
        queryKey: ["wallet-transactions"],
      });
      await queryClient.refetchQueries({
        queryKey: ["wallet-transaction-by-id", data?.data?.referenceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["all-wallet-transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["wallet-transactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["wallet-transaction-by-id", data?.data?.referenceId],
      });
      queryClient.invalidateQueries({
        queryKey: ["balance"],
      });
    },
    onError: (error) => {
      console.log(error);
      addToast({
        title: "Gagal",
        description: "Transfer gagal",
        color: "danger",
      });
    },
  });
  const handelTransfer = (payload: ITransfer) => mutateTransfer(payload);

  return {
    handelTransfer,
    isPendingTransfer,
    isSuccessTransfer,
  };
};

export default useTransfer;
