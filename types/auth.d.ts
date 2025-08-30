export interface IRegister {
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface IUpdateUser
  extends Omit<IRegister, "password" | "confirmPassword"> {
  gender: string;
  birthDate: string;
  photo?: string;
}

export type TLogin = {
  email: string;
  password: string;
};

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};
