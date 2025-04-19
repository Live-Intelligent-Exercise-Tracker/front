import axios from "axios";
import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from "../redux/slices/userSlice";
import { navigate } from "../navigation/RootNavigator";

const API_BASE_URL =
    Platform.OS === "android"
        ? "http://10.0.2.2:5000/"  // Android 에뮬레이터에서는 이렇게 설정
        : "http://127.0.0.1:8000/"; // iOS 및 웹에서는 이렇게 설정

const tokenApi = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

tokenApi.interceptors.request.use(
    async (config) => {
        const access_token = await AsyncStorage.getItem("access_token");
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
)

tokenApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error.response.status;
        const errorMessage = error.response.data.message
        switch (status) {
            case 400:
                console.warn(errorMessage);
                alert(errorMessage);
                break;
            case 401:
                console.warn(errorMessage);
                alert(errorMessage);
                // 리프레시 토큰 만료 로그아웃 처리
                await logout();
                navigate("Login");
                break;
            default:
                console.error(`🚨 [Axios] ${status} 오류 발생:`, errorMessage);
        }

        return Promise.reject(error);
    }
)

export default tokenApi;