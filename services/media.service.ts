import instance from "@/lib/axios";
import endpoint from "./endpoint";

export default {
  upload: (payload: FormData, token: string) =>
    instance.post(`${endpoint.MEDIA}/upload`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }),
  remove: (fileUrl: string, token: string) =>
    instance.delete(`${endpoint.MEDIA}/delete`, {
      data: {
        fileUrl,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
