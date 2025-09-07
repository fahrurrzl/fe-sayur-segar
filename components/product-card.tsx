"use client";

import useCart from "@/hooks/useCart";
import { TProductResponse } from "@/types/product";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { Card, CardBody, Chip, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaMapPin, FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const ProductCard = ({ product }: { product: TProductResponse }) => {
  const { name, price, imageUrl, seller } = product;
  const { mutateAddToCart, isPendingAddToCart } = useCart();
  // const discountedPrice = product.discount ? product.price - (product.price * product.discount) / 100 : product.price;

  return (
    <Card
      shadow="sm"
      className="group overflow-hidden hover:shadow-lg transition-all duration-300"
      as={Link}
      href={`/product/${product.id}`}
    >
      <div className="relative">
        <Image
          src={imageUrl}
          alt={name}
          width={500}
          height={500}
          className="w-full h-32 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* {discount && (
          <Chip className="absolute top-2 left-2 bg-danger text-white">
            -{discount}%
          </Chip>
        )} */}

        {/* <Chip
          size="sm"
          className="absolute top-2 right-2 bg-success text-white"
        >
          Organik
        </Chip> */}
      </div>

      <CardBody className="p-2">
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2">{name}</h3>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <FaStar className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-foreground-500">{4.9}</span>
              <span className="text-xs text-foreground-500">({100})</span>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-sm text-foreground-500">
            <FaMapPin className="w-3 h-3" />
            <span className="truncate">
              {seller?.storeName} • {seller?.storeLocation}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-success">
                {rupiahFormat(price)}
              </span>
              <span className="text-sm text-foreground-500">
                /{product?.Unit?.symbol}
              </span>
              {/* {discount && (
                <span className="text-sm text-foreground-500 line-through">
                  Rp {price.toLocaleString("id-ID")}
                </span>
              )} */}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
export default ProductCard;
