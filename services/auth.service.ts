import instance from "@/lib/axios";
import endpoint from "./endpoint";
import {
  IRegister,
  IUpdatePhoto,
  IUpdateUser,
  TChangePassword,
  TLogin,
} from "@/types/auth";

export default {
  register: (payload: IRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
  login: (payload: TLogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  getUserByToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getUserById: (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateUser: (payload: IUpdateUser, token: string) =>
    instance.put(`${endpoint.AUTH}/update`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updatePhoto: (payload: IUpdatePhoto, token: string) =>
    instance.put(`${endpoint.AUTH}/update-photo`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  changePassword: (payload: TChangePassword, token: string) =>
    instance.put(`${endpoint.AUTH}/change-password`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  activation: (code: string) =>
    instance.post(`${endpoint.AUTH}/activation?code=${code}`, {
      code,
    }),
};
