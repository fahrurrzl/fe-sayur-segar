"use client";

import InputFile from "@/components/input-file";
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
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { FiPackage } from "react-icons/fi";
import { useRouter } from "next/navigation";
import useCategory from "@/hooks/useCateogry";
import useProduct from "@/hooks/useProduct";
import { Controller } from "react-hook-form";
import cn from "@/utils/cn";
import { useEffect } from "react";
import { TProductResponse } from "@/types";
import useUnit from "@/hooks/useUnit";

interface PropTypes {
  type: "create" | "edit";
  data?: TProductResponse;
}

const ProductForm = ({ type, data }: PropTypes) => {
  const router = useRouter();
  const { dataCategories: categories } = useCategory();
  const { dataUnits, isLoadingUnits } = useUnit();

  const {
    // form
    control,
    handleSubmit,
    errors,
    reset,
    // mutation
    handleCreateProduct,
    isPendingCreateProduct,
    handleUpdateProduct,
    isPendingUpdateProduct,
    // handle image
    handleUploadImage,
    isPendingUploadFile,
    handleDeleteImage,
    isPendingDeleteFile,
    preview,
    setValue,
  } = useProduct();

  useEffect(() => {
    if (type === "edit") {
      setValue("name", data?.name || "");
      setValue("price", data?.price || 0);
      setValue("stock", data?.stock || 0);
      setValue("unitId", data?.unitId || "");
      setValue("categoryId", data?.categoryId || "");
      setValue("description", data?.description || "");
      setValue("imageUrl", data?.imageUrl || "");
    }
  }, [type, data]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center mb-4">
        <Button isIconOnly variant="light" as={Link} href="/dashboard/product">
          <FaArrowLeft />
        </Button>

        <div className="flex items-center gap-2">
          <FiPackage className="h-6 w-6 text-success" />
          <h1 className="text-2xl font-bold">
            {type === "create" ? "Buat Produk Baru" : "Ubah Produk"}
          </h1>
        </div>
      </div>
      <div>
        <form
          onSubmit={handleSubmit(
            type === "create" ? handleCreateProduct : handleUpdateProduct
          )}
          className="space-y-4"
        >
          <Card>
            <CardHeader className="flex flex-col gap-w items-start">
              <h2 className="text-lg font-semibold">Foto Produk</h2>
              <p className="text-sm text-foreground-500">
                Unggah foto produk Anda
              </p>
            </CardHeader>
            <CardBody>
              {/* Upload Image */}
              <div className="space-y-1">
                <Controller
                  name="imageUrl"
                  control={control}
                  render={({ field }) => (
                    <InputFile
                      {...field}
                      isDroppable
                      className={cn(errors.imageUrl && "border-red-500")}
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
                {errors.imageUrl && (
                  <p className="text-red-500 text-sm">
                    {errors.imageUrl.message}
                  </p>
                )}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex flex-col gap-w items-start">
              <h2 className="text-lg font-semibold">Detail Produk</h2>
              <p className="text-sm text-foreground-500">
                Isi detail produk Anda
              </p>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-4">
                <div className="space-y-1">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Nama Produk"
                        variant="bordered"
                        {...field}
                        isInvalid={!!errors.name}
                      />
                    )}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value?.toString() || ""}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                        label="Harga Produk"
                        variant="bordered"
                        type="number"
                        isInvalid={!!errors.price}
                      />
                    )}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Controller
                      name="stock"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          value={field.value?.toString() || ""}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value) || 0)
                          }
                          label="Stok Produk"
                          variant="bordered"
                          type="number"
                          isInvalid={!!errors.stock}
                        />
                      )}
                    />
                    {errors.stock && (
                      <p className="text-red-500 text-sm">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <Controller
                      name="unitId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          selectedKeys={field.value ? [field.value] : []}
                          variant="bordered"
                          items={dataUnits?.data || []}
                          label="Satuan Produk"
                          placeholder="Pilih Satuan"
                          isInvalid={!!errors?.unitId}
                          isLoading={isLoadingUnits}
                          disabled={isLoadingUnits}
                        >
                          {(unit: { id: string; symbol: string }) => (
                            <SelectItem key={unit?.id}>
                              {unit?.symbol}
                            </SelectItem>
                          )}
                        </Select>
                      )}
                    />
                    {errors.stock && (
                      <p className="text-red-500 text-sm">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        selectedKeys={field.value ? [field.value] : []}
                        variant="bordered"
                        items={categories || []}
                        label="Kategori Produk"
                        placeholder="Pilih Kategori"
                        isInvalid={!!errors.categoryId}
                        isLoading={!categories?.length}
                        disabled={!categories?.length}
                      >
                        {(category: { id: string; name: string }) => (
                          <SelectItem key={category.id}>
                            {category.name}
                          </SelectItem>
                        )}
                      </Select>
                    )}
                  />
                  {errors.categoryId && (
                    <p className="text-red-500 text-sm">
                      {errors.categoryId.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        label="Deskripsi Produk"
                        variant="bordered"
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
              </div>
            </CardBody>
          </Card>
          <div className="flex justify-end gap-2">
            <Button
              variant="flat"
              onPress={() => router.push("/dashboard/product")}
            >
              Batal
            </Button>
            <Button
              type="submit"
              color="success"
              className="text-white"
              isLoading={
                isPendingCreateProduct ||
                isPendingUploadFile ||
                isPendingUpdateProduct
              }
              disabled={
                isPendingCreateProduct ||
                isPendingUploadFile ||
                isPendingUpdateProduct
              }
            >
              {type === "create" ? "Buat Produk" : "Ubah Produk"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
