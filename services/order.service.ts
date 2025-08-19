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
};
