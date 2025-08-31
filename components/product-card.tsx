"use client";

import useCart from "@/hooks/useCart";
import { TProductResponse } from "@/types";
import { rupiahFormat } from "@/utils/rupiahFormat";
import { Badge, Button, Card, CardBody, Chip, Spinner } from "@heroui/react";
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
      className="group overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-105"
      as={Link}
      href={`/product/${product.id}`}
    >
      <div className="relative">
        <Image
          src={imageUrl}
          alt={name}
          width={500}
          height={500}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {/* {discount && (
          <Chip className="absolute top-2 left-2 bg-danger text-white">
            -{discount}%
          </Chip>
        )} */}
        {/* {isOrganic && (
          <Chip className="absolute top-2 right-2 bg-success text-white">
            Organik
          </Chip>
        )} */}
      </div>

      <CardBody className="p-4">
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

          {/* <button
            className="w-full mt-3 text-white bg-success hover:bg-success-400 transition-colors duration-300 rounded-lg cursor-pointer flex items-center justify-center py-2 px-4 gap-1"
            disabled={isPendingAddToCart}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              mutateAddToCart({
                payload: {
                  productId: product.id,
                  quantity: 1,
                  price: product.price,
                },
              });
            }}
          >
            {isPendingAddToCart ? (
              <Spinner size="sm" color="white" />
            ) : (
              <FiShoppingCart className="w-4 h-4 mr-2" />
            )}
            Tambah ke Keranjang
          </button> */}
        </div>
      </CardBody>
    </Card>
  );
};
export default ProductCard;
