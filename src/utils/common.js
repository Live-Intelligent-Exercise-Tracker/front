import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export const refreshToken = async () => {
    try {
        const getRefreshToken = await AsyncStorage.getItem('refresh_token');

        if (!getRefreshToken) {
            console.log("refresh토큰이 없습니다.")
        }

        const response = await api.post(
            '/api/users/refresh/',
            { getRefreshToken }
        )

        const newAccessToken = response.data.token;

        await AsyncStorage.setItem("access_token", newAccessToken);
        const getAccessToken = await AsyncStorage.getItem("access_token");
        return getAccessToken
    } catch (error) {
        console.error(error.message)
    }
}