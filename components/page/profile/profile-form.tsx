"use client";

import useProfile from "@/hooks/useProfile";
import { Button } from "@heroui/button";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
  Textarea,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";

const ProfileForm = () => {
  const router = useRouter();
  const {
    dataUser,
    isPendingUpdateUser,
    handleSubmit,
    handleUpdateUser,
    control,
    errors,
    setValue,
  } = useProfile();

  useEffect(() => {
    if (dataUser) {
      setValue("name", dataUser?.name || "");
      setValue("email", dataUser?.email || "");
      setValue("address", dataUser?.address || "");
      setValue("phone", dataUser?.phone || "");
    }
  }, [dataUser]);

  return (
    <div className="lg:col-span-2">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-start">
          <h2 className="text-xl flex items-center gap-2">
            <FaUser className="h-5 w-5 text-emerald-600" />
            Informasi Pribadi
          </h2>
          <p className="text-gray-600 text-sm">
            Perbarui informasi pribadi Anda di sini
          </p>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit(handleUpdateUser)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Informasi Dasar
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <Skeleton className="rounded-lg" isLoaded={!!dataUser}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Nama Lengkap"
                          placeholder="Masukkan nama lengkap"
                          variant="bordered"
                          startContent={
                            <FaUser className="h-4 w-4 text-gray-400" />
                          }
                          isRequired
                        />
                      )}
                    />
                  </Skeleton>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Informasi Kontak
                </h3>
                <div className="space-y-4">
                  <Skeleton className="rounded-lg" isLoaded={!!dataUser}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Alamat Email"
                          placeholder="Masukkan alamat email"
                          disabled
                          startContent={
                            <FiMail className="h-4 w-4 text-gray-400" />
                          }
                          isRequired
                        />
                      )}
                    />
                  </Skeleton>

                  <Skeleton className="rounded-lg" isLoaded={!!dataUser}>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Nomor Telepon"
                          placeholder="Masukkan nomor telepon"
                          variant="bordered"
                          startContent={
                            <FiPhone className="h-4 w-4 text-gray-400" />
                          }
                        />
                      )}
                    />
                  </Skeleton>

                  <Skeleton className="rounded-lg" isLoaded={!!dataUser}>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          label="Alamat Lengkap"
                          placeholder="Masukkan alamat lengkap"
                          minRows={3}
                          variant="bordered"
                        />
                      )}
                    />
                  </Skeleton>
                </div>
              </div>

              {/* Seller Options */}
              {/* <div>
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center gap-2">
                        <FaStore className="h-5 w-5 text-emerald-600" />
                        Opsi Penjual
                      </h3>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 border">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Menjadi Penjual
                            </p>
                            <p className="text-xs text-gray-600">
                              Aktifkan untuk mulai berjualan di platform kami
                            </p>
                          </div>
                          <Switch
                            isSelected={isSeller}
                            onValueChange={setIsSeller}
                            color="success"
                          />
                        </div>

                        {isSeller && (
                          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border">
                            <CardHeader className="pb-3">
                              <div className="flex items-center gap-2">
                                <FiFileText className="h-4 w-4 text-blue-600" />
                                <h4 className="font-medium text-blue-900">
                                  Informasi Toko
                                </h4>
                              </div>
                            </CardHeader>
                            <CardBody className="space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                  name="storeName"
                                  value=""
                                  onChange={() => {}}
                                  label="Nama Toko"
                                  placeholder="Masukkan nama toko"
                                  isRequired
                                />

                                <Select
                                  label="Jenis Usaha"
                                  selectedKeys={["individual"]}
                                >
                                  <SelectItem key="individual">
                                    Perorangan
                                  </SelectItem>
                                  <SelectItem key="company">
                                    Perusahaan
                                  </SelectItem>
                                  <SelectItem key="cooperative">
                                    Koperasi
                                  </SelectItem>
                                </Select>
                              </div>

                              <Textarea
                                name="storeDescription"
                                value=""
                                onChange={() => {}}
                                label="Deskripsi Toko"
                                placeholder="Jelaskan tentang toko Anda..."
                                minRows={3}
                              />

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                  name="idNumber"
                                  value=""
                                  onChange={() => {}}
                                  label="Nomor KTP/NIK"
                                  placeholder="Masukkan nomor KTP"
                                  isRequired
                                />

                                <Input
                                  name="bankAccount"
                                  value=""
                                  onChange={() => {}}
                                  label="Nomor Rekening Bank"
                                  placeholder="Masukkan nomor rekening"
                                />
                              </div>

                              <Chip
                                color="warning"
                                variant="flat"
                                className="w-full p-3"
                                startContent={
                                  <FiFileText className="h-4 w-4" />
                                }
                              >
                                <span className="text-sm">
                                  <strong>Catatan:</strong> Setelah mendaftar
                                  sebagai penjual, data Anda akan diverifikasi
                                  dalam 1-3 hari kerja.
                                </span>
                              </Chip>
                            </CardBody>
                          </Card>
                        )}
                      </div>
                    </div> */}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="button"
                variant="bordered"
                className="flex-1"
                onPress={() => router.back()}
              >
                Batal
              </Button>
              <Button
                type="submit"
                color="success"
                className="flex-1 text-white"
                isLoading={isPendingUpdateUser}
                disabled={isPendingUpdateUser}
              >
                Simpan Perubahan
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfileForm;
