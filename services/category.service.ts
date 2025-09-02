import instance from "@/lib/axios";
import endpoint from "./endpoint";
import { TCategory } from "@/types/category";

export default {
  getCategoriesAdmin: (params: string) =>
    instance.get(`${endpoint.CATEGORY}?${params}`),
  getCategoriesLanding: () => instance.get(endpoint.CATEGORY),
  getCategoryById: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),
  create: (payload: TCategory, token: string) =>
    instance.post(endpoint.CATEGORY, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  update: (id: string, payload: TCategory, token: string) =>
    instance.put(`${endpoint.CATEGORY}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  destroy: (id: string, token: string) =>
    instance.delete(`${endpoint.CATEGORY}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
