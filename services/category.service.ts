import instance from "@/lib/axios";
import endpoint from "./endpoint";

export default {
  getCategories: () => instance.get(endpoint.CATEGORY),
};
