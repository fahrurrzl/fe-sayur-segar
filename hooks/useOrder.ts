import { orderSchema } from "@/schemas/order.schema";
import orderService from "@/services/order.service";
import { TOrderInput } from "@/types";
import { addToast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

const useOrder = () => {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("invoiceId");
  const router = useRouter();
  const { data: session } = useSession();
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
    const res = await orderService.getOrderUser(session?.user?.token as string);
    return res.data;
  };

  const { data: dataOrderUser, isLoading: isLoadingDataOrderUser } = useQuery({
    queryKey: ["order-user"],
    queryFn: getOrderUserService,
  });

  // get order seller
  const getOrderSellerService = async () => {
    const res = await orderService.getOrderSeller(
      session?.user?.token as string
    );
    return res.data;
  };

  const { data: dataOrderSeller, isLoading: isLoadingDataOrderSeller } =
    useQuery({
      queryKey: ["order-seller"],
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
  };
};

export default useOrder;
