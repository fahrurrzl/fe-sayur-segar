import useTransfer from "@/hooks/useTransfer";
import { IWalletTransaction } from "@/types/wallet-transaction";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useEffect } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  data: IWalletTransaction | null;
}

const ModalConfirmTransfer = ({
  isOpen,
  onClose,
  onOpenChange,
  data,
}: PropTypes) => {
  const { handelTransfer, isPendingTransfer, isSuccessTransfer } =
    useTransfer();

  useEffect(() => {
    if (isSuccessTransfer) {
      onClose();
    }
  }, [isSuccessTransfer, onClose]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Transfer</ModalHeader>
            <ModalBody>
              <p>
                Apakah Anda yakin ingin transfer ke rekening{" "}
                {data?.wallet?.seller?.bankName.toUpperCase()} atas nama{" "}
                {data?.wallet?.seller?.accountName.toUpperCase()}?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button
                color="primary"
                className="text-white"
                isLoading={isPendingTransfer}
                disabled={isPendingTransfer}
                onPress={() =>
                  handelTransfer({
                    amount: data?.amount as number,
                    accountNumber: data?.wallet?.seller
                      ?.accountNumber as string,
                    accountHolderName: data?.wallet?.seller
                      ?.accountName as string,
                    channelCode: `ID_${data?.wallet?.seller?.bankName.toUpperCase()}`,
                    referenceId: data?.id as string,
                  })
                }
              >
                Transfer
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirmTransfer;
