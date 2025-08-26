import instance from "@/lib/axios";
import endpoint from "./endpoint";

export default {
  getWalletTransactions: (token: string) =>
    instance.get(endpoint.WALLET_TRANSACTION, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
