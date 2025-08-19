import { orderSchema } from "@/schemas/order.schema";
import orderService from "@/services/order.service";
import { TOrderInput } from "@/types";
import { addToast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

const useOrder = () => {
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
      },
      onError: () => {
        addToast({
          title: "Gagal",
          description: "Gagal membuat order",
          color: "danger",
        });
      },
    });

  const handleCreateOrder = (payload: TOrderInput) =>
    mutateCreateOrder(payload);

  return {
    // form
    control,
    handleSubmit,
    setValue,
    errors,
    // create order
    handleCreateOrder,
    isPendingCreateOrder,
  };
};

export default useOrder;
