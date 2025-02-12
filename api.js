import axios from "axios";
import { Platform } from "react-native";

const API_BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:5000/"  // Android 에뮬레이터에서는 이렇게 설정
    : "http://127.0.0.1:5000/"; // iOS 및 웹에서는 이렇게 설정

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // JWT 토큰 저장
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;