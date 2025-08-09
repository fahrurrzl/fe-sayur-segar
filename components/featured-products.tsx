"use client";

import ProductCard from "./product-card";

const featuredProducts = [
  {
    id: "1",
    name: "Kangkung Segar Organik",
    price: 5000,
    unit: "ikat",
    image: "/images/kangkung.jpg",
    seller: "Pak Budi",
    location: "Bogor",
    rating: 4.8,
    reviewCount: 124,
    discount: 15,
    isOrganic: true,
  },
  {
    id: "2",
    name: "Tomat Cherry Premium",
    price: 12000,
    unit: "250g",
    image: "/images/tomato-cherry.jpg",
    seller: "Bu Sari",
    location: "Bandung",
    rating: 4.9,
    reviewCount: 89,
    isOrganic: false,
  },
  {
    id: "3",
    name: "Wortel Baby Sweet",
    price: 8000,
    unit: "500g",
    image: "/images/wortel-baby.jpg",
    seller: "Tani Jaya",
    location: "Malang",
    rating: 4.7,
    reviewCount: 156,
    discount: 10,
    isOrganic: true,
  },
  {
    id: "4",
    name: "Selada Hijau Crispy",
    price: 6500,
    unit: "ikat",
    image: "/images/selada-hijau.jpg",
    seller: "Kebun Hijau",
    location: "Lembang",
    rating: 4.8,
    reviewCount: 67,
    isOrganic: true,
  },
  {
    id: "5",
    name: "Bayam Merah Segar",
    price: 4500,
    unit: "ikat",
    image: "/images/bayam-merah.jpg",
    seller: "Pak Tono",
    location: "Cianjur",
    rating: 4.6,
    reviewCount: 98,
    isOrganic: false,
  },
  {
    id: "6",
    name: "Brokoli Premium",
    price: 15000,
    unit: "pcs",
    image: "/images/brokoli.jpg",
    seller: "Highland Farm",
    location: "Dieng",
    rating: 4.9,
    reviewCount: 201,
    discount: 20,
    isOrganic: true,
  },
];

const FeatureProduct = () => {
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
          <button className="text-success hover:text-success-300 font-medium">
            Lihat Semua →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...(product as any)} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default FeatureProduct;
