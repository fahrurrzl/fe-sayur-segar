"use client";

import { SearchIcon } from "@/components/icons";
import ProductCard from "@/components/product-card";
import useCategory from "@/hooks/useCateogry";
import useProduct from "@/hooks/useProduct";
import { TCategory, TProduct } from "@/types";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Explore = () => {
  const searchParams = useSearchParams();
  const categoryFilterValue = searchParams.get("category");
  const { dataCategories, isLoadingCategories } = useCategory();
  const {
    dataProducts,
    isLoadingProducts,
    setUrl,
    handleChangeCategory,
    handleChangeSearch,
    handleClearSearch,
  } = useProduct();

  useEffect(() => {
    setUrl();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-foreground">
              Jelajahi Sayur Segar
            </h1>
            <p className="text-foreground-500 text-sm lg:text-base">
              Temukan sayuran dan buah segar langsung dari petani
            </p>
          </div>

          <div>
            <Input
              suppressHydrationWarning
              placeholder="Cari sayur segar..."
              startContent={
                <SearchIcon className="text-default-400 pointer-events-none flex-shrink-0" />
              }
              variant="bordered"
              isClearable
              onClear={handleClearSearch}
              onChange={handleChangeSearch}
            />
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="lg:col-span-1">
            <Card className="sticky top-[80px]">
              <CardHeader>
                <h2 className="text-lg font-semibold">Filter</h2>
              </CardHeader>
              <CardBody>
                <Select
                  items={dataCategories || []}
                  label="Kategori"
                  placeholder="Pilih kategori"
                  variant="bordered"
                  isLoading={isLoadingCategories}
                  disabled={isLoadingCategories}
                  onChange={handleChangeCategory}
                  defaultSelectedKeys={[categoryFilterValue as string]}
                >
                  {(category: TCategory) => (
                    <SelectItem key={category?.id}>{category?.name}</SelectItem>
                  )}
                </Select>
              </CardBody>
            </Card>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoadingProducts
              ? Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-80 w-full rounded-md" />
                ))
              : null}
            {dataProducts?.data?.map((product: TProduct) => (
              <ProductCard key={product?.id} product={product} />
            ))}
            {dataProducts?.data.length === 0 && (
              <div className="text-center pt-8 col-span-3">
                <p className="text-foreground-500 text-lg font-bold">
                  Tidak ada produk yang ditemukan
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
