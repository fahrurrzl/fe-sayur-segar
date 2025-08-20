"use client";

import DataTable from "@/components/data-table";
import { columns } from "./columns";
import useOrder from "@/hooks/useOrder";
import { Key, useCallback } from "react";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { Button, Chip } from "@heroui/react";
import { FiEye } from "react-icons/fi";
import { formatDate } from "@/utils/dateFormat";

const OrderSeller = () => {
  const { dataOrderSeller, isLoadingDataOrderSeller } = useOrder();

  const renderCell = useCallback(
    (product: Record<string, unknown>, columnKey: Key) => {
      const cellValue = product[columnKey as string];

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
              variant="bordered"
              size="sm"
              color={
                cellValue === "PENDING"
                  ? "warning"
                  : cellValue === "PAID"
                    ? "success"
                    : cellValue === "COMPLETED"
                      ? "default"
                      : cellValue === "SHIPPED"
                        ? "primary"
                        : "danger"
              }
            >
              {`${cellValue}`.toLowerCase()}
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
    <DataTable
      columns={columns}
      data={dataOrderSeller?.data || []}
      isLoading={isLoadingDataOrderSeller}
      title="Kelola Pesanan"
      description="Kelola pesanan lapak Anda"
      renderCell={renderCell as any}
    />
  );
};

export default OrderSeller;
