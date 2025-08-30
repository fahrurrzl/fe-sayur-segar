import useUnit from "@/hooks/useUnit";
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
  selectedUnit: string;
  setSelectedUnit: (id: string) => void;
}

const ModalDelete = ({
  isOpen,
  onClose,
  onOpenChange,
  selectedUnit,
  setSelectedUnit,
}: PropTypes) => {
  const { handleDeleteUnit, isPendingDeleteUnit, isSuccessDeleteUnit } =
    useUnit();

  useEffect(() => {
    if (isSuccessDeleteUnit) {
      onClose();
      setSelectedUnit("");
    }
  }, [isSuccessDeleteUnit]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Hapus Unit
            </ModalHeader>
            <ModalBody>
              <p>Apakah Anda yakin ingin menghapus unit ini?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button
                color="success"
                className="text-white"
                onPress={() => handleDeleteUnit(selectedUnit)}
                isLoading={isPendingDeleteUnit}
                disabled={isPendingDeleteUnit}
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
