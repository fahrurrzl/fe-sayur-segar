import instance from "@/lib/axios";
import endpoint from "./endpoint";

export default {
  create: (token: string) =>
    instance.post(endpoint.WALLET, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
