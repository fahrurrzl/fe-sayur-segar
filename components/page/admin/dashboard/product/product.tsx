"use client";

import DataTable from "@/components/data-table";
import cn from "@/utils/cn";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { Button, Tooltip, useDisclosure } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Key, useCallback, useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { columns } from "./columns";
import useProduct from "@/hooks/useProduct";
import ModalDelete from "./modal-delete";
import useChangeUrl from "@/hooks/useChangeUrl";

const AdminProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { dataProducts, isLoadingProducts } = useProduct();
  const { setUrl } = useChangeUrl();

  useEffect(() => {
    setUrl();
  }, []);

  const renderCell = useCallback(
    (product: Record<string, unknown>, columnKey: Key) => {
      const cellValue = product[columnKey as string];

      switch (columnKey) {
        case "product":
          return (
            <div className="flex items-center gap-2">
              <Image
                src={product?.imageUrl as string}
                alt="product"
                width={50}
                height={50}
                className="object-contain aspect-square rounded-md"
              />
              <div className="w-80">
                <p className="font-medium">{product?.name as string}</p>
                <p className="text-xs text-gray-500 truncate">
                  {product?.description as string}
                </p>
              </div>
            </div>
          );
        case "category":
          return (
            <p className="text-gray-500">
              {(product?.category as { name: string })?.name}
            </p>
          );
        case "price":
          return (
            <p className="font-medium">{rupiahFormat(cellValue as number)}</p>
          );
        case "stock":
          return (
            <p
              className={cn(
                "font-medium",
                Number(cellValue) > 20 ? "text-success" : "text-danger"
              )}
            >
              {Number(cellValue)}
            </p>
          );
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
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
        description="Kelola semua produk yang ada"
        columns={columns}
        data={dataProducts?.data?.products || []}
        renderCell={renderCell as any}
        onPressAddButton={() => router.push("/dashboard/product/create")}
        emptyContent="Belum ada produk yang ditambahkan"
        isLoading={isLoadingProducts}
        currentPage={dataProducts?.data?.currentPage}
        totalPage={dataProducts?.data?.totalPages}
      />
    </>
  );
};

export default AdminProduct;
