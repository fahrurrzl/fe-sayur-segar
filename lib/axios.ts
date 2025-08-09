import axios, { AxiosError } from "axios";
import { getSession } from "next-auth/react";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export function setAuthToken(token: string | null) {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
}

instance.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") return config; // hanya di client
  const session = await getSession();
  const token =
    (session as any)?.accessToken ?? (session as any)?.user?.accessToken;
  if (token && config.headers)
    config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default instance;
