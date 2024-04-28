import useCookie from "@/hooks/useCookie";
import axios from "axios";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
  (config) => {
    const { getCookie } = useCookie();

    const authToken = getCookie("authToken");

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
