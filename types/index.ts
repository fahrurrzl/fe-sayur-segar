import { SVGProps } from "react";

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
  id?: string;
  storeName: string;
  storeLocation: string;
  description?: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  verified?: boolean;
  user?: {
    name: string;
    email: string;
    image?: string;
    phone?: string;
  };
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
    userId: string;
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
      id?: string;
      storeLocation: string;
      storeName: string;
      SellerPaymentMethod?: {
        id: string;
        paymentMethodId: string;
        [key: string]: any;
      }[];
    };
    stock: number;
  };
  productId: string;
  quantity: number;
  updatedAt: string; // ISO date string
};

export type TUpdateUser = {
  name: string;
  email: string;
  address: string;
  phone: string;
};

export type TOrderInput = {
  address: string;
};

export interface OrderResponse {
  id: string;
  orderId: string;
  invoiceId: string;
  paymentUrl: string;
  payment_method: "BANK_TRANSFER" | "EWALLET" | "QRIS" | string;
  status: "PENDING" | "PAID" | "FAILED" | "EXPIRED" | string;
  totalPrice: number;
  shippingFee: number;
  address: string;
  createdAt: string;
  updatedAt: string;
  sellerId: string;
  userId: string;

  items: OrderItem[];
  seller: Seller;
  user: User;
}

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    imageUrl: string;
  };
}

export interface Seller {
  id: string;
  userId: string;
  storeName: string;
  storeLocation: string;
  verified: boolean;
  // kalau ada field lain tambahin di sini
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export type TCategory = {
  id?: string;
  name: string;
  imageUrl: string;
  products?: TProduct[];
};
