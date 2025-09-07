"use client";

import ModalConfirmBeseller from "@/components/modal-confirm-beseller";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaAngleRight, FaStore } from "react-icons/fa";
import { FiCamera, FiShield, FiUser } from "react-icons/fi";
import InputFile from "@/components/input-file";
import cn from "@/utils/cn";
import { Controller } from "react-hook-form";
import usePhotoProfile from "@/hooks/usePhotoProfile";

const ProfilePhoto = ({ dataUser }: { dataUser: any }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const { onClose, onOpenChange, isOpen } = useDisclosure();
  const isSellerVerified =
    dataUser?.Seller[0]?.verified && dataUser?.Seller?.length;

  const {
    control,
    handleSubmit,
    errors,
    handleUpdatePhoto,
    isPendingMutateUpdatePhoto,
    handleUploadImage,
    handleDeleteImage,
    isPendingDeleteFile,
    isPendingUploadFile,
    preview,
    visibleForm,
    handleVisibleForm,
  } = usePhotoProfile();

  return (
    <div className="lg:col-span-1">
      <ModalConfirmBeseller isOpen={isOpen} onOpenChange={onOpenChange} />
      <Card className="shadow-lg">
        {session?.user?.role === "user" ? (
          <button
            className="bg-success text-white w-fit mb-4 py-2 pl-4 pr-8 rounded-r-full flex items-center gap-2 cursor-pointer hover:bg-success-600 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() =>
              dataUser?.Seller.length > 0
                ? isSellerVerified
                  ? router.push("/dashboard")
                  : router.push("/dashboard/store-info")
                : onOpenChange()
            }
          >
            <FaStore className="h-4 w-4" />
            {dataUser?.Seller.length > 0 ? "Lapak Saya" : "Menjadi Penjual"}
            <FaAngleRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
          </button>
        ) : null}
        <CardHeader className="flex flex-col">
          <div className="flex lg:flex-col items-start gap-2 lg:gap-0 lg:items-center w-full">
            <div className="relative flex flex-col items-center group">
              <Avatar
                className="lg:w-32 lg:h-32 w-16 h-16 mx-auto border-4 border-emerald-200"
                name={`${dataUser?.name}`}
                src={
                  preview
                    ? preview
                    : dataUser?.photo
                      ? dataUser?.photo
                      : `https://ui-avatars.com/api/?name=${dataUser?.name}&background=random`
                }
                showFallback
              />
              <Button
                size="sm"
                variant="light"
                className="mt-2"
                startContent={<FiCamera />}
                onPress={handleVisibleForm}
              >
                Ubah Photo
              </Button>
            </div>
            <div className="lg:text-center text-left mb-2">
              <h3 className="mt-2 text-xl font-semibold">{dataUser?.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                @{dataUser?.username}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {visibleForm ? (
            <form onSubmit={handleSubmit(handleUpdatePhoto)}>
              <Controller
                name="photo"
                control={control}
                render={({ field }) => (
                  <InputFile
                    {...field}
                    isDroppable
                    className={cn(errors.photo && "border-red-500")}
                    onUpload={(files) =>
                      handleUploadImage(files, field.onChange)
                    }
                    isUploading={isPendingUploadFile}
                    onDelete={() => handleDeleteImage(field.onChange)}
                    isDeleting={isPendingDeleteFile}
                    preview={typeof preview === "string" ? preview : ""}
                  />
                )}
              />

              {preview !== "" ? (
                <Button
                  type="submit"
                  isLoading={isPendingMutateUpdatePhoto}
                  disabled={isPendingMutateUpdatePhoto}
                  size="sm"
                  color="success"
                  className="text-white mt-2 w-full"
                >
                  Simpan Photo
                </Button>
              ) : null}
            </form>
          ) : null}
          <div className="flex gap-2 lg:flex-col mt-4">
            <Button
              variant="bordered"
              color={pathName === "/profile" ? "success" : "default"}
              className="w-full justify-start"
              onPress={() => router.push("/profile")}
              startContent={<FiUser className="h-4 w-4" />}
            >
              Profil
            </Button>

            <Button
              variant="bordered"
              color={pathName === "/profile/security" ? "success" : "default"}
              className="w-full justify-start"
              onPress={() => router.push("/profile/security")}
              startContent={<FiShield className="h-4 w-4" />}
            >
              Keamanan
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfilePhoto;
