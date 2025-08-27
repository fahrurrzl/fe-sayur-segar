"use client";

import useProfile from "@/hooks/useProfile";
import useWalletTransaction from "@/hooks/useWalletTransaction";
import { IWalletTransaction } from "@/types/wallet-transaction";
import { formatDate } from "@/utils/dateFormat";
import { rupiahFormat } from "@/utils/rupiahFormat";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Skeleton,
  useDisclosure,
} from "@heroui/react";
import {
  BsArrowDownLeft,
  BsArrowUpRight,
  BsCheckCircle,
  BsClock,
} from "react-icons/bs";
import { LuWallet } from "react-icons/lu";
import ModalTransactionWallet from "./modal-transaction-wallet";

const Wallet = () => {
  const { dataUser, isLoadingUser } = useProfile();
  const seller = dataUser?.Seller[0];
  const { dataWalletTransactions, isLoadingWalletTransactions } =
    useWalletTransaction();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Kelola Wallet</h1>
        <p className="text-sm text-foreground-500">
          Pantau saldo dan kelola penarikan dana Anda
        </p>
      </div>

      {/* Wallet Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          shadow="sm"
          className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white"
        >
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">
                  Saldo Tersedia
                </p>
                <Skeleton
                  isLoaded={!isLoadingUser}
                  className="rounded-md bg-success"
                >
                  <p className="text-2xl font-bold">
                    {rupiahFormat(seller?.wallet?.balance)}
                  </p>
                </Skeleton>
              </div>
              <div className="w-12 h-12 bg-green-400 rounded-lg flex items-center justify-center">
                <LuWallet className="w-6 h-6" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Withdraw Button */}
      <div className="flex justify-between items-center my-8 px-1">
        <h3 className="text-lg font-semibold text-gray-900">
          Riwayat Transaksi
        </h3>
        {seller?.wallet?.balance > 0 ? (
          <Button
            onPress={() => onOpen()}
            color="success"
            className="text-white"
            startContent={<BsArrowUpRight className="w-4 h-4" />}
          >
            <span>Tarik Dana</span>
          </Button>
        ) : null}
      </div>

      {/* Modal Transaction Wallet */}
      <ModalTransactionWallet isOpen={isOpen} onClose={onClose} />

      {/* Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-1">
        {/* Wallet Transactions */}
        <Card>
          <CardHeader className="border-b border-b-foreground-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Transaksi Wallet
            </h3>
          </CardHeader>
          <CardBody>
            <div>
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {isLoadingWalletTransactions && (
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-8 h-8 rounded-full" />
                      <div className="space-y-1">
                        <Skeleton className="w-64 rounded-md h-4" />
                        <Skeleton className="w-32 rounded-md h-3" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Skeleton className="w-24 rounded-md h-4" />
                      <Skeleton className="w-24 rounded-md h-3" />
                    </div>
                  </div>
                )}
                {dataWalletTransactions?.data.map(
                  (transaction: IWalletTransaction) => (
                    <div
                      key={transaction?.id}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex items-center space-x-3">
                        {transaction?.type === "income" ? (
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center bg-success/20`}
                          >
                            <BsArrowDownLeft className="w-4 h-4 text-success" />
                          </div>
                        ) : (
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center bg-danger/20`}
                          >
                            <BsArrowUpRight className="w-4 h-4 text-danger" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {transaction?.type === "income"
                              ? "Pembayaran Order #"
                              : "Penarikan"}
                            {transaction?.orderId}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(transaction?.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-medium ${transaction.type === "income" ? "text-success" : "text-danger"}`}
                        >
                          {transaction.type === "income" ? "+" : "-"}
                          {rupiahFormat(transaction?.amount)}
                        </p>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500 capitalize flex items-center gap-1">
                            {transaction.status === "success" ? (
                              <BsCheckCircle
                                className="text-success"
                                size={14}
                              />
                            ) : (
                              <BsClock className="text-danger" size={14} />
                            )}
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )}

                {dataWalletTransactions?.data?.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    Belum ada transaksi
                  </p>
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900">
              Riwayat Penarikan
            </h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {dataWalletTransactions?.data
                .filter(
                  (transaction: IWalletTransaction) =>
                    transaction.type === "outcome"
                )
                .map((transaction: IWalletTransaction) => (
                  <div
                    key={transaction?.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {rupiahFormat(transaction?.amount)}
                        </span>
                      </div>
                      <span
                        className={`bg-${transaction?.status === "success" ? "success" : "danger"}-100 text-xs px-2 py-1 rounded-full font-medium text-${transaction?.status === "success" ? "success" : "danger"}-500`}
                      >
                        {transaction?.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 space-y-1">
                      <p>Tanggal: {formatDate(transaction.createdAt)}</p>

                      <p className="uppercase">
                        {transaction?.wallet?.seller?.bankName}{" "}
                        {transaction?.wallet?.seller?.accountName}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Wallet;
