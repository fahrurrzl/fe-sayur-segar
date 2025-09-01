"use client";

import { orderSchema } from "@/schemas/order.schema";
import orderService from "@/services/order.service";
import { TOrderInput } from "@/types/order";
import { addToast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useChangeUrl from "./useChangeUrl";

const useOrder = () => {
  const [orderId, setOrderId] = useState("");
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("invoiceId");
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { search, page, limit } = useChangeUrl();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      address: "",
    },
  });

  // create order / checkout
  const createOrderService = async (payload: TOrderInput) => {
    const res = await orderService.create(
      payload,
      session?.user?.token as string
    );
    return res.data;
  };

  const { mutate: mutateCreateOrder, isPending: isPendingCreateOrder } =
    useMutation({
      mutationFn: createOrderService,
      onSuccess: (order) => {
        const paymentUrl = order?.data[0].paymentUrl;
        router.push(paymentUrl);
      },
      onError: (error) => {
        console.log(error);
        addToast({
          title: "Gagal",
          description: "Gagal membuat order",
          color: "danger",
        });
      },
    });

  const handleCreateOrder = (payload: TOrderInput) =>
    mutateCreateOrder(payload);

  // get order user
  const getOrderUserService = async () => {
    let params = `search=${search}&page=${page}&limit=${limit}`;
    if (!search && !page && !limit) {
      params = "";
    }
    const res = await orderService.getOrderUser(
      session?.user?.token as string,
      params
    );
    return res.data;
  };

  const { data: dataOrderUser, isLoading: isLoadingDataOrderUser } = useQuery({
    queryKey: ["order-user", search, page, limit],
    queryFn: getOrderUserService,
  });

  // get order seller
  const getOrderSellerService = async () => {
    let params = `search=${search}&page=${page}&limit=${limit}`;
    if (!search && !page && !limit) {
      params = "";
    }
    const res = await orderService.getOrderSeller(
      session?.user?.token as string,
      params
    );
    return res.data;
  };

  const { data: dataOrderSeller, isLoading: isLoadingDataOrderSeller } =
    useQuery({
      queryKey: ["order-seller", search, page, limit],
      queryFn: getOrderSellerService,
    });

  // get order by invoice id
  const getOrderByInvoiceIdService = async (invoiceId: string) => {
    const res = await orderService.getOrderByInvoiceId(
      invoiceId,
      session?.user?.token as string
    );
    return res.data;
  };

  const {
    data: dataOrderByInvoiceId,
    isLoading: isLoadingDataOrderByInvoiceId,
  } = useQuery({
    queryKey: ["order-by-invoice-id", invoiceId],
    queryFn: () => getOrderByInvoiceIdService(invoiceId as string),
    enabled: !!invoiceId,
  });

  const getOrderByIdService = async () => {
    const res = await orderService.getOrderById(
      orderId,
      session?.user?.token as string
    );
    return res.data;
  };

  const { data: dataOrderById, isLoading: isLoadingDataOrderById } = useQuery({
    queryKey: ["order-by-id", orderId],
    queryFn: getOrderByIdService,
    enabled: !!orderId,
  });

  const isProcessingService = async (id: string) => {
    const res = await orderService.isProcessing(
      id,
      session?.user?.token as string
    );
    return res.data;
  };

  const { mutate: mutateIsProcessing, isPending: isPendingIsProcessing } =
    useMutation({
      mutationFn: (id: string) => isProcessingService(id),
      onSuccess: (order) => {
        queryClient.invalidateQueries({
          queryKey: ["order-seller"],
        });
        queryClient.invalidateQueries({
          queryKey: ["order-by-id", order?.data?.id],
        });
        addToast({
          title: "Berhasil",
          description: "Order berhasil diupdate",
          color: "success",
        });
      },
      onError: (error) => {
        console.log(error);
        addToast({
          title: "Gagal",
          description: "Gagal mengupdate order",
          color: "danger",
        });
      },
    });

  const isDeliveredService = async (id: string) => {
    const res = await orderService.isDelivered(
      id,
      session?.user?.token as string
    );
    return res.data;
  };

  const { mutate: mutateIsDelivered, isPending: isPendingIsDelivered } =
    useMutation({
      mutationFn: (id: string) => isDeliveredService(id),
      onSuccess: (order) => {
        queryClient.invalidateQueries({
          queryKey: ["order-seller"],
        });
        queryClient.invalidateQueries({
          queryKey: ["order-by-id", order?.data?.id],
        });
        addToast({
          title: "Berhasil",
          description: "Order berhasil diupdate",
          color: "success",
        });
      },
      onError: (error) => {
        console.log(error);
        addToast({
          title: "Gagal",
          description: "Gagal mengupdate order",
          color: "danger",
        });
      },
    });

  const isCompletedService = async (id: string) => {
    const res = await orderService.isCompleted(
      id,
      session?.user?.token as string
    );
    return res.data;
  };

  const { mutate: mutateIsCompleted, isPending: isPendingIsCompleted } =
    useMutation({
      mutationFn: (id: string) => isCompletedService(id),
      onSuccess: (order) => {
        queryClient.invalidateQueries({
          queryKey: ["order-seller"],
        });
        queryClient.invalidateQueries({
          queryKey: ["order-by-id", order?.data?.id],
        });
        addToast({
          title: "Berhasil",
          description: "Order berhasil diupdate",
          color: "success",
        });
      },
      onError: (error) => {
        console.log(error);
        addToast({
          title: "Gagal",
          description: "Gagal mengupdate order",
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
    // create order
    handleCreateOrder,
    isPendingCreateOrder,
    // get order user
    dataOrderUser,
    isLoadingDataOrderUser,
    // get order seller
    dataOrderSeller,
    isLoadingDataOrderSeller,
    // get order by invoice id
    dataOrderByInvoiceId,
    isLoadingDataOrderByInvoiceId,
    // get order by id
    dataOrderById,
    isLoadingDataOrderById,
    // order id state
    orderId,
    setOrderId,
    // update order
    mutateIsProcessing,
    isPendingIsProcessing,
    mutateIsDelivered,
    isPendingIsDelivered,
    mutateIsCompleted,
    isPendingIsCompleted,
  };
};

export default useOrder;
