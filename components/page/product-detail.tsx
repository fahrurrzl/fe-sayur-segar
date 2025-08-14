"use client";

import { TProduct } from "@/types";
import { rupiahFormat } from "@/utils/rupiahFormat";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import {
  FaArrowLeft,
  FaClock,
  FaMapPin,
  FaShieldAlt,
  FaShoppingCart,
  FaStar,
  FaTruck,
} from "react-icons/fa";

const ProductDetail = ({ product }: { product: TProduct }) => {
  const { name, price, stock, imageUrl, seller, description } = product;
  const router = useRouter();

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button
        variant="light"
        className="mb-6"
        onPress={() => router.push("/")}
        startContent={<FaArrowLeft className="w-4 h-4" />}
      >
        Kembali
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-96 object-cover"
            />
            {false && (
              <Chip
                className="absolute top-4 left-4"
                color="danger"
                variant="solid"
                size="sm"
              >
                -{15}%
              </Chip>
            )}
            {false && (
              <Chip
                className="absolute top-4 right-4"
                color="success"
                variant="solid"
                size="sm"
              >
                Organik
              </Chip>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{name}</h1>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <FaStar className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-lg font-medium">{4.8}</span>
                <span className="text-muted-foreground">(124 ulasan)</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-muted-foreground mb-6">
              <FaMapPin className="w-4 h-4" />
              <span>
                {seller.storeName} • {seller.storeLocation}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-fresh">
                {rupiahFormat(price)}
              </span>
              <span className="text-lg text-muted-foreground">/{"ikat"}</span>
              {false && (
                <span className="text-lg text-muted-foreground line-through">
                  {rupiahFormat(price)}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            className="w-full text-white"
            size="lg"
            color="success"
            startContent={<FaShoppingCart className="w-5 h-5" />}
          >
            Tambah ke Keranjang
          </Button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="text-center">
              <FaTruck className="w-6 h-6 mx-auto mb-2 text-success" />
              <span className="text-sm text-muted-foreground">
                Gratis Ongkir
              </span>
            </div>
            <div className="text-center">
              <FaShieldAlt className="w-6 h-6 mx-auto mb-2 text-success" />
              <span className="text-sm text-muted-foreground">
                Jaminan Segar
              </span>
            </div>
            <div className="text-center">
              <FaClock className="w-6 h-6 mx-auto mb-2 text-success" />
              <span className="text-sm text-muted-foreground">Same Day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Description */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <CardHeader className="px-0 pt-0">
              <h3 className="text-xl font-semibold">Deskripsi Produk</h3>
            </CardHeader>
            <CardBody className="px-0">
              <p className="text-default-600 leading-relaxed mb-6">
                {description}
              </p>

              <Divider className="my-6" />

              <h4 className="font-semibold mb-3">Manfaat Kesehatan</h4>
              <ul className="space-y-2">
                {[
                  "Mencegah penyakit jantung",
                  "Mencegah penyakit diabetes",
                  "Mencegah penyakit kanker",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full" />
                    <span className="text-default-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </div>

        {/* Product Specs */}
        <div>
          <Card className="p-6">
            <CardHeader className="px-0 pt-0">
              <h3 className="text-xl font-semibold">Spesifikasi</h3>
            </CardHeader>
            <CardBody className="px-0">
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-default-500">
                    Berat
                  </span>
                  <p className="text-foreground">200-250g per ikat</p>
                </div>
                <Divider />
                <div>
                  <span className="text-sm font-medium text-default-500">
                    Penyimpanan
                  </span>
                  <p className="text-foreground">
                    Simpan di kulkas, tahan 3-4 hari
                  </p>
                </div>
                <Divider />
                <div>
                  <span className="text-sm font-medium text-default-500">
                    Jenis
                  </span>
                  <p className="text-foreground">{"Organik"}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
