"use client";

import DataTable from "@/components/data-table";
import { columns } from "./columns";
import useOrder from "@/hooks/useOrder";
import { Key, useCallback, useEffect } from "react";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { Button, Chip, useDisclosure } from "@heroui/react";
import {
  FiBox,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiEye,
  FiTruck,
  FiX,
} from "react-icons/fi";
import { formatDate } from "@/utils/dateFormat";
import ModalOrderDetail from "../modal-order-detail";
import useChangeUrl from "@/hooks/useChangeUrl";

const OrderSeller = () => {
  const {
    dataOrderSeller,
    isLoadingDataOrderSeller,
    dataOrderById,
    isLoadingDataOrderById,
    mutateIsCompleted,
    isPendingIsCompleted,
    setOrderId,
  } = useOrder();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    setUrl();
  }, []);

  const renderCell = useCallback(
    (order: Record<string, unknown>, columnKey: Key) => {
      const cellValue = order[columnKey as string];

      switch (columnKey) {
        case "orderId":
          return <p className="font-medium">{cellValue as string}</p>;
        case "user":
          return (
            <div>
              <p className="font-semibold">
                {(cellValue as { name: string })?.name}
              </p>
              <p className="text-foreground-500 text-sm">
                {(cellValue as { email: string })?.email}
              </p>
              <p className="text-foreground-500 text-sm">
                {(cellValue as { phone: string })?.phone}
              </p>
            </div>
          );
        case "totalPrice":
          return rupiahFormat(cellValue as number);
        case "status":
          return (
            <Chip
              startContent={
                cellValue === "PENDING" ? (
                  <FiClock />
                ) : cellValue === "PAID" ? (
                  <FiCreditCard />
                ) : cellValue === "FAILED" ? (
                  <FiX />
                ) : cellValue === "PROCESSING" ? (
                  <FiBox />
                ) : cellValue === "DELIVERED" ? (
                  <FiTruck />
                ) : cellValue === "COMPLETED" ? (
                  <FiCheck />
                ) : null
              }
              variant="bordered"
              size="sm"
              color={
                cellValue === "PENDING"
                  ? "warning"
                  : cellValue === "PAID"
                    ? "success"
                    : cellValue === "FAILED"
                      ? "danger"
                      : cellValue == "PROCESSING"
                        ? "secondary"
                        : cellValue == "DELIVERED"
                          ? "primary"
                          : cellValue === "COMPLETED"
                            ? "default"
                            : "danger"
              }
            >
              {cellValue === "PENDING" && "Pending"}
              {cellValue === "PAID" && "Dibayar"}
              {cellValue === "FAILED" && "Gagal"}
              {cellValue === "PROCESSING" && "Diproses"}
              {cellValue === "DELIVERED" && "Dikirim"}
              {cellValue === "COMPLETED" && "Diterima"}
            </Chip>
          );
        case "createdAt":
          return formatDate(cellValue as string);
        case "actions":
          return (
            <div>
              <Button
                isIconOnly
                size="sm"
                color="primary"
                variant="light"
                onPress={() => {
                  onOpen();
                  setOrderId(order?.id as string);
                }}
              >
                <FiEye />
              </Button>
              {order?.status !== "PENDING" && order.status !== "COMPLETED" ? (
                <Button
                  isIconOnly
                  size="sm"
                  color="success"
                  variant="light"
                  isLoading={isPendingIsCompleted}
                  isDisabled={isPendingIsCompleted}
                  onPress={() => {
                    mutateIsCompleted(order?.id as string);
                  }}
                >
                  <FiCheckCircle />
                </Button>
              ) : null}
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const handleOnClose = () => {
    onClose();
    setOrderId("");
  };

  return (
    <>
      <ModalOrderDetail
        type="seller"
        isOpen={isOpen}
        onClose={handleOnClose}
        order={dataOrderById?.data || {}}
        isLoading={isLoadingDataOrderById}
      />
      <DataTable
        columns={columns}
        data={dataOrderSeller?.data?.orders || []}
        isLoading={isLoadingDataOrderSeller}
        title="Kelola Pesanan"
        description="Kelola pesanan lapak Anda"
        renderCell={renderCell as any}
        totalPage={dataOrderSeller?.data?.totalPage}
        currentPage={dataOrderSeller?.data?.currentPage}
        emptyContent="Tidak ada pesanan"
      />
    </>
  );
};

export default OrderSeller;
