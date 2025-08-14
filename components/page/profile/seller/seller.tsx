"use client";

import useProfile from "@/hooks/useProfile";
import useSeller from "@/hooks/useSeller";
import { Button } from "@heroui/button";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Input,
  Skeleton,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { FaStore } from "react-icons/fa";
import { FiCreditCard, FiMapPin } from "react-icons/fi";

const Seller = () => {
  const router = useRouter();

  const { dataUser } = useProfile();
  const {
    control,
    handleSubmit,
    errors,
    handleCreateSeller,
    isPendingCreateSeller,
    dataSeller,
    isLoadingSeller,
  } = useSeller();

  return (
    <div className="lg:col-span-2">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-start">
          <h2 className="text-xl flex items-center gap-2">
            <FaStore className="h-5 w-5 text-emerald-600" />
            Informasi Lapak
          </h2>
          <p className="text-gray-600 text-sm">
            Perbarui informasi lapak Anda di sini
          </p>
        </CardHeader>

        <CardBody>
          <form
            onSubmit={handleSubmit(handleCreateSeller)}
            className="space-y-8"
          >
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Informasi Dasar
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  <Skeleton className="rounded-lg" isLoaded={!isLoadingSeller}>
                    <div className="space-y-1">
                      <Controller
                        name="storeName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label="Nama Lapak"
                            placeholder="Masukkan nama lapak"
                            startContent={
                              <FaStore className="h-4 w-4 text-gray-400" />
                            }
                            isInvalid={!!errors.storeName}
                          />
                        )}
                      />
                      {errors.storeName && (
                        <p className="text-danger text-xs">
                          {errors.storeName.message}
                        </p>
                      )}
                    </div>
                  </Skeleton>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Informasi Kontak
                </h3>
                <div className="space-y-4">
                  <Skeleton className="rounded-lg" isLoaded={!isLoadingSeller}>
                    <div className="space-y-1">
                      <Controller
                        name="bankName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label="Nama Bank"
                            placeholder="Masukkan nama bank"
                            startContent={
                              <FiCreditCard className="h-4 w-4 text-gray-400" />
                            }
                            isInvalid={!!errors.bankName}
                          />
                        )}
                      />
                      {errors.bankName && (
                        <p className="text-danger text-xs">
                          {errors.bankName.message}
                        </p>
                      )}
                    </div>
                  </Skeleton>

                  <Skeleton className="rounded-lg" isLoaded={!isLoadingSeller}>
                    <div className="space-y-1">
                      <Controller
                        name="bankAccount"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label="Nomor Rekening"
                            placeholder="Masukkan nomor rekening"
                            startContent={
                              <FiCreditCard className="h-4 w-4 text-gray-400" />
                            }
                            isInvalid={!!errors.bankAccount}
                          />
                        )}
                      />
                      {errors.bankAccount && (
                        <p className="text-danger text-xs">
                          {errors.bankAccount.message}
                        </p>
                      )}
                    </div>
                  </Skeleton>

                  <Skeleton className="rounded-lg" isLoaded={!isLoadingSeller}>
                    <div className="space-y-1">
                      <Controller
                        name="storeLocation"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label="Lokasi Lapak"
                            placeholder="Masukkan lokasi lapak"
                            startContent={
                              <FiMapPin className="h-4 w-4 text-gray-400" />
                            }
                            isInvalid={!!errors.storeLocation}
                          />
                        )}
                      />
                      {errors.storeLocation && (
                        <p className="text-danger text-xs">
                          {errors.storeLocation.message}
                        </p>
                      )}
                    </div>
                  </Skeleton>
                </div>
              </div>
              <Alert
                title="Informasi Lapak"
                description={`Catatan: Setelah mendaftar sebagai penjual, data Anda akan diverifikasi dalam 1-3 hari kerja.`}
                color="warning"
              />
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
                isLoading={isPendingCreateSeller}
                disabled={isPendingCreateSeller}
              >
                {dataUser?.Seller?.length > 0
                  ? "Simpan Perubahan"
                  : "Buat Lapak"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Seller;
