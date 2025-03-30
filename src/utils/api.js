import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveToken, getToken, deleteToken } from "../screens/auth/Login/secureStorage";
import { refreshToken } from "./common";

const API_BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:5000/"  // Android 에뮬레이터에서는 이렇게 설정
    : "http://127.0.0.1:8000/"; // iOS 및 웹에서는 이렇게 설정

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 세션을 유지하기 위해 필요
});

api.interceptors.request.use(
  async (config) => {
    const noAuthRoutes = ["/api/users/refresh/"];
    if (noAuthRoutes.includes(config.url)) {
      return config;
    }
    const access_token = await AsyncStorage.getItem("access_token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      console.error(error.message);
      alert("서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
      return Promise.reject("서버에 연결할 수 없습니다.");
    }
    
    const originalRequest = error.config;
    const status = error.response.status;
    const errorMessage = error.response.data.message

    switch (status) {
      case 400:
        console.warn(errorMessage);
        alert(errorMessage);
        break;
      case 401:
        console.warn("401 Unauthorized", errorMessage);
        if (!originalRequest._retry) {
          originalRequest._retry = true;
          const newAccessToken = await refreshToken();
          if (newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        }
        break;
      case 404:
        console.warn(errorMessage);
        alert(errorMessage);
        break;
      default:
        console.error(`🚨 [Axios] ${status} 오류 발생:`, error.response.data);
        alert("요청을 처리하는 중 오류가 발생했습니다.");
    }
  }
);

export default api;