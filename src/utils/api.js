import axios from "axios";
import { Platform, Alert } from "react-native";
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
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;
    const status = error.response.status;
    const errorMessage = error.response.data.message

      switch (status) {
        case 400:
          console.warn(errorMessage);
          Alert.alert(
            errorMessage,
            undefined,
            [
              { text: "확인", onPress: () => console.log("확인 버튼 눌림") }
            ]
          )
          break;
        case 401:
          console.warn("엑세스 토큰 기간 만료", errorMessage);
          const newAccessToken = await refreshToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        case 404:
          console.warn(errorMessage);
          Alert.alert(
            errorMessage,
            undefined,
            [
              { text: "확인", onPress: () => console.log("확인 버튼 눌림") }
            ]
          )
          break;
        default:
          console.error(`🚨 [Axios] ${status} 오류 발생:`, errorMessage);
          Alert.alert(
            `error code ${status}`,
            undefined,
            [
              { text: "확인", onPress: () => console.log("확인 버튼 눌림") }
            ]
          )
      }

    return Promise.reject(error);
  }
);

export default api;