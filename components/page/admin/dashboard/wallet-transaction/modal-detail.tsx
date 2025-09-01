"use client";

import { IWalletTransaction } from "@/types/wallet-transaction";
import { formatDate } from "@/utils/dateFormat";
import { rupiahFormat } from "@/utils/rupiahFormat";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { BsBank, BsSend } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { LuCircleCheck } from "react-icons/lu";
import { useEffect } from "react";
import useTransfer from "@/hooks/useTransfer";
import ButtonWhatsapp from "@/components/button-whatsapp";

const ModalDetail = ({
  isOpen,
  onClose,
  walletTransaction,
}: {
  isOpen: boolean;
  onClose: () => void;
  walletTransaction: IWalletTransaction | null;
}) => {
  const { isSuccessTransfer, handelTransfer, isPendingTransfer } =
    useTransfer();

  useEffect(() => {
    if (isSuccessTransfer) {
      onClose();
    }
  }, [isSuccessTransfer, onClose]);

  const InfoItem = ({
    label,
    value,
  }: {
    label: string;
    value?: React.ReactNode;
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 text-sm">
      <span className="font-medium text-gray-600 dark:text-gray-400">
        {label}
      </span>
      <span className="md:col-span-2 text-gray-800 dark:text-gray-200">
        {value || "-"}
      </span>
    </div>
  );

  const SectionCard = ({
    icon,
    title,
    children,
  }: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
  }) => (
    <Card
      shadow="sm"
      className="border border-gray-200 dark:border-gray-700 rounded-xl"
    >
      <CardBody className="p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-700 dark:text-emerald-200">
            {icon}
          </div>
          <h2 className="text-base font-semibold">{title}</h2>
        </div>
        <Divider />
        <div className="space-y-3">{children}</div>
      </CardBody>
    </Card>
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        size="2xl"
        onClose={onClose}
        scrollBehavior="outside"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                <p className="text-lg font-semibold">Detail Penarikan</p>
              </ModalHeader>

              <ModalBody className="space-y-2">
                {/* Informasi Penjual */}
                <SectionCard icon={<FiUser />} title="Informasi Penjual">
                  <InfoItem
                    label="Nama Pemilik"
                    value={walletTransaction?.wallet?.seller?.user?.name}
                  />
                  <InfoItem
                    label="Nama Lapak"
                    value={walletTransaction?.wallet?.seller?.storeName}
                  />
                  <InfoItem
                    label="No. Telp"
                    value={walletTransaction?.wallet?.seller?.user?.phone}
                  />
                </SectionCard>

                {/* Detail Penarikan */}
                <SectionCard icon={<FaCreditCard />} title="Detail Penarikan">
                  <InfoItem
                    label="Jumlah"
                    value={rupiahFormat(walletTransaction?.amount || 0)}
                  />
                  <InfoItem
                    label="Metode"
                    value={walletTransaction?.paymentMethod
                      .split("_")
                      .join(" ")}
                  />
                  <InfoItem
                    label="Status"
                    value={
                      <Chip
                        size="sm"
                        color={
                          walletTransaction?.status === "success"
                            ? "success"
                            : "warning"
                        }
                        className="text-white"
                      >
                        {walletTransaction?.status}
                      </Chip>
                    }
                  />
                  <InfoItem
                    label="Tanggal Pengajuan"
                    value={formatDate(walletTransaction?.createdAt || "")}
                  />
                </SectionCard>

                {/* Detail Pembayaran */}
                <SectionCard icon={<BsBank />} title="Detail Pembayaran">
                  <InfoItem
                    label="Bank"
                    value={
                      walletTransaction?.wallet?.seller?.bankName.toUpperCase() ||
                      "-"
                    }
                  />
                  <InfoItem
                    label="No. Rekening"
                    value={
                      walletTransaction?.wallet?.seller?.accountNumber || "-"
                    }
                  />
                  <InfoItem
                    label="Nama Pemilik"
                    value={
                      walletTransaction?.wallet?.seller?.accountName.toUpperCase() ||
                      "-"
                    }
                  />
                </SectionCard>

                {/* Action Button */}
                <SectionCard icon={<BsSend />} title="Aksi">
                  <div className="flex flex-wrap items-center gap-2">
                    {walletTransaction?.status === "success" ? (
                      <Chip
                        size="sm"
                        color="primary"
                        variant="bordered"
                        className="flex items-center gap-1"
                        startContent={<LuCircleCheck className="h-4 w-4" />}
                      >
                        Success
                      </Chip>
                    ) : (
                      <div className="flex w-full gap-2">
                        <Button
                          variant="shadow"
                          size="sm"
                          color="primary"
                          startContent={isPendingTransfer ? null : <BsSend />}
                          isLoading={isPendingTransfer}
                          disabled={isPendingTransfer}
                          onPress={() => {
                            handelTransfer({
                              amount: walletTransaction?.amount as number,
                              accountNumber: walletTransaction?.wallet?.seller
                                ?.accountNumber as string,
                              accountHolderName: walletTransaction?.wallet
                                ?.seller?.accountName as string,
                              channelCode: `ID_${walletTransaction?.wallet?.seller?.bankName.toUpperCase()}`,
                              referenceId: walletTransaction?.id as string,
                            });
                          }}
                        >
                          Transfer
                        </Button>

                        <ButtonWhatsapp
                          variant="shadow"
                          size="sm"
                          phone={
                            walletTransaction?.wallet?.seller?.user
                              ?.phone as string
                          }
                          message={`Halo ${walletTransaction?.wallet?.seller?.user?.name}, Mohon maaf, saat ini kami belum bisa transfer ke rekening ${walletTransaction?.wallet?.seller?.bankName.toUpperCase()} - ${walletTransaction?.wallet?.seller?.accountNumber} atas nama ${walletTransaction?.wallet?.seller?.accountName.toUpperCase()}. Pastikan rekening yang anda masukkan benar.`}
                        />
                      </div>
                    )}
                  </div>
                </SectionCard>
              </ModalBody>

              <ModalFooter className="border-t border-gray-200 dark:border-gray-700">
                <Button color="danger" variant="light" onPress={onClose}>
                  Tutup
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDetail;
