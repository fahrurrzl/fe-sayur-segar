"use client";

import DataTable from "@/components/data-table";
import useOrder from "@/hooks/useOrder";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { Button, Chip, useDisclosure } from "@heroui/react";
import { Key, useCallback, useEffect } from "react";
import { columns } from "./columns";
import {
  FiBox,
  FiCheck,
  FiClock,
  FiCreditCard,
  FiEye,
  FiTruck,
  FiX,
} from "react-icons/fi";
import { formatDate } from "@/utils/dateFormat";
import ModalOrderDetail from "../modal-order-detail";
import useChangeUrl from "@/hooks/useChangeUrl";

const OrderUser = () => {
  const {
    dataOrderUser,
    isLoadingDataOrderUser,
    setOrderId,
    dataOrderById,
    isLoadingDataOrderById,
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
        case "seller":
          return (
            <div>
              <p className="font-semibold">
                {(cellValue as { storeName: string })?.storeName}
              </p>
              <p className="text-foreground-500 text-sm">
                {(cellValue as { storeLocation: string })?.storeLocation}
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
        type="user"
        isOpen={isOpen}
        onClose={handleOnClose}
        order={dataOrderById?.data || {}}
        isLoading={isLoadingDataOrderById}
      />
      <DataTable
        columns={columns}
        title="Order Saya"
        description="Kelola order Anda"
        renderCell={renderCell as any}
        data={dataOrderUser?.data?.orders || []}
        isLoading={isLoadingDataOrderUser}
        emptyContent="Belum ada order yang dibuat"
        totalPage={dataOrderUser?.data?.totalPage}
        currentPage={dataOrderUser?.data?.currentPage}
      />
    </>
  );
};

export default OrderUser;
