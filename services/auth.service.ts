import instance from "@/lib/axios";
import endpoint from "./endpoint";
import { TRegister } from "@/types";

export default {
  register: (payload: TRegister) =>
    instance.post(`${endpoint.AUTH}/register`, payload),
};
