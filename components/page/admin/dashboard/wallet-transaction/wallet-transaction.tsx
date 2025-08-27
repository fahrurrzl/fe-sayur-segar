"use client";

import DataTable from "@/components/data-table";
import { formatDate } from "@/utils/dateFormat";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { Button, Chip, Tooltip, useDisclosure } from "@heroui/react";
import { Key, useCallback, useState } from "react";
import { FiEye, FiTrash } from "react-icons/fi";
import { columns } from "./columns";
import useWalletTransaction from "@/hooks/useWalletTransaction";
import { BsBank, BsCheckCircle, BsClock } from "react-icons/bs";
import ModalDetail from "./modal-detail";
import ModalDelete from "./modal-delete";

const WalletTransaction = () => {
  const [selectedWalletTransaction, setSelectedWalletTransaction] =
    useState("");

  const {
    dataAllWalletTransactions,
    isLoadingGetAllTransactions,
    dataWalletTransactionById,
    setSelectedId,
  } = useWalletTransaction();

  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail,
  } = useDisclosure();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
    onOpenChange: onOpenChangeDelete,
  } = useDisclosure();

  const renderCell = useCallback(
    (walletTransaction: Record<string, any>, columnKey: Key) => {
      const cellValue = walletTransaction[columnKey as string];

      switch (columnKey) {
        case "seller":
          return (
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-start">
                <span className="font-medium">
                  {walletTransaction.wallet?.seller?.storeName}
                </span>
                <span className="text-sm text-gray-500 uppercase">
                  {walletTransaction.wallet?.seller?.bankName} |{" "}
                  {walletTransaction.wallet?.seller?.accountName}
                </span>
                <span className="text-sm text-gray-500">
                  {walletTransaction.wallet?.seller?.accountNumber}
                </span>
              </div>
            </div>
          );
        case "amount":
          return <p className="font-medium">{rupiahFormat(cellValue)}</p>;
        case "paymentMethod":
          return (
            <div className="flex items-center gap-2 text-primary">
              <BsBank />
              <span className="text-sm text-gray-500">
                {cellValue.split("_").join(" ")}
              </span>
            </div>
          );
        case "status":
          return (
            <Chip
              size="sm"
              color={cellValue === "pending" ? "warning" : "success"}
              variant="bordered"
              className="flex items-center gap-1"
              startContent={
                cellValue === "pending" ? <BsClock /> : <BsCheckCircle />
              }
            >
              {cellValue}
            </Chip>
          );
        case "createdAt":
          return <p>{formatDate(cellValue)}</p>;
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip color="primary" content="Ubah produk">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="primary"
                  className="cursor-pointer active:opacity-50"
                  onPress={() => {
                    onOpenDetail();
                    setSelectedId(walletTransaction.id);
                  }}
                >
                  <FiEye />
                </Button>
              </Tooltip>
              <Tooltip color="danger" content="Hapus produk">
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="danger"
                  className="cursor-pointer active:opacity-50"
                  onPress={() => {
                    onOpenDelete();
                    setSelectedWalletTransaction(walletTransaction?.id);
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
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        onOpenChange={onOpenChangeDelete}
        selectedWalletTransaction={selectedWalletTransaction}
        setSelectedWalletTransaction={setSelectedWalletTransaction}
      />

      <ModalDetail
        isOpen={isOpenDetail}
        onClose={onCloseDetail}
        walletTransaction={dataWalletTransactionById?.data}
      />
      <DataTable
        columns={columns}
        renderCell={renderCell}
        title="Transaksi Wallet"
        description="Kelola transaksi wallet"
        data={dataAllWalletTransactions?.data || []}
        isLoading={isLoadingGetAllTransactions}
      />
    </>
  );
};

export default WalletTransaction;
