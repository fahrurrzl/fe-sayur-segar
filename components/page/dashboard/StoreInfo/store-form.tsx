"use client";

import useSeller from "@/hooks/useSeller";
import { Button } from "@heroui/button";
import {
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
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { BsBank, BsCreditCard, BsPerson } from "react-icons/bs";
import { FaArrowLeft, FaStore } from "react-icons/fa";
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

const StoreForm = () => {
  const {
    dataSeller,
    handleSubmit,
    control,
    setValue,
    errors,
    handleUpdateStore,
    isPendingUpdateSeller,
  } = useSeller();
  const router = useRouter();

  useEffect(() => {
    if (dataSeller?.seller) {
      setValue("storeName", dataSeller?.seller?.storeName || "");
      setValue("storeLocation", dataSeller?.seller?.storeLocation || "");
      setValue("description", dataSeller?.seller?.description || "");
      setValue("accountNumber", dataSeller?.seller?.accountNumber || "");
      setValue("accountName", dataSeller?.seller?.accountName || "");
      setValue("bankName", dataSeller?.seller?.bankName || "");
    }
  }, [dataSeller?.seller]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-4">
        <Button isIconOnly variant="light" onPress={() => router.back()}>
          <FaArrowLeft />
        </Button>

        <div className="flex items-center gap-2">
          <FaStore className="h-6 w-6 text-success" />
          <h1 className="text-2xl font-bold">Ubah Informasi Lapak</h1>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit(handleUpdateStore)} className="space-y-4">
          <Card>
            <CardHeader className="flex flex-col gap-w items-start">
              <h2 className="text-lg font-semibold">Detail Produk</h2>
              <p className="text-sm text-foreground-500 dark:text-foreground-400">
                Isi detail produk Anda
              </p>
            </CardHeader>
            <CardBody>
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Informasi Dasar
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    <Skeleton
                      className="rounded-lg"
                      isLoaded={!!dataSeller?.seller?.storeName}
                    >
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
                                <FaStore className="h-4 w-4 text-gray-400 dark:text-gray-400" />
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

                    <Skeleton
                      className="rounded-lg"
                      isLoaded={!!dataSeller?.seller?.description}
                    >
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
                                <MdOutlineDescription className="h-5 w-5 text-gray-400 dark:text-gray-400" />
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
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Informasi Kontak
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton
                      className="rounded-lg"
                      isLoaded={!!dataSeller?.seller?.storeLocation}
                    >
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
                                <FiMapPin className="h-4 w-4 text-gray-400 dark:text-gray-400" />
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

                    <Skeleton
                      className="rounded-lg"
                      isLoaded={!!dataSeller?.seller?.bankName}
                    >
                      <div className="space-y-1">
                        <Controller
                          name="bankName"
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              defaultSelectedKeys={[
                                `${dataSeller?.seller?.bankName}`,
                              ]}
                              label="Nama Bank"
                              variant="bordered"
                              placeholder="Pilih nama bank"
                              startContent={
                                <BsBank className="h-4 w-4 text-gray-400 dark:text-gray-400" />
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

                    <Skeleton
                      className="rounded-lg"
                      isLoaded={!!dataSeller?.seller?.accountName}
                    >
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
                                <BsPerson className="h-4 w-4 text-gray-400 dark:text-gray-400" />
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

                    <Skeleton
                      className="rounded-lg"
                      isLoaded={!!dataSeller?.seller?.accountNumber}
                    >
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
                                <BsCreditCard className="h-4 w-4 text-gray-400 dark:text-gray-400" />
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
              </div>
              {/* <div className="grid grid-cols-2 gap-4">
                <Skeleton
                  className="rounded-lg"
                  isLoaded={!!dataSeller?.storeName}
                >
                  <div className="space-y-1">
                    <Controller
                      name="storeName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          label="Nama Lapak"
                          variant="bordered"
                          startContent={
                            <FaStore className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                          }
                          {...field}
                          isInvalid={!!errors.storeName}
                        />
                      )}
                    />
                    {errors.storeName && (
                      <p className="text-red-500 text-sm">
                        {errors.storeName.message}
                      </p>
                    )}
                  </div>
                </Skeleton>

                <Skeleton
                  className="rounded-lg"
                  isLoaded={!!dataSeller?.storeLocation}
                >
                  <div className="space-y-1">
                    <Controller
                      name="storeLocation"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Lokasi Lapak"
                          variant="bordered"
                          startContent={
                            <FiMapPin className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                          }
                          isInvalid={!!errors.storeLocation}
                        />
                      )}
                    />
                    {errors.storeLocation && (
                      <p className="text-red-500 text-sm">
                        {errors.storeLocation.message}
                      </p>
                    )}
                  </div>
                </Skeleton>

                <Skeleton
                  className="rounded-lg"
                  isLoaded={!!dataSeller?.bankName}
                >
                  <div className="space-y-1">
                    <Controller
                      name="bankName"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          defaultSelectedKeys={[`${dataSeller?.bankName}`]}
                          label="Nama Bank"
                          variant="bordered"
                          placeholder="Pilih nama bank"
                          startContent={
                            <BsBank className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                          }
                          isInvalid={!!errors.bankName}
                        >
                          {banks.map((bank) => (
                            <SelectItem key={bank.key}>{bank.label}</SelectItem>
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

                <Skeleton
                  className="rounded-lg"
                  isLoaded={!!dataSeller?.storeLocation}
                >
                  <div className="space-y-1">
                    <Controller
                      name="accountName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Atas Nama"
                          variant="bordered"
                          startContent={
                            <FiCreditCard className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                          }
                          isInvalid={!!errors.accountName}
                        />
                      )}
                    />
                    {errors.accountName && (
                      <p className="text-red-500 text-sm">
                        {errors.accountName.message}
                      </p>
                    )}
                  </div>
                </Skeleton>

                <Skeleton
                  className="rounded-lg"
                  isLoaded={!!dataSeller?.storeLocation}
                >
                  <div className="space-y-1">
                    <Controller
                      name="accountNumber"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Nomor Rekening"
                          variant="bordered"
                          startContent={
                            <FiCreditCard className="h-4 w-4 text-gray-400 dark:text-gray-400" />
                          }
                          isInvalid={!!errors.accountNumber}
                        />
                      )}
                    />
                    {errors.accountNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.accountNumber.message}
                      </p>
                    )}
                  </div>
                </Skeleton>

                <Skeleton
                  className="rounded-lg"
                  isLoaded={!!dataSeller?.description}
                >
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
                            <MdOutlineDescription className="h-5 w-5 text-gray-400 dark:text-gray-400" />
                          }
                          isInvalid={!!errors.description}
                        />
                      )}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </Skeleton>
              </div> */}
            </CardBody>
          </Card>
          <div className="flex justify-end gap-2">
            <Button
              variant="flat"
              onPress={() => router.back()}
              disabled={isPendingUpdateSeller}
            >
              Batal
            </Button>
            <Button
              type="submit"
              color="success"
              className="text-white"
              disabled={isPendingUpdateSeller}
              isLoading={isPendingUpdateSeller}
            >
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StoreForm;
