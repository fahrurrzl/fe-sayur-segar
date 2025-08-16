"use client";

import DataTable from "@/components/data-table";
import { columns } from "./columns";
import useSeller from "@/hooks/useSeller";
import { useRouter } from "next/navigation";
import { Key, useCallback, useState } from "react";
import Image from "next/image";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { Button, Tooltip, useDisclosure } from "@heroui/react";
import Link from "next/link";
import { FiEdit, FiTrash } from "react-icons/fi";
import ModalDelete from "./modal-delete";

const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { dataSeller, isLoadingSeller } = useSeller();

  const renderCell = useCallback(
    (product: Record<string, unknown>, columnKey: Key) => {
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
                  as={Link}
                  href={`/dashboard/product/edit/${product.id}`}
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
                  onPress={() => {
                    setSelectedProduct(product?.id as string);
                    onOpen();
                  }}
                >
                  <FiTrash />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [router]
  );

  return (
    <>
      <ModalDelete
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
      />
      <DataTable
        title="Produk"
        description="Kelola produk yang Anda miliki"
        columns={columns}
        data={dataSeller?.products || []}
        renderCell={renderCell as any}
        addButton
        addButtonText="Tambah Produk"
        onPressAddButton={() => router.push("/dashboard/product/create")}
        emptyContent="Belum ada produk yang ditambahkan"
        isLoading={isLoadingSeller}
      />
    </>
  );
};

export default Product;
