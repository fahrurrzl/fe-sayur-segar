"use client";

import DataTable from "@/components/data-table";
import useOrder from "@/hooks/useOrder";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { Badge, Button, Chip, Tooltip } from "@heroui/react";
import { Key, useCallback } from "react";
import { columns } from "./columns";
import { FiEye } from "react-icons/fi";

const OrderUser = () => {
  const { orderUser, isLoadingOrderUser } = useOrder();

  const renderCell = useCallback(
    (product: Record<string, unknown>, columnKey: Key) => {
      const cellValue = product[columnKey as string];

      switch (columnKey) {
        case "orderId":
          return <p className="font-medium">{cellValue as string}</p>;
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
                  : cellValue === "PAID" || cellValue === "SHIPPED"
                    ? "success"
                    : cellValue === "COMPLETED"
                      ? "default"
                      : "danger"
              }
            >
              {`${cellValue}`.toLowerCase()}
            </Chip>
          );
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
        data={orderUser?.data || []}
        isLoading={isLoadingOrderUser}
        emptyContent="Belum ada order yang dibuat"
      />
    </>
  );
};

export default OrderUser;
