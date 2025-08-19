"use client";

import useCart from "@/hooks/useCart";
import useProfile from "@/hooks/useProfile";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { Button } from "@heroui/button";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
  Textarea,
} from "@heroui/react";
import React, { useEffect } from "react";
import { FiMapPin, FiShoppingCart } from "react-icons/fi";
import CartItem from "../cart-item";
import { TCartItem } from "@/types";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import useOrder from "@/hooks/useOrder";
import { Controller } from "react-hook-form";

const Checkout = ({ id }: { id: string }) => {
  const router = useRouter();
  const { dataUser } = useProfile();
  const { dataCarts, isLoadingCarts } = useCart();
  const {
    // form
    control,
    handleSubmit,
    setValue,
    errors,
    // create order
    handleCreateOrder,
    isPendingCreateOrder,
  } = useOrder();

  const subTotal = dataCarts?.data?.items?.reduce(
    (total: number, item: TCartItem) => total + item.price,
    0
  );
  const total = subTotal;

  useEffect(() => {
    if (dataUser) {
      setValue("address", dataUser?.address || "");
    }
  }, [dataUser]);

  console.log(dataCarts?.data?.items?.length);

  return (
    <form onSubmit={handleSubmit(handleCreateOrder)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="col-span-2 space-y-4">
          <Card radius="sm" shadow="sm">
            <CardHeader>
              <FiMapPin className="w-5 h-5 text-success mr-2" />
              <h2 className="text-xl lg:text-2xl font-semibold">Alamat</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-1">
                <Skeleton isLoaded={!!dataUser?.address} className="rounded-md">
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Alamat"
                        placeholder="Masukkan alamat"
                        variant="bordered"
                      />
                    )}
                  />
                </Skeleton>
              </div>
            </CardBody>
          </Card>

          <Card radius="sm" shadow="sm">
            <CardHeader>
              <FiShoppingCart className="w-5 h-5 text-success mr-2" />
              <h2 className="text-xl lg:text-2xl font-semibold">
                Keranjang Belanja{" "}
                {dataCarts?.data?._count.items &&
                  `(${dataCarts?.data?._count.items} item)`}
              </h2>
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-between flex-col gap-4">
                {isLoadingCarts ? (
                  <Skeleton
                    isLoaded={!!dataCarts?.data?.items}
                    className="w-full rounded-md h-24"
                  />
                ) : (
                  dataCarts?.data?.items?.map((item: TCartItem) => (
                    <CartItem key={item?.id} item={item} />
                  ))
                )}

                {!dataCarts?.data?.items?.length && (
                  <Skeleton
                    isLoaded={!isLoadingCarts}
                    className="w-full rounded-md h-24"
                  >
                    <div className="w-full flex items-center justify-center flex-col gap-4">
                      <p className="text-slate-600 font-semibold">
                        Silahkan pilih produk yang ingin dibeli
                      </p>
                      <Button
                        color="success"
                        className="text-white"
                        onPress={() => router.push("/")}
                      >
                        Belanja Sekarang
                      </Button>
                    </div>
                  </Skeleton>
                )}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right */}
        <div className="col-span-1">
          <Card radius="sm" shadow="sm">
            <CardHeader>
              <h2 className="text-xl font-semibold">Ringkasan Pesanan</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({dataCarts?.data?._count.items} item)</span>
                  <span>
                    {isLoadingCarts ? (
                      <Skeleton className="w-32 h-6 rounded-md" />
                    ) : (
                      rupiahFormat(subTotal)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ongkos Kirim</span>
                  <span>
                    {isLoadingCarts ? (
                      <Skeleton className="w-32 h-6 rounded-md" />
                    ) : (
                      rupiahFormat(5000)
                    )}
                  </span>
                </div>
                <Divider />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-success">
                    {isLoadingCarts ? (
                      <Skeleton className="w-32 h-6 rounded-md" />
                    ) : (
                      rupiahFormat(total)
                    )}
                  </span>
                </div>
              </div>

              <div className="bg-warning/10 p-3 rounded-lg my-4">
                <p className="text-sm text-warning font-medium">
                  ✨ Hemat Rp 5.000
                </p>
                <p className="text-xs text-foreground-500">
                  Pembelian langsung dari petani
                </p>
              </div>

              <Button
                type="submit"
                color="success"
                className="text-white"
                startContent={<FaCheck />}
                disabled={isPendingCreateOrder}
                isLoading={isPendingCreateOrder}
              >
                Buat Pesan
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
