import axios from "axios";
import { Platform, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from "./common";
import { loginUser, logout } from "../redux/slices/userSlice";
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
      "/checkDup/"
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

// import axios from "axios";
// import { Platform, Alert } from "react-native";
// import { refreshToken } from "./common";

// const API_BASE_URL =
//   Platform.OS === "android"
//     ? "http://10.0.2.2:5000/"  // Android 에뮬레이터에서는 이렇게 설정
//     : "http://127.0.0.1:8000/"; // iOS 및 웹에서는 이렇게 설정

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   async (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {

//     const originalRequest = error.config;
//     const status = error.response.status;
//     const errorMessage = error.response.data.message

//       switch (status) {
//         case 400:
//           console.warn(errorMessage);
//           Alert.alert(
//             errorMessage,
//             undefined,
//             [
//               { text: "확인", onPress: () => console.log("확인 버튼 눌림") }
//             ]
//           )
//           break;
//         case 401:
//           console.warn("엑세스 토큰 기간 만료", errorMessage);
//           const newAccessToken = await refreshToken();
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return api(originalRequest);
//         case 404:
//           console.warn(errorMessage);
//           Alert.alert(
//             errorMessage,
//             undefined,
//             [
//               { text: "확인", onPress: () => console.log("확인 버튼 눌림") }
//             ]
//           )
//           break;
//         default:
//           console.error(`🚨 [Axios] ${status} 오류 발생:`, errorMessage);
//           Alert.alert(
//             `error code ${status}`,
//             undefined,
//             [
//               { text: "확인", onPress: () => console.log("확인 버튼 눌림") }
//             ]
//           )
//       }

//     return Promise.reject(error);
//   }
// );

// export default api

