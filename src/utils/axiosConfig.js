import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
export const authAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add interceptor
authAxiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access_token");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Add a response interceptor || Middleware for 401
authAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => console.log(error)
);
