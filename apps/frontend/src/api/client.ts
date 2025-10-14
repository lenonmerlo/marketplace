import axios, { AxiosHeaders } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  withCredentials: false, 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    if (!config.headers) config.headers = new AxiosHeaders();
    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem("authToken");
      if (!location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);
