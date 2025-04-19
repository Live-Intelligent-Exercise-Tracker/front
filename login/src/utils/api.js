import axios from "axios";
import { Platform, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from "./common";
import { logout } from "../redux/slices/userSlice";
import { navigate } from "../navigation/RootNavigator";

const API_BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:5000/"  
    : "http://127.0.0.1:8000/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const url = config.url?.split("?")[0]; // 안전하게 쿼리 제거

    const publicEndpoints = [
      "/login/",
      "/register/",
      "/logout/",
      "/refresh/",
      "/checkemail/",
      "/checknickname/",
    ];

    const isPublicAPI = publicEndpoints.some((endpoint) =>
      url?.endsWith(endpoint)
    );

    if (!isPublicAPI) {
      const access_token = await AsyncStorage.getItem("access_token");
      if (access_token) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);



api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest.url;

    // 토큰 만료로 401 뜨는 경우 → 자동 로그아웃 or 재발급
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !url.includes("/login/") &&
      !url.includes("/register/") &&
      !url.includes("/logout/")
    ) {
      originalRequest._retry = true;

      // refresh 로직 or 그냥 로그아웃
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("refresh_token");

      Alert.alert("세션이 만료되었습니다", "다시 로그인해주세요.");
      navigate("Login");

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;