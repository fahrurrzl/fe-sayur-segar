"use client";

import ProfileHeader from "@/components/page/profile/profile-header";
import useProfile from "@/hooks/useProfile";
import { Button } from "@heroui/button";
import { Avatar, Card, CardBody, CardHeader } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaStore } from "react-icons/fa";
import { FiCamera, FiSettings, FiShield, FiUser } from "react-icons/fi";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const { dataUser } = useProfile();
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <ProfileHeader
        title="Profile Saya"
        description="Kelola profil Anda di sini"
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Photo Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-col items-center pb-6">
                <div className="relative inline-block group">
                  <Avatar
                    className="w-32 h-32 mx-auto border-4 border-emerald-200"
                    name={`${dataUser?.name}`}
                    src={`https://ui-avatars.com/api/?name=${dataUser?.name}&background=random`}
                    showFallback
                  />
                  <Button
                    isIconOnly
                    color="success"
                    className="absolute -bottom-2 -right-2 shadow-lg text-white"
                    onPress={() => {}}
                  >
                    <FiCamera className="h-5 w-5" />
                  </Button>
                </div>
                <div className="text-center">
                  <h3 className="mt-6 text-xl font-semibold">
                    {dataUser?.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{dataUser?.email}</p>
                </div>
              </CardHeader>

              <CardBody>
                <div className="space-y-3">
                  <Button
                    color="success"
                    variant="bordered"
                    className="w-full justify-start"
                    onPress={() => router.push("/profile/seller")}
                    startContent={<FaStore className="h-4 w-4" />}
                  >
                    Menjadi Penjual
                  </Button>

                  <Button
                    variant="bordered"
                    className="w-full justify-start"
                    onPress={() => router.push("/profile")}
                    startContent={<FiUser className="h-4 w-4" />}
                  >
                    Ubah Data Profil
                  </Button>

                  <Button
                    variant="bordered"
                    className="w-full justify-start"
                    onPress={() => router.push("/profile/security")}
                    startContent={<FiShield className="h-4 w-4" />}
                  >
                    Pengaturan Keamanan
                  </Button>

                  <Button
                    variant="bordered"
                    className="w-full justify-start"
                    onPress={() => {}}
                    startContent={<FiSettings className="h-4 w-4" />}
                  >
                    Pengaturan Lanjutan
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Form Section */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
