"use client";

import InputFile from "@/components/input-file";
import useSeller from "@/hooks/useSeller";
import cn from "@/utils/cn";
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
import { FaArrowLeft, FaStore } from "react-icons/fa";
import { FiCreditCard } from "react-icons/fi";

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
    if (dataSeller) {
      setValue("storeName", dataSeller?.storeName || "");
      setValue("storeLocation", dataSeller?.storeLocation || "");
      setValue("bankAccount", dataSeller?.bankAccount || "");
      setValue("bankName", dataSeller?.bankName || "");
    }
  }, [dataSeller]);

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
              <p className="text-sm text-foreground-500">
                Isi detail produk Anda
              </p>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
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
                          selectedKeys={field.value ? [field.value] : []}
                          variant="bordered"
                          items={[
                            { id: "BCA", name: "BCA - Bank Central Asia" },
                            { id: "BNI", name: "BNI - Bank Negara Indonesia" },
                            { id: "BRI", name: "BRI - Bank Rakyat Indonesia" },
                          ]}
                          label="Nama Bank"
                          placeholder="Pilih Bank"
                          isInvalid={!!errors.bankName}
                        >
                          {(category: { id: string; name: string }) => (
                            <SelectItem key={category.id}>
                              {category.name}
                            </SelectItem>
                          )}
                        </Select>
                      )}
                    />
                    {errors.bankName && (
                      <p className="text-red-500 text-sm">
                        {errors.bankName.message}
                      </p>
                    )}
                  </div>
                </Skeleton>

                <Skeleton
                  className="rounded-lg"
                  isLoaded={!!dataSeller?.bankAccount}
                >
                  <div className="space-y-1">
                    <Controller
                      name="bankAccount"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label="Nomor Rekening"
                          placeholder="Masukkan nomor rekening"
                          variant="bordered"
                          startContent={
                            <FiCreditCard className="h-4 w-4 text-gray-400" />
                          }
                          isInvalid={!!errors.bankAccount}
                        />
                      )}
                    />
                    {errors.bankAccount && (
                      <p className="text-red-500 text-sm">
                        {errors.bankAccount.message}
                      </p>
                    )}
                  </div>
                </Skeleton>
              </div>
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
