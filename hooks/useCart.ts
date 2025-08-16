import cartService from "@/services/cart.service";
import { TCart } from "@/types";
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
    return res.data;
  };

  const { data: dataCarts, isLoading: isLoadingCarts } = useQuery({
    queryKey: ["carts"],
    queryFn: getCartsService,
    enabled: !!session?.user,
  });

  return {
    // mutate
    mutateAddToCart,
    isPendingAddToCart,
    // query
    dataCarts,
    isLoadingCarts,
  };
};

export default useCart;
