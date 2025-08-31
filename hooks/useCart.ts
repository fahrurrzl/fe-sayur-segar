import cartService from "@/services/cart.service";
import { TCart } from "@/types/cart";
import { addToast } from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useCart = () => {
  const router = useRouter();
  const { data: session } = useSession();

  // add to cart
  const addToCartService = async (payload: TCart) => {
    if (!session?.user) {
      router.push("/auth/login");
      throw new Error("Anda belum login");
    }

    const res = await cartService.addToCart(
      payload,
      session?.user.token as string
    );
    return res.data;
  };

  const queryClient = useQueryClient();

  const { mutate: mutateAddToCart, isPending: isPendingAddToCart } =
    useMutation({
      mutationFn: (variables: { payload: TCart }) =>
        addToCartService(variables.payload),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["carts"] });
        addToast({
          title: "Berhasil",
          description: "Produk berhasil ditambahkan ke keranjang",
          color: "success",
        });
      },
      onError: (error) => {
        console.log(error);
        addToast({
          title: "Gagal",
          description: "Produk gagal ditambahkan ke keranjang",
          color: "danger",
        });
      },
    });

  // get carts
  const getCartsService = async () => {
    const res = await cartService.getCarts(session?.user.token as string);
    return res.data || null;
  };

  const { data: dataCarts, isLoading: isLoadingCarts } = useQuery({
    queryKey: ["carts"],
    queryFn: getCartsService,
    enabled: !!session?.user,
  });

  // delete item in cart
  const deleteItemService = async (itemId: string) => {
    const res = await cartService.deleteItem(
      itemId,
      session?.user.token as string
    );
    return res.data;
  };

  const { mutate: mutateDeleteItem, isPending: isPendingDeleteItem } =
    useMutation({
      mutationFn: (variables: { itemId: string }) =>
        deleteItemService(variables.itemId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["carts"], exact: true });

        addToast({
          title: "Berhasil",
          description: "Produk berhasil dihapus dari keranjang",
          color: "success",
        });
      },
      onError: (error) => {
        console.log(error);
        addToast({
          title: "Gagal",
          description: "Produk gagal dihapus dari keranjang" + error,
          color: "danger",
        });
      },
    });

  // increase quantity
  const increaseService = async (itemId: string) => {
    const res = await cartService.increaseQuantity(
      itemId,
      session?.user?.token as string
    );
    return res.data;
  };

  const {
    mutate: mutateIncreaseQuantity,
    isPending: isPendingIncreaseQuantity,
  } = useMutation({
    mutationFn: (variables: { itemId: string }) =>
      increaseService(variables.itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"], exact: true });
    },
    onError: (error) => {
      console.log(error);
      addToast({
        title: "Gagal",
        description: "Jumlah produk gagal ditambahkan" + error,
        color: "danger",
      });
    },
  });

  // decrese quantity
  const decreaseService = async (itemId: string) => {
    const res = await cartService.decreaseQuantity(
      itemId,
      session?.user?.token as string
    );
    return res.data;
  };

  const {
    mutate: mutateDecreaseQuantity,
    isPending: isPendingDecreaseQuantity,
  } = useMutation({
    mutationFn: (variables: { itemId: string }) =>
      decreaseService(variables.itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"], exact: true });
    },
    onError: (error) => {
      console.log(error);
      addToast({
        title: "Gagal",
        description: "Jumlah produk gagal dikurangi" + error,
        color: "danger",
      });
    },
  });

  return {
    // mutate
    mutateAddToCart,
    isPendingAddToCart,
    // query
    dataCarts,
    isLoadingCarts,
    // mutate delete item
    mutateDeleteItem,
    isPendingDeleteItem,
    // mutate increase quantity
    mutateIncreaseQuantity,
    isPendingIncreaseQuantity,
    // mutate decrease quantity
    mutateDecreaseQuantity,
    isPendingDecreaseQuantity,
  };
};

export default useCart;
