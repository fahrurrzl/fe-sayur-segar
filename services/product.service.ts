import instance from "@/lib/axios";
import endpoint from "./endpoint";
import { TProductInput } from "@/types/product";

export default {
  create: (payload: TProductInput, token: string) =>
    instance.post(endpoint.PRODUCT, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getProducts: (params: string) =>
    instance.get(`${endpoint.PRODUCT}?${params}`),
  getProductById: (id: string) => instance.get(`${endpoint.PRODUCT}/${id}`),
  update: (id: string, payload: TProductInput, token: string) =>
    instance.put(`${endpoint.PRODUCT}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  destroy: (id: string, token: string) =>
    instance.delete(`${endpoint.PRODUCT}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  adminDelete: (id: string, token: string) =>
    instance.delete(`${endpoint.PRODUCT}/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
