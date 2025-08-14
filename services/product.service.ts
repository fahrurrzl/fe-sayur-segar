import instance from "@/lib/axios";
import endpoint from "./endpoint";

export default {
  create: (payload: any, token: string) =>
    instance.post(endpoint.PRODUCT, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getProducts: () => instance.get(endpoint.PRODUCT),
  getProductById: (id: string) => instance.get(`${endpoint.PRODUCT}/${id}`),
};
