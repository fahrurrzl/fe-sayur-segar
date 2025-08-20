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
import { FiCreditCard, FiMapPin } from "react-icons/fi";
import { MdOutlineDescription } from "react-icons/md";

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
      setValue("description", dataSeller?.description || "");
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
                          startContent={
                            <FaStore className="h-4 w-4 text-gray-400" />
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
                            <FiMapPin className="h-4 w-4 text-gray-400" />
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
                            <MdOutlineDescription className="h-5 w-5 text-gray-400" />
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
