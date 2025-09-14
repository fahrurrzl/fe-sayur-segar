import instance from "@/lib/axios";
import endpoint from "./endpoint";

export default {
  getUsers: async (params: string, token: string) =>
    instance.get(`${endpoint.USER}?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getUser: async (id: string) => instance.get(`${endpoint.USER}/${id}`),
  deleteUser: async (id: string, token: string) =>
    instance.delete(`${endpoint.USER}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
