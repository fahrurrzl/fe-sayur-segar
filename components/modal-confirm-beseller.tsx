import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import Link from "next/link";
import React from "react";
import { FaStore } from "react-icons/fa";

const ModalConfirmBeseller = ({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <FaStore className="w-5 h-5 text-success" /> Konfirmasi Menjadi
                Penjual
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Apakah Anda yakin ingin menjadi penjual di platform kami?
                </p>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-800 mb-2">
                    Keuntungan menjadi penjual:
                  </h4>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• Dapat menjual produk sayuran segar</li>
                    <li>• Akses ke dashboard penjual</li>
                    <li>• Kelola pesanan dan inventori</li>
                    <li>• Dapatkan penghasilan tambahan</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <p className="text-sm text-amber-700">
                    <strong>Catatan:</strong> Setelah menjadi penjual, Anda
                    perlu melengkapi informasi toko dan data akan diverifikasi
                    dalam 1-3 hari kerja.
                  </p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Tidak
              </Button>
              <Button
                color="success"
                className="text-white"
                onPress={onClose}
                as={Link}
                href="/seller"
              >
                Ya, Menjadi Penjual
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirmBeseller;
