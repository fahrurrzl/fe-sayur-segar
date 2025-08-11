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
