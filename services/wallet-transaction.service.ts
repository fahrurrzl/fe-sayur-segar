import instance from "@/lib/axios";
import endpoint from "./endpoint";

export default {
  getWalletTransactions: (token: string) =>
    instance.get(endpoint.WALLET_TRANSACTION, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getAllWalletTransacions: (token: string) =>
    instance.get(`${endpoint.WALLET_TRANSACTION}/superadmin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getWalletTransactionById: (id: string, token: string) =>
    instance.get(`${endpoint.WALLET_TRANSACTION}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  createWalletTransaction: (payload: { amount: number }, token: string) =>
    instance.post(
      endpoint.WALLET_TRANSACTION,
      {
        amount: payload.amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
};
