import instance from "@/lib/axios";
import endpoint from "./endpoint";
import { IUnit } from "@/types/unit";

export default {
  getUnits: () => instance.get(endpoint.UNIT),
  createUnit: (payload: IUnit, token: string) =>
    instance.post(endpoint.UNIT, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateUnit: (payload: IUnit, id: string, token: string) =>
    instance.put(`${endpoint.UNIT}/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  deleteUnit: (id: string, token: string) =>
    instance.delete(`${endpoint.UNIT}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getUnitById: (id: string) => instance.get(`${endpoint.UNIT}/${id}`),
};
