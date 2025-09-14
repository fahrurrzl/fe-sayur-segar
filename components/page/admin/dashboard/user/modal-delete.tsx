import useUser from "@/hooks/useUser";
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
  selectedUser: string;
  setSelectedUser: (id: string) => void;
}

const ModalDelete = ({
  isOpen,
  onClose,
  onOpenChange,
  selectedUser,
  setSelectedUser,
}: PropTypes) => {
  const { mutateDeleteUser, isPendingDeleteUser, isSuccessDeleteUser } =
    useUser();

  useEffect(() => {
    if (isSuccessDeleteUser) {
      onClose();
      setSelectedUser("");
    }
  }, [isSuccessDeleteUser]);
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Hapus User
            </ModalHeader>
            <ModalBody>
              <p>Apakah Anda yakin ingin menghapus user ini?</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={() => {
                  onClose();
                  setSelectedUser("");
                }}
              >
                Batal
              </Button>
              <Button
                color="success"
                className="text-white"
                disabled={isPendingDeleteUser}
                isLoading={isPendingDeleteUser}
                onPress={() => {
                  mutateDeleteUser(selectedUser);
                }}
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
