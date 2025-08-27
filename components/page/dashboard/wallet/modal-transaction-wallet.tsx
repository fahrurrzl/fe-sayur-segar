"use client";

import useWalletTransaction from "@/hooks/useWalletTransaction";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

const ModalTransactionWallet = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    control,
    errors,
    handleSubmit,
    handleCreateWalletTransaction,
    isCreating,
    isSuccessCreate,
  } = useWalletTransaction();

  useEffect(() => {
    if (isSuccessCreate) {
      onClose();
    }
  }, [isSuccessCreate, onClose]);

  return (
    <Modal isOpen={isOpen} size="md" onClose={onClose}>
      <form onSubmit={handleSubmit(handleCreateWalletTransaction)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Tarik Dana
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <Controller
                      name="amount"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Jumlah Penarikan"
                          variant="bordered"
                          type="number"
                          isInvalid={!!errors.amount}
                          errorMessage={errors.amount?.message}
                        />
                      )}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  type="submit"
                  color="success"
                  className="text-white"
                  isLoading={isCreating}
                >
                  Tarik Dana
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ModalTransactionWallet;
