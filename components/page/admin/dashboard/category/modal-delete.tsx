import useCategory from "@/hooks/useCateogry";
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
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
}

const ModalDelete = ({
  isOpen,
  onClose,
  onOpenChange,
  selectedCategory,
  setSelectedCategory,
}: PropTypes) => {
  const {
    handleDeleteCategory,
    isPendingDeleteCategory,
    isSuccessDeleteCategory,
  } = useCategory();

  useEffect(() => {
    if (isSuccessDeleteCategory) {
      onClose();
      setSelectedCategory("");
    }
  }, [isSuccessDeleteCategory]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Hapus Kategori
            </ModalHeader>
            <ModalBody>
              <p>Apakah Anda yakin ingin menghapus kategori ini?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button
                color="success"
                className="text-white"
                onPress={() => handleDeleteCategory(selectedCategory)}
                isLoading={isPendingDeleteCategory}
                disabled={isPendingDeleteCategory}
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
