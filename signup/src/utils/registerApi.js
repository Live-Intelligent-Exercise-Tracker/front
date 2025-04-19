import axios from "axios";
import { Platform } from "react-native";

const API_BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:8000" // Android 에뮬레이터에서는 이렇게 설정
    : "http://127.0.0.1:8000"; // iOS 및 웹에서는 이렇게 설정

const registerApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 세션을 유지하기 위해 필요
});

registerApi.interceptors.request.use(function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  }, function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  });

// 응답 인터셉터 추가하기
registerApi.interceptors.response.use(function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    console.log("response!!",response);
    return response;
  }, function (error) {
    console.log("error!!",error);
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  });

export default registerApi