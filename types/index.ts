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
  storeName: string;
  storeLocation: string;
  bankAccount: string;
  bankName: string;
};
