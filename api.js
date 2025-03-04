import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:5000/"  // Android 에뮬레이터에서는 이렇게 설정
    : "http://127.0.0.1:5000/"; // iOS 및 웹에서는 이렇게 설정

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 세션을 유지하기 위해 필요
});

// ✅ 요청 인터셉터 (Access Token 추가)
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token"); // MMKV에서 Access Token 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터 (Access Token 만료 시 Refresh Token으로 재발급)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        // ✅ 새로운 Access Token 요청 (서버에서 세션 사용)
        const refreshResponse = await axios.post(
          `${API_BASE_URL}auth/refresh`,
          {},
          { withCredentials: true } // 서버 세션과 연동
        );

        const newAccessToken = refreshResponse.data.token;
        await AsyncStorage.setItem("token", newAccessToken); // 새로운 Access Token 저장

        // ✅ 요청 헤더에 새로운 Access Token 추가 후 재요청
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        await AsyncStorage.removeItem("token");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;