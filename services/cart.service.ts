import instance from "@/lib/axios";
import endpoint from "./endpoint";
import { TCart } from "@/types";

export default {
  addToCart: (payload: TCart, token: string) =>
    instance.post(endpoint.CART, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getCarts: (token: string) =>
    instance.get(endpoint.CART, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
