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
  Select,
  SelectItem,
  Skeleton,
  Textarea,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { Controller } from "react-hook-form";
import { BsBank, BsCreditCard, BsPerson } from "react-icons/bs";
import { FaStore } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { MdOutlineDescription } from "react-icons/md";

export const banks = [
  { key: "bca", label: "BCA" },
  { key: "bni", label: "BNI" },
  { key: "bri", label: "BRI" },
  { key: "mandiri", label: "Mandiri" },
  { key: "permata", label: "Permata" },
  { key: "other", label: "Lainnya" },
];

const Seller = () => {
  const router = useRouter();

  const { dataUser } = useProfile();
  const {
    control,
    handleSubmit,
    errors,
    handleCreateSeller,
    isPendingCreateSeller,
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
          <p className="text-gray-600 text-sm">Perbarui informasi lapak Anda</p>
        </CardHeader>

        <CardBody>
          <form
            onSubmit={handleSubmit(handleCreateSeller)}
            className="space-y-4"
          >
            {/* Basic Information */}
            <div className="space-y-4">
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
                            variant="bordered"
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

                  <Skeleton className="rounded-lg" isLoaded={!isLoadingSeller}>
                    <div className="space-y-1">
                      <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            label="Deskripsi"
                            placeholder="Masukkan deskripsi lapak Anda"
                            variant="bordered"
                            startContent={
                              <MdOutlineDescription className="h-5 w-5 text-gray-400" />
                            }
                            isInvalid={!!errors.description}
                          />
                        )}
                      />
                      {errors.description && (
                        <p className="text-danger text-xs">
                          {errors.description.message}
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
                        name="storeLocation"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label="Lokasi Lapak"
                            variant="bordered"
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

                  <Skeleton className="rounded-lg" isLoaded={!isLoadingSeller}>
                    <div className="space-y-1">
                      <Controller
                        name="bankName"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            label="Nama Bank"
                            variant="bordered"
                            placeholder="Pilih nama bank"
                            startContent={
                              <BsBank className="h-4 w-4 text-gray-400" />
                            }
                            isInvalid={!!errors.bankName}
                          >
                            {banks.map((bank) => (
                              <SelectItem key={bank.key}>
                                {bank.label}
                              </SelectItem>
                            ))}
                          </Select>
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
                        name="accountName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label="Nama Rekening"
                            variant="bordered"
                            placeholder="Masukkan nama rekening"
                            startContent={
                              <BsPerson className="h-4 w-4 text-gray-400" />
                            }
                            isInvalid={!!errors.accountName}
                          />
                        )}
                      />
                      {errors.accountName && (
                        <p className="text-danger text-xs">
                          {errors.accountName.message}
                        </p>
                      )}
                    </div>
                  </Skeleton>

                  <Skeleton className="rounded-lg" isLoaded={!isLoadingSeller}>
                    <div className="space-y-1">
                      <Controller
                        name="accountNumber"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            label="Nomor Rekening"
                            variant="bordered"
                            placeholder="Masukkan nomor rekening"
                            startContent={
                              <BsCreditCard className="h-4 w-4 text-gray-400" />
                            }
                            isInvalid={!!errors.accountNumber}
                          />
                        )}
                      />
                      {errors.accountNumber && (
                        <p className="text-danger text-xs">
                          {errors.accountNumber.message}
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
