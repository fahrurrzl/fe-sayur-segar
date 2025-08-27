import instance from "@/lib/axios";
import endpoint from "./endpoint";
import { ITransfer } from "@/types/transfer";

export default {
  createTransfer: (payload: ITransfer, token: string) =>
    instance.post(endpoint.TRANSFER, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
