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

const ProfilePhoto = ({ dataUser }: { dataUser: any }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const { onClose, onOpenChange, isOpen } = useDisclosure();
  const isSellerVerified =
    dataUser?.Seller[0]?.verified && dataUser?.Seller?.length;

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
        <CardHeader className="flex lg:flex-col items-start gap-4 lg:gap-0 lg:items-center pb-6">
          <div className="relative inline-block group">
            <Avatar
              className="lg:w-32 lg:h-32 w-20 h-20 mx-auto border-4 border-emerald-200"
              name={`${dataUser?.name}`}
              src={`https://ui-avatars.com/api/?name=${dataUser?.name}&background=random`}
              showFallback
            />
            {/* <Button
              isIconOnly
              color="success"
              className="absolute -bottom-2 -right-2 shadow-lg text-white"
              onPress={() => {}}
            >
              <FiCamera className="h-5 w-5" />
            </Button> */}
          </div>
          <div className="lg:text-center text-left">
            <h3 className="mt-6 text-xl font-semibold">{dataUser?.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {dataUser?.email}
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex gap-2 lg:flex-col">
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
