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

export type TProduct = {
  name: string;
  price: number;
  stock: number;
  categoryId: string;
  description: string;
  imageUrl: string | FileList;
};
