"use client";

import DataTable from "@/components/data-table";
import useOrder from "@/hooks/useOrder";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { Badge, Button, Chip, Tooltip } from "@heroui/react";
import { Key, useCallback } from "react";
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

const OrderUser = () => {
  const { dataOrderUser, isLoadingDataOrderUser } = useOrder();
  console.log(dataOrderUser);

  const renderCell = useCallback(
    (product: Record<string, unknown>, columnKey: Key) => {
      const cellValue = product[columnKey as string];

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
            <Button isIconOnly size="sm" color="primary" variant="light">
              <FiEye />
            </Button>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <>
      <DataTable
        columns={columns}
        title="Order Saya"
        description="Kelola order Anda"
        renderCell={renderCell as any}
        data={dataOrderUser?.data || []}
        isLoading={isLoadingDataOrderUser}
        emptyContent="Belum ada order yang dibuat"
      />
    </>
  );
};

export default OrderUser;
