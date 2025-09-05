import instance from "@/lib/axios";
import endpoint from "./endpoint";
import { TSeller } from "@/types/seller";

export default {
  create: (payload: TSeller, token: string) =>
    instance.post(endpoint.SELLER, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  update: (payload: TSeller, token: string) =>
    instance.put(endpoint.SELLER, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  me: (token: string, params: string) =>
    instance.get(`${endpoint.SELLER}/me?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  index: (token: string, params: string) =>
    instance.get(`${endpoint.SELLER}?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getSellerById: (id: string, token: string) =>
    instance.get(`${endpoint.SELLER}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateVerified: (id: string, token: string) =>
    instance.put(`${endpoint.SELLER}/verify/${id}`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  adminDeleteSeller: (id: string, token: string) =>
    instance.delete(`${endpoint.SELLER}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
