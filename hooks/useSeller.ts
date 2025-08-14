import sellerService from "@/services/seller.service";
import { TSeller } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellerSchema } from "@/schemas/seller.schema";
import { useSession } from "next-auth/react";
import useProfile from "./useProfile";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";

const useSeller = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { dataUser } = useProfile();

  // form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sellerSchema),
  });

  // create
  const createSellerService = async (payload: TSeller) => {
    const res = await sellerService.create(
      payload,
      session?.user?.token as string
    );
    return res.data;
  };

  const {
    mutate: mutateCreateSeller,
    isPending: isPendingCreateSeller,
    isError: isErrorCreateSeller,
  } = useMutation({
    mutationFn: createSellerService,
    onSuccess: ({ data }) => {
      router.push(`/dashboard`);
      addToast({
        title: "Berhasil",
        description: `Lapak ${data?.storeName} berhasil dibuat`,
        color: "success",
      });
    },
    onError: (error) => {
      console.log(error);
      addToast({
        title: "Gagal",
        description: "Lapak gagal dibuat",
        color: "danger",
      });
    },
  });

  const handleCreateSeller = (payload: TSeller) => mutateCreateSeller(payload);

  // show
  const getSellerService = async () => {
    const res = await sellerService.me(session?.user?.token as string);
    return res?.data?.data;
  };

  const { data: dataSeller, isLoading: isLoadingSeller } = useQuery({
    queryKey: ["seller"],
    queryFn: getSellerService,
    enabled: !!dataUser?.Seller?.length,
  });

  return {
    // form
    control,
    handleSubmit,
    errors,
    // mutation
    handleCreateSeller,
    isPendingCreateSeller,
    isErrorCreateSeller,
    // show
    dataSeller,
    isLoadingSeller,
  };
};

export default useSeller;
