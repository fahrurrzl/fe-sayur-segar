"use client";

import DataTable from "@/components/data-table";
import useSeller from "@/hooks/useSeller";
import { Avatar } from "@heroui/avatar";
import { Button, Chip, Tooltip, useDisclosure } from "@heroui/react";
import { Key, useCallback, useState } from "react";
import { FiEye, FiTrash } from "react-icons/fi";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import { FaTimes } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { formatDate } from "@/utils/dateFormat";
import ModalSeller from "./modal-seller";
import ModalDelete from "./modal-delete";

const Seller = () => {
  const [selectedSeller, setSelectedSeller] = useState<string | null>(null);
  const router = useRouter();
  const { dataAllSeller, isLoadingAllSeller, setSellerId, dataSellerById } =
    useSeller();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    onOpenChange: onOpenDelete,
    isOpen: isOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const renderCell = useCallback(
    (seller: Record<string, any>, columnKey: Key) => {
      const cellValue = seller[columnKey as string];

      switch (columnKey) {
        case "storeName":
          return cellValue;
        case "user":
          return (
            <div className="flex items-center gap-2">
              <div>
                <Avatar
                  className="w-10 h-10 mx-auto border-4 border-emerald-200"
                  name={`${seller?.user?.name}`}
                  src={`https://ui-avatars.com/api/?name=${seller?.user?.name}&background=random`}
                  showFallback
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-medium">{seller?.user?.name}</span>
                <span className="text-xs text-gray-500">
                  {seller.user?.email}
                </span>
              </div>
            </div>
          );
        case "storeLocation":
          return cellValue;
        case "verified":
          return (
            <Chip
              size="sm"
              color={cellValue ? "primary" : "default"}
              variant="bordered"
              className="flex items-center gap-1"
              startContent={
                cellValue ? (
                  <MdVerified className="h-4 w-4" />
                ) : (
                  <FaTimes className="h-4 w-4" />
                )
              }
            >
              {cellValue ? "Verified" : "Not Verified"}
            </Chip>
          );
        case "paymentInfo":
          return (
            <div>
              <p className="font-medium">{seller?.bankName}</p>
              <p className="text-sm text-foreground-500">
                {seller?.accountNumber}
              </p>
            </div>
          );
        case "createdAt":
          return formatDate(cellValue);
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip color="primary" content="Detail Penjual">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="primary"
                  className="cursor-pointer active:opacity-50"
                  onPress={() => {
                    setSellerId(seller?.id);
                    onOpen();
                  }}
                >
                  <FiEye />
                </Button>
              </Tooltip>
              <Tooltip color="danger" content="Hapus Penjual">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="danger"
                  className="cursor-pointer active:opacity-50"
                  onPress={() => {
                    onOpenDelete();
                    setSelectedSeller(seller?.id);
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

  const handleOnClose = () => {
    setSellerId(null);
    onClose();
  };

  return (
    <>
      <ModalSeller
        isOpen={isOpen}
        onClose={handleOnClose}
        seller={dataSellerById?.data}
      />
      <ModalDelete
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        onOpenChange={onOpenDelete}
        selectedSeller={selectedSeller as string}
        setSelectedSeller={setSelectedSeller}
      />

      <DataTable
        title="Penjual"
        description="Kelola penjual"
        columns={columns}
        data={dataAllSeller?.data || []}
        renderCell={renderCell as any}
        onPressAddButton={() => router.push("/admin/dashboard/seller/create")}
        emptyContent="Belum ada penjual yang ditambahkan"
        isLoading={isLoadingAllSeller}
      />
    </>
  );
};

export default Seller;
