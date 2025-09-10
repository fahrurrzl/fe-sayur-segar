"use client";

import LoadingSpinner from "@/components/loading-spinner";
import { IUserResponse } from "@/types/user";
import { formatDate } from "@/utils/dateFormat";
import {
  Avatar,
  Button,
  Chip,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { BsShield } from "react-icons/bs";
import { FaMapPin, FaUser } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { MdCalendarMonth, MdEmail, MdPhone } from "react-icons/md";

const ModalUser = ({
  isOpen,
  onClose,
  user,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: IUserResponse;
  isLoading: boolean;
}) => {
  if (isLoading) return <LoadingSpinner />;
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
            <ModalHeader className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
              <p className="text-lg font-semibold">Detail User / Pengguna</p>
            </ModalHeader>

            <ModalBody className="gap-6">
              {/* User Avatar and Basic Info */}
              <div className="flex items-start gap-4">
                <Avatar
                  src={
                    user?.photo
                      ? user?.photo
                      : `https://ui-avatars.com/api/?name=${user?.name}&background=random`
                  }
                  name={user?.name}
                  size="lg"
                  className="text-lg"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{user?.name}</h3>
                  <p className="text-default-500">@{user?.username}</p>
                  <div className="flex gap-2 mt-2">
                    <Chip
                      color={user?.isActive ? "success" : "warning"}
                      variant="bordered"
                      size="sm"
                    >
                      {user?.isActive ? "active" : "inactive"}
                    </Chip>
                    <Chip variant="flat" size="sm">
                      Role: {user?.role}
                    </Chip>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Contact Information */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <FiUser className="h-4 w-4" />
                  Informasi Kontak
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MdEmail className="h-4 w-4 text-default-400" />
                    <span className="text-sm">{user?.email}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MdPhone className="h-4 w-4 text-default-400" />
                    <span className="text-sm">{user?.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaUser className="h-4 w-4 text-default-400" />
                    <span className="text-sm">
                      {user?.gender === "male"
                        ? "Laki-laki"
                        : user?.gender === "female" && "Perempuan"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaMapPin className="h-4 w-4 text-default-400" />
                    <span className="text-sm">{user?.address}</span>
                  </div>
                </div>
              </div>

              <Divider />

              {/* Account Information */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <BsShield className="h-4 w-4" />
                  Informasi Akun
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MdCalendarMonth className="h-4 w-4 text-default-400" />
                    <div>
                      <p className="text-sm font-medium">Tanggal Bergabung</p>
                      <p className="text-sm text-default-500">
                        {formatDate(user?.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="border-t border-gray-200 dark:border-gray-700">
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

export default ModalUser;
