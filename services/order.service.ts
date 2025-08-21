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
  getOrderUser: (token: string) =>
    instance.get(`${endpoint.ORDER}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getOrderSeller: (token: string) =>
    instance.get(`${endpoint.ORDER}/seller`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getOrderById: (id: string, token: string) =>
    instance.get(`${endpoint.ORDER}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getOrderByInvoiceId: (invoiceId: string, token: string) =>
    instance.get(`${endpoint.ORDER}/invoice/${invoiceId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  isProcessing: (id: string, token: string) =>
    instance.put(`${endpoint.ORDER}/process/${id}`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  isDelivered: (id: string, token: string) =>
    instance.put(`${endpoint.ORDER}/delivered/${id}`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  isCompleted: (id: string, token: string) =>
    instance.put(`${endpoint.ORDER}/completed/${id}`, undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
