import { orderSchema } from "@/schemas/order.schema";
import orderService from "@/services/order.service";
import { TOrderInput } from "@/types";
import { addToast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const useOrder = () => {
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
      onSuccess: () => {
        addToast({
          title: "Success",
          description: "Pesanan berhasil dibuat",
          color: "success",
        });
        router.push("/dashboard/my-order");
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
  };
};

export default useOrder;
