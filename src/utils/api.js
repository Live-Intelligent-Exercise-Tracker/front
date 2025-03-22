import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from "./common";
import { logout } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const dispatch = useDispatch()

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

// ✅ 요청 인터셉터 (Access Token 요청 헤더에 추가, 로그인 데이터 가져오기)
api.interceptors.request.use(
  async (config) => {
    const access_token = await AsyncStorage.getItem("access_token");
    if (access_token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터 (Access Token 만료 시 Refresh Token으로 재발급)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      console.error("🚨 [Axios] 서버 응답 없음:", error.error);
      alert("서버에 연결할 수 없습니다. 네트워크 상태를 확인해주세요.");
      return Promise.reject("서버에 연결할 수 없습니다.");
    }

    if (error.response.status === 400) {
      console.error("🚨 [Axios] 400 Unauthorized", error.error);
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      return Promise.reject("아이디 또는 비밀번호가 일치하지 않습니다.");
    }

    if (error.response.status === 404) {
      console.error("🚨 [Axios] 404 Unauthorized", error.error);
      alert("존재하지 않는 아이디입니다.");
      return Promise.reject("존재하지 않는 아이디입니다.");
    }

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      console.log("엑세스 토큰 만료", error.error)
      let newAccessToken = await refreshToken()
      console.log("새로운 엑세스 토큰", newAccessToken)
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
      if (error.response) {
        const errorCode = error.response.date.code;
        const errorMessage = error.response.data.message;
        let newAccessToken;
        switch (errorCode) {
          case "401":
            console.log("토큰 만료")
            dispatch(logout())
            break;
          case "404":

        }
        console.error("🚨 [Axios] 서버 응답 없음:", error.message);
        alert(error.message);

        return Promise.reject("서버에 연결할 수 없습니다.");
      }

      try {
        // ✅ 새로운 Access Token 요청 (서버에서 세션 사용)
        const refreshResponse = await axios.post(
          `/api/users/refresh`,
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