"use client";

import { Key } from "react";
import { Tooltip } from "@heroui/tooltip";
import { FiEdit, FiTrash } from "react-icons/fi";
import Image from "next/image";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { Button } from "@heroui/button";

export const renderCell = (
  product: Record<string, unknown>,
  columnKey: Key
) => {
  const cellValue = product[columnKey as string];

  switch (columnKey) {
    case "imageUrl":
      return (
        <Image
          src={cellValue as string}
          alt="product"
          width={80}
          height={80}
          className="object-contain aspect-square rounded-md"
        />
      );
    case "price":
      return rupiahFormat(cellValue as number);
    case "actions":
      return (
        <div className="relative flex items-center justify-center gap-2">
          <Tooltip color="primary" content="Ubah produk">
            <Button
              isIconOnly
              variant="light"
              color="primary"
              className="text-lg cursor-pointer active:opacity-50"
            >
              <FiEdit />
            </Button>
          </Tooltip>
          <Tooltip color="danger" content="Hapus produk">
            <Button
              isIconOnly
              variant="light"
              color="danger"
              className="text-lg cursor-pointer active:opacity-50"
            >
              <FiTrash />
            </Button>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
