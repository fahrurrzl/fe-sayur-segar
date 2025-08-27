import useProduct from "@/hooks/useProduct";
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
  selectedProduct: string;
  setSelectedProduct: (id: string) => void;
}

const ModalDelete = ({
  isOpen,
  onClose,
  onOpenChange,
  selectedProduct,
  setSelectedProduct,
}: PropTypes) => {
  const {
    handleAdminDeleteProduct,
    isPendingAdminDeleteProduct,
    isSuccessAdminDeleteProduct,
  } = useProduct();

  useEffect(() => {
    if (isSuccessAdminDeleteProduct) {
      onClose();
      setSelectedProduct("");
    }
  }, [isSuccessAdminDeleteProduct]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Hapus Produk
            </ModalHeader>
            <ModalBody>
              <p>Apakah Anda yakin ingin menghapus produk ini?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button
                color="success"
                className="text-white"
                onPress={() => handleAdminDeleteProduct(selectedProduct)}
                isLoading={isPendingAdminDeleteProduct}
                disabled={isPendingAdminDeleteProduct}
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
