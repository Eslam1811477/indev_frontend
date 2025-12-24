import axios from "axios";
import { TOKEN_KEY } from "../consts";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_INDEV_API_URL,
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
