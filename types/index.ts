import { productSchema } from "@/schemas/product.schema";
import { SVGProps } from "react";
import { z } from "zod";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type TRegister = {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TSeller = {
  storeName: string;
  storeLocation: string;
  bankAccount: string;
  bankName: string;
};

export type TProductInput = {
  id?: string;
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  description: string;
  imageUrl: string;
};

export type TProduct = Omit<TProductInput, "imageUrl"> & {
  id: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  seller: {
    sellerId: string;
    storeLocation: string;
    storeName: string;
  };
};

export type TProductResponse = TProduct;

export type TCart = {
  productId: string;
  quantity: number;
  price: number;
};

export type TCartItem = {
  cartId: string;
  createdAt: string; // ISO date string
  id: string;
  price: number;
  product: {
    imageUrl: string;
    name: string;
    seller: {
      storeLocation: string;
      storeName: string;
    };
    stock: number;
  };
  productId: string;
  quantity: number;
  updatedAt: string; // ISO date string
};
