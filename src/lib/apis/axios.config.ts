import axios from "axios";
import { toast } from "sonner";

const locale = localStorage.getItem("app-locale");

const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://fitness.elevateegy.com/api/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "accept-language": locale,
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response.data.error);
    return Promise.reject(error);
  }
);

export default apiClient;
