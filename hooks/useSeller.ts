import sellerService from "@/services/seller.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellerSchema } from "@/schemas/seller.schema";
import { useSession } from "next-auth/react";
import { addToast } from "@heroui/react";
import { useRouter } from "next/navigation";
import walletService from "@/services/wallet.service";
import { useState } from "react";
import { TSeller } from "@/types/seller";
import useChangeUrl from "./useChangeUrl";

const useSeller = () => {
  const [sellerId, setSellerId] = useState<string | null>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const { category, search, page, limit } = useChangeUrl();

  // form
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
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

  // create wallet
  const createWalletService = async () => {
    const res = await walletService.create(session?.user?.token as string);
    return res.data;
  };

  const { mutate: mutateCreateWallet } = useMutation({
    mutationFn: createWalletService,
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    mutate: mutateCreateSeller,
    isPending: isPendingCreateSeller,
    isError: isErrorCreateSeller,
  } = useMutation({
    mutationFn: createSellerService,
    onSuccess: ({ data }) => {
      mutateCreateWallet();
      addToast({
        title: "Berhasil",
        description: `Lapak ${data?.storeName} berhasil dibuat`,
        color: "success",
      });
      router.push(`/dashboard/store-info`);
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
    let params = `category=${category}&search=${search}&page=${page}&limit=${limit}`;
    if (!category && !search && !page && !limit) {
      params = "";
    }
    const res = await sellerService.me(session?.user?.token as string, params);
    return res?.data?.data;
  };

  const { data: dataSeller, isLoading: isLoadingSeller } = useQuery({
    queryKey: ["seller", page, limit, search, category],
    queryFn: getSellerService,
  });

  // update
  const updateSellerService = async (payload: TSeller) => {
    const res = await sellerService.update(
      payload,
      session?.user?.token as string
    );
    return res.data;
  };

  const { mutate: mutateUpdateSeller, isPending: isPendingUpdateSeller } =
    useMutation({
      mutationFn: updateSellerService,
      onSuccess: () => {
        router.push(`/dashboard/store-info`);
        addToast({
          title: "Berhasil",
          description: `Lapak berhasil diubah`,
          color: "success",
        });
      },
      onError: (error) => {
        console.log(error);
        addToast({
          title: "Gagal",
          description: "Lapak gagal diubah",
          color: "danger",
        });
      },
    });

  const handleUpdateStore = (payload: TSeller) => mutateUpdateSeller(payload);

  // get all seller
  const getAllSellerService = async () => {
    let params = `search=${search}&page=${page}&limit=${limit}`;
    if (!search && !page && !limit) {
      params = "";
    }
    const res = await sellerService.index(
      session?.user?.token as string,
      params
    );
    return res.data;
  };

  const { data: dataAllSeller, isLoading: isLoadingAllSeller } = useQuery({
    queryKey: ["all-seller", page, limit, search],
    queryFn: getAllSellerService,
    enabled: !!session,
  });

  const getSellerByIdService = async () => {
    const res = await sellerService.getSellerById(
      sellerId as string,
      session?.user?.token as string
    );
    return res.data;
  };

  const { data: dataSellerById, isLoading: isLoadingSellerById } = useQuery({
    queryKey: ["seller-by-id", sellerId],
    queryFn: () => getSellerByIdService(),
    enabled: !!sellerId,
  });

  // update verified
  const updateVerifiedService = async (id: string) => {
    const res = await sellerService.updateVerified(
      id,
      session?.user?.token as string
    );
    return res.data;
  };

  const queryClient = useQueryClient();

  const { mutate: mutateUpdateVerified, isPending: isPendingUpdateVerified } =
    useMutation({
      mutationFn: (id: string) => updateVerifiedService(id),
      onSuccess: (seller) => {
        queryClient.invalidateQueries({
          queryKey: ["all-seller"],
        });
        queryClient.invalidateQueries({
          queryKey: ["seller-by-id", seller?.data?.id],
        });
        addToast({
          title: "Berhasil",
          description: `Lapak verified`,
          color: "success",
        });
      },
      onError: (error) => {
        console.log(error);
        addToast({
          title: "Gagal",
          description: "Lapak gagal verified",
          color: "danger",
        });
      },
    });

  // admin delete seller
  const adminDeleteSellerService = async (id: string) => {
    const res = await sellerService.adminDeleteSeller(
      id,
      session?.user?.token as string
    );
    return res.data;
  };

  const {
    mutate: mutateAdminDeleteSeller,
    isPending: isPendingAdminDeleteSeller,
    isSuccess: isSuccessAdminDeleteSeller,
  } = useMutation({
    mutationFn: (id: string) => adminDeleteSellerService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["all-seller"],
      });
      addToast({
        title: "Berhasil",
        description: `Lapak berhasil dihapus`,
        color: "success",
      });
    },
    onError: (error) => {
      console.log(error);
      addToast({
        title: "Gagal",
        description: "Lapak gagal dihapus",
        color: "danger",
      });
    },
  });

  return {
    // form
    control,
    handleSubmit,
    setValue,
    errors,
    // mutation
    handleCreateSeller,
    isPendingCreateSeller,
    isErrorCreateSeller,
    handleUpdateStore,
    isPendingUpdateSeller,
    mutateAdminDeleteSeller,
    isPendingAdminDeleteSeller,
    isSuccessAdminDeleteSeller,
    // mutation verified
    mutateUpdateVerified,
    isPendingUpdateVerified,
    // show
    dataSeller,
    isLoadingSeller,
    // get all users
    dataAllSeller,
    isLoadingAllSeller,
    // get seller by id
    dataSellerById,
    isLoadingSellerById,
    setSellerId,
  };
};

export default useSeller;
