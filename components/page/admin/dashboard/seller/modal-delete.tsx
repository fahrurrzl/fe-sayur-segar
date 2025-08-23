import useSeller from "@/hooks/useSeller";
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
  selectedSeller: string;
  setSelectedSeller: (id: string) => void;
}

const ModalDelete = ({
  isOpen,
  onClose,
  onOpenChange,
  selectedSeller,
  setSelectedSeller,
}: PropTypes) => {
  const {
    mutateAdminDeleteSeller,
    isPendingAdminDeleteSeller,
    isSuccessAdminDeleteSeller,
  } = useSeller();

  useEffect(() => {
    if (isSuccessAdminDeleteSeller) {
      onClose();
      setSelectedSeller("");
    }
  }, [isSuccessAdminDeleteSeller]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Hapus Penjual
            </ModalHeader>
            <ModalBody>
              <p>Apakah Anda yakin ingin menghapus penjual ini?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button
                color="success"
                className="text-white"
                onPress={() => mutateAdminDeleteSeller(selectedSeller)}
                isLoading={isPendingAdminDeleteSeller}
                disabled={isPendingAdminDeleteSeller}
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
