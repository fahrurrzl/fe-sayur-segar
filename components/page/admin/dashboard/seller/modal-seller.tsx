"use client";

import useSeller from "@/hooks/useSeller";
import { TSeller } from "@/types";
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
import { FaCreditCard, FaStore } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { MdVerified, MdWhatsapp } from "react-icons/md";

const ModalSeller = ({
  isOpen,
  onClose,
  seller,
}: {
  isOpen: boolean;
  onClose: () => void;
  seller: TSeller;
}) => {
  const { mutateUpdateVerified, isPendingUpdateVerified } = useSeller();

  const InfoItem = ({ label, value }: { label: string; value?: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-1 text-sm">
      <span className="font-medium text-gray-600">{label}</span>
      <span className="md:col-span-2 text-gray-800">{value || "-"}</span>
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
    <Card shadow="sm" className="border border-gray-200 rounded-xl">
      <CardBody className="p-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-100 text-emerald-600">
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
            <ModalHeader className="flex items-center justify-between border-b border-gray-200">
              <p className="text-lg font-semibold">Detail Penjual</p>
            </ModalHeader>

            <ModalBody className="space-y-2">
              {/* Informasi Penjual */}
              <SectionCard icon={<FiUser />} title="Informasi Penjual">
                <InfoItem label="Nama" value={seller?.user?.name} />
                <InfoItem label="Email" value={seller?.user?.email} />
                <InfoItem label="No. Telp" value={seller?.user?.phone} />
              </SectionCard>

              {/* Informasi Lapak */}
              <SectionCard icon={<FaStore />} title="Informasi Lapak">
                <InfoItem label="Nama Lapak" value={seller?.storeName} />
                <InfoItem label="Lokasi" value={seller?.storeLocation} />
                <InfoItem label="Deskripsi" value={seller?.description} />
              </SectionCard>

              {/* Informasi Bank */}
              <SectionCard icon={<FaCreditCard />} title="Informasi Bank">
                <InfoItem label="Nama Bank" value={seller?.bankName} />
                <InfoItem label="Nama Pemilik" value={seller?.accountName} />
                <InfoItem
                  label="Nomor Rekening"
                  value={seller?.accountNumber}
                />
              </SectionCard>

              {/* Update Status */}
              <SectionCard icon={<MdVerified />} title="Update Status">
                <div className="flex flex-wrap items-center gap-2">
                  {seller?.verified ? (
                    <Chip
                      size="sm"
                      color="primary"
                      variant="bordered"
                      className="flex items-center gap-1"
                      startContent={<MdVerified className="h-4 w-4" />}
                    >
                      Verified
                    </Chip>
                  ) : (
                    <div className="flex w-full gap-2">
                      <Button
                        variant="shadow"
                        size="sm"
                        color="primary"
                        startContent={
                          !isPendingUpdateVerified ? <MdVerified /> : null
                        }
                        onPress={() =>
                          mutateUpdateVerified(seller?.id as string)
                        }
                        disabled={isPendingUpdateVerified}
                        isLoading={isPendingUpdateVerified}
                      >
                        Verifikasi
                      </Button>

                      <Button
                        variant="shadow"
                        size="sm"
                        color="success"
                        className="text-white"
                        startContent={<MdWhatsapp />}
                      >
                        WhatsApp
                      </Button>
                    </div>
                  )}
                </div>
              </SectionCard>
            </ModalBody>

            <ModalFooter className="border-t border-gray-200">
              <Button color="danger" variant="light" onPress={onClose}>
                Tutup
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalSeller;
