"use client";

import useProduct from "@/hooks/useProduct";
import ProductCard from "./product-card";
import { Button, Skeleton } from "@heroui/react";
import Link from "next/link";
import { TProduct } from "@/types/product";

const FeatureProduct = () => {
  const { dataProducts, isLoadingProducts } = useProduct();

  return (
    <section id="products" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Produk Unggulan
            </h2>
            <p className="text-foreground-500">
              Sayuran pilihan terbaik hari ini
            </p>
          </div>
          <Button
            as={Link}
            href="/explore"
            variant="light"
            color="success"
            className="hover:text-success-300 font-medium"
          >
            Lihat Semua →
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {isLoadingProducts && (
            <>
              {Array.from({ length: 4 }, (_, index) => (
                <Skeleton key={index} className="w-full h-[360px] rounded-lg" />
              ))}
            </>
          )}
          {dataProducts?.data.map((product: TProduct) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeatureProduct;
