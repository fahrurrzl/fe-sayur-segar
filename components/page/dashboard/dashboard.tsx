"use client";

import useOrder from "@/hooks/useOrder";
import useProfile from "@/hooks/useProfile";
import useSeller from "@/hooks/useSeller";
import { TProductResponse } from "@/types";
import { rupiahFormat } from "@/utils/rupiahFormat";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Skeleton,
  Tooltip,
} from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  FiAlertCircle,
  FiBox,
  FiCheck,
  FiClock,
  FiCreditCard,
  FiEye,
  FiShoppingCart,
  FiTruck,
  FiX,
} from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";

const Dashboard = () => {
  const { dataUser, isLoadingUser } = useProfile();
  const { dataSeller } = useSeller();
  const { dataOrderSeller } = useOrder();
  console.log(dataSeller);

  const router = useRouter();
  const isSellerVerified =
    dataUser?.Seller[0]?.verified && dataUser?.Seller?.length;

  useEffect(() => {
    if (!dataUser?.Seller?.length) {
      router.push("/profile");
    }
  }, [dataUser]);

  return (
    <div className="p-4">
      {!isSellerVerified ? (
        <Alert
          title="Informasi"
          description="Lapak kamu belum terfertifikasi, silahkan tunggu!"
          color="warning"
        />
      ) : (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex flex-col mb-8">
            <h2 className="text-xl font-bold">Dashboard Overview</h2>
            <p className="text-xs text-gray-500">
              Ringkasan performa toko Anda
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Wallet */}
            <Card>
              <CardHeader className="flex items-center justify-center lg:justify-start">
                <p>Saldo</p>
              </CardHeader>
              <CardBody>
                <div className="flex items-center justify-center lg:justify-between flex-col-reverse lg:flex-row gap-2 lg:gap-0">
                  <p className="text-2xl font-bold text-gray-900 mt-1 text-center lg:text-start">
                    {rupiahFormat(dataUser?.Seller[0]?.wallet?.balance)}
                  </p>
                  <div
                    className={`w-12 h-12 bg-success rounded-lg flex items-center justify-center`}
                  >
                    <MdAttachMoney className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Products */}
            <Card>
              <CardHeader className="flex items-center justify-center lg:justify-start">
                <p>Total Produk</p>
              </CardHeader>
              <CardBody>
                <div className="flex items-center justify-center lg:justify-between flex-col-reverse lg:flex-row gap-2 lg:gap-0">
                  <p className="text-2xl font-bold text-gray-900 mt-1 text-center lg:text-start">
                    {dataSeller?.products?.length}
                  </p>
                  <div
                    className={`w-12 h-12 bg-primary rounded-lg flex items-center justify-center`}
                  >
                    <FiBox className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Sellers */}
            <Card>
              <CardHeader className="flex items-center justify-center lg:justify-start">
                <p>Total Pesanan</p>
              </CardHeader>
              <CardBody>
                <div className="flex items-center justify-center lg:justify-between flex-col-reverse lg:flex-row gap-2 lg:gap-0">
                  <p className="text-2xl font-bold text-gray-900 mt-1 text-center lg:text-start">
                    {dataOrderSeller?.data?.length}
                  </p>
                  <div
                    className={`w-12 h-12 bg-success rounded-lg flex items-center justify-center`}
                  >
                    <FiShoppingCart className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Allert */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Order */}
            <Card>
              <CardHeader className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Pesanan Terbaru
                </h3>
                <Button
                  variant="light"
                  color="success"
                  onPress={() => router.push("/dashboard/order")}
                >
                  Lihat Semua
                </Button>
              </CardHeader>
              <CardBody>
                {dataOrderSeller?.data
                  ?.filter((order: any) => order?.status !== "SUCCESS")
                  ?.map((order: any) => (
                    <div className="space-y-3" key={order?.id}>
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="font-medium text-gray-900">
                              {order?.user?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              #{order?.orderId}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {rupiahFormat(order?.totalPrice)}
                          </p>
                          <Chip
                            startContent={
                              order?.status === "PENDING" ? (
                                <FiClock />
                              ) : order?.status === "PAID" ? (
                                <FiCreditCard />
                              ) : order?.status === "FAILED" ? (
                                <FiX />
                              ) : order?.status === "PROCESSING" ? (
                                <FiBox />
                              ) : order?.status === "DELIVERED" ? (
                                <FiTruck />
                              ) : order?.status === "COMPLETED" ? (
                                <FiCheck />
                              ) : null
                            }
                            variant="bordered"
                            size="sm"
                            color={
                              order?.status === "PENDING"
                                ? "warning"
                                : order?.status === "PAID"
                                  ? "success"
                                  : order?.status === "FAILED"
                                    ? "danger"
                                    : order?.status == "PROCESSING"
                                      ? "secondary"
                                      : order?.status == "DELIVERED"
                                        ? "primary"
                                        : order?.status === "COMPLETED"
                                          ? "default"
                                          : "danger"
                            }
                          >
                            {order?.status === "PENDING" && "Pending"}
                            {order?.status === "PAID" && "Dibayar"}
                            {order?.status === "FAILED" && "Gagal"}
                            {order?.status === "PROCESSING" && "Diproses"}
                            {order?.status === "DELIVERED" && "Dikirim"}
                            {order?.status === "COMPLETED" && "Diterima"}
                          </Chip>
                        </div>
                      </div>
                    </div>
                  ))}

                {dataOrderSeller?.data.length === 0 && (
                  <p className="text-sm text-gray-500">Tidak ada pesanan</p>
                )}
              </CardBody>
            </Card>

            {/* Stock */}
            <Card>
              <CardHeader className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Peringatan Stok
                </h3>
                <FiAlertCircle className="w-5 h-5 text-orange-500" />
              </CardHeader>
              <CardBody>
                {dataSeller?.products
                  ?.filter((product: TProductResponse) => product?.stock < 20)
                  ?.map((product: TProductResponse) => (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={product?.imageUrl as string}
                            alt="product"
                            width={50}
                            height={50}
                            className="object-contain aspect-square rounded-md"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {product?.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {product?.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-danger font-medium">
                            {product?.stock}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                {dataSeller?.products?.filter(
                  (product: TProductResponse) => product?.stock < 20
                ).length === 0 && (
                  <p className="text-sm text-gray-500">
                    Semua produk memiliki stok yang cukup
                  </p>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
