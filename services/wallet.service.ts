import instance from "@/lib/axios";
import endpoint from "./endpoint";

export default {
  create: (token: string) =>
    instance.post(endpoint.WALLET, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getBalance: (token: string) =>
    instance.get(`${endpoint.WALLET}/balance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
