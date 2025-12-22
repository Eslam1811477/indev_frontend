import axios from "axios";
import { TOKEN_KEY } from "../auth/keys";

const axiosInstance = axios.create({
  baseURL: "/",
  withCredentials: false, 
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
