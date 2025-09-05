"use client";

import { SearchIcon } from "@/components/icons";
import ProductCard from "@/components/product-card";
import useCategory from "@/hooks/useCateogry";
import useChangeUrl from "@/hooks/useChangeUrl";
import useProduct from "@/hooks/useProduct";
import { TCategory } from "@/types/category";
import { TProduct } from "@/types/product";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Pagination,
  Select,
  SelectItem,
  Skeleton,
} from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Explore = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");
  const categoryFilterValue = searchParams.get("category");
  const { dataCategories, isLoadingCategories } = useCategory();
  const { dataProducts, isLoadingProducts } = useProduct();

  const {
    setUrl,
    handleChangePage,
    handleChangeCategory,
    handleChangeSearch,
    handleClearSearch,
  } = useChangeUrl();

  useEffect(() => {
    setUrl();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6 gap-2">
          <div>
            <h1 className="text-lg lg:text-2xl font-bold text-foreground">
              Jelajahi Sayur Segar
            </h1>
            <p className="text-foreground-500 text-xs lg:text-base">
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
              defaultValue={searchValue as string}
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
                  items={dataCategories?.categories || []}
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
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoadingProducts
                ? Array.from({ length: 3 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="w-full lg:h-[300px] h-[250px] rounded-lg"
                    />
                  ))
                : null}
              {dataProducts?.data?.products?.map((product: TProduct) => (
                <ProductCard key={product?.id} product={product} />
              ))}
              {dataProducts?.data?.products?.length === 0 && (
                <div className="text-center pt-8 col-span-3">
                  <p className="text-foreground-500 text-lg font-bold">
                    Tidak ada produk yang ditemukan
                  </p>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-end">
              <Pagination
                color="success"
                classNames={{
                  cursor: "bg-success text-white",
                }}
                size="sm"
                showControls
                page={dataProducts?.data?.currentPage}
                total={dataProducts?.data?.totalPage}
                onChange={handleChangePage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
