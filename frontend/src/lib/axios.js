import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://store-management-system-api.onrender.com",
});

// Attaching the token to the request headers automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
