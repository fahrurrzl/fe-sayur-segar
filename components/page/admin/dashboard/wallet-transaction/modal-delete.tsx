import useWalletTransaction from "@/hooks/useWalletTransaction";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import React, { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  selectedWalletTransaction: string;
  setSelectedWalletTransaction: (id: string) => void;
}

const ModalDelete = ({
  isOpen,
  onClose,
  onOpenChange,
  selectedWalletTransaction,
  setSelectedWalletTransaction,
}: PropTypes) => {
  const {
    mutateDeleteWalletTransaction,
    isPendingDeleteWalletTransaction,
    isSuccessDeleteWalletTransaction,
  } = useWalletTransaction();

  useEffect(() => {
    if (isSuccessDeleteWalletTransaction) {
      onClose();
      setSelectedWalletTransaction("");
    }
  }, [isSuccessDeleteWalletTransaction]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Hapus Transaksi
            </ModalHeader>
            <ModalBody>
              <p>Apakah Anda yakin ingin menghapus transaksi ini?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button
                color="success"
                className="text-white"
                onPress={() =>
                  mutateDeleteWalletTransaction(selectedWalletTransaction)
                }
                isLoading={isPendingDeleteWalletTransaction}
                disabled={isPendingDeleteWalletTransaction}
              >
                Hapus
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDelete;
