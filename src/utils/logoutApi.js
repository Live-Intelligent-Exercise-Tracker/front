import axios from "axios";
import { Platform } from "react-native";

const API_BASE_URL =
    Platform.OS === "android"
        ? "http://10.0.2.2:5000/"  // Android 에뮬레이터에서는 이렇게 설정
        : "http://127.0.0.1:8000/"; // iOS 및 웹에서는 이렇게 설정

const logoutApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

logoutApi.interceptors.request.use(
    async (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

logoutApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error.response.status;
        const errorMessage = error.response.data.message
        switch (status) {
            case 400:
                console.warn(errorMessage);
                break;
            default:
                console.error(`🚨 [Axios] ${status} 오류 발생:`, errorMessage);
        }

        return Promise.reject(error);
    }
)

export default logoutApi