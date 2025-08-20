import instance from "@/lib/axios";
import { TOrderInput } from "@/types";
import endpoint from "./endpoint";

export default {
  create: (payload: TOrderInput, token: string) =>
    instance.post(endpoint.ORDER, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getOrderUser: (token: string) =>
    instance.get(`${endpoint.ORDER}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getOrderSeller: (token: string) =>
    instance.get(`${endpoint.ORDER}/seller`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
