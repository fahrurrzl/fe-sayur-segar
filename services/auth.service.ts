import instance from "@/lib/axios";
import endpoint from "./endpoint";
import { TLogin, TRegister, TUpdateUser } from "@/types";
import { TChangePassword } from "@/types/auth";

export default {
  register: (payload: TRegister) =>
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
  updateUser: (payload: TUpdateUser, token: string) =>
    instance.put(`${endpoint.AUTH}/update`, payload, {
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
};
