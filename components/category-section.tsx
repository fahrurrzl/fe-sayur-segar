"use client";

import { Card, CardBody } from "@heroui/react";

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

const CategorySection = () => {
  const categories: Category[] = [
    { id: "1", name: "Sayuran Daun", icon: "🥬", count: 120 },
    { id: "2", name: "Sayuran Akar", icon: "🥕", count: 85 },
    { id: "3", name: "Sayuran Buah", icon: "🍅", count: 95 },
    { id: "4", name: "Bumbu Dapur", icon: "🧄", count: 65 },
    { id: "5", name: "Sayur Organik", icon: "🌱", count: 45 },
    { id: "6", name: "Herbs", icon: "🌿", count: 30 },
  ];

  return (
    <section id="categories" className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Kategori Sayuran
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200"
            >
              <CardBody className="p-4 text-center">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-medium text-sm text-foreground mb-1">
                  {category.name}
                </h3>
                <p className="text-xs text-foreground-500">
                  {category.count} produk
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
