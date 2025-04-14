import axios from "axios";
import { Platform, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from "./common";
import { logout } from "../redux/slices/userSlice";
import { navigate } from "../navigation/RootNavigator";

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
    const access_token = await AsyncStorage.getItem("access_token");
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) { // 네트워크 연결 불가로 인한 에러
      console.error(error.message);
      Alert.alert(
        "서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.",
        undefined,
        [
          { text: "확인", onPress: () => console.log("확인 버튼 눌림") }
        ]
      )
      return Promise.reject("서버에 연결할 수 없습니다.");
    }

    const originalRequest = error.config;
    const status = error.response.status;
    const errorMessage = error.response.data.message

    if (originalRequest.url.includes("/login")) { // 로그인 post 에러
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
    }

    if (originalRequest.url.includes("/logout")) { // 로그아웃 post 에러
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
    }

    if (originalRequest.url.includes("/refresh")) { // 엑세스 토큰 재발급 post 에러
      switch (status) {
        case 400:
          console.warn(errorMessage);
          break;
        case 401:
          console.warn(errorMessage);
          await logout();
          navigate("Login");
          break;
        default:
          console.error(`🚨 [Axios] ${status} 오류 발생:`, errorMessage);
      }
    }

    return Promise.reject(error);
  }
);

export default api;