"use client";

import useCategory from "@/hooks/useCateogry";
import { TCategory } from "@/types/category";
import { Card, CardBody, Skeleton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const CategorySection = () => {
  const { dataCategories, isLoadingCategories } = useCategory();

  return (
    <section id="categories" className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Kategori Sayuran
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {isLoadingCategories ? (
            <>
              {Array.from({ length: 6 }, (_, index) => (
                <Skeleton key={index} className="w-full h-[180px] rounded-lg" />
              ))}
            </>
          ) : null}
          {dataCategories?.categories?.map((category: TCategory) => (
            <Card
              shadow="sm"
              as={Link}
              href={`/explore?category=${category.id}`}
              key={category.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <CardBody className="p-4 text-center">
                <div className="text-3xl flex justify-center group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={category.imageUrl}
                    alt="category"
                    width={80}
                    height={80}
                    className="object-contain aspect-square rounded-md"
                  />
                </div>
                <h3 className="font-medium text-sm text-foreground mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-foreground-500">
                  {category.products?.length} produk
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default CategorySection;
