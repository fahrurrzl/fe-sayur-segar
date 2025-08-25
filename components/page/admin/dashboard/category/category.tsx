"use client";

import DataTable from "@/components/data-table";
import useCategory from "@/hooks/useCateogry";
import React, { Key, useCallback, useState } from "react";
import { columns } from "./columns";
import Image from "next/image";
import { Button, Tooltip } from "@heroui/react";
import { FiEdit, FiTrash } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@heroui/react";
import ModalDelete from "./modal-delete";
import { formatDate } from "@/utils/dateFormat";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter();
  const { dataCategories, isLoadingCategories } = useCategory();

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as string];

      switch (columnKey) {
        case "category":
          return (
            <div className="flex items-center gap-2">
              <Image
                src={category?.imageUrl as string}
                alt={category?.name as string}
                width={50}
                height={50}
                className="object-contain aspect-square rounded-md"
              />
              <p className="font-medium">{category?.name as string}</p>
            </div>
          );
        case "createdAt":
          return (
            <div>
              <p className="font-medium">{formatDate(cellValue as string)}</p>
            </div>
          );
        case "createdBy":
          return (
            <div className="text-center">
              <p className="font-medium">
                {(category?.user as { name: string })?.name}
              </p>
              <p className="text-sm text-foreground-500">
                {(category?.user as { role: string }).role}
              </p>
            </div>
          );
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
                  href={`/admin/dashboard/category/edit/${category.id}`}
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
                    setSelectedCategory(category.id as string);
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
    []
  );

  return (
    <>
      <ModalDelete
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <DataTable
        title="Kategori"
        description="Kelola kategori"
        columns={columns}
        data={dataCategories || []}
        renderCell={renderCell as any}
        addButton
        addButtonText="Tambah Kategori"
        onPressAddButton={() => router.push("/admin/dashboard/category/create")}
        emptyContent="Belum ada kategori yang ditambahkan"
        isLoading={isLoadingCategories}
      />
    </>
  );
};

export default Category;
