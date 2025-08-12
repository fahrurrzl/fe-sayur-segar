import instance from "@/lib/axios";
import endpoint from "./endpoint";
import { TSeller } from "@/types";

export default {
  create: (payload: TSeller, token: string) =>
    instance.post(endpoint.SELLER, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  me: (token: string) =>
    instance.get(`${endpoint.SELLER}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
