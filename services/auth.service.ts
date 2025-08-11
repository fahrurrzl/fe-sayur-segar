import instance from "@/lib/axios";
import endpoint from "./endpoint";
import { TLogin, TRegister } from "@/types";

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
};
