import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

export const refreshToken = async () => {
    try {
        const getRefreshToken = await AsyncStorage.getItem('refresh_token');

        if (!getRefreshToken) {
            console.log("refresh토큰이 없습니다.")
        }
        console.log(getRefreshToken);
        const response = await api.post(
            '/api/users/refresh/',
            { refresh_token: getRefreshToken }
        )
        console.log(response)
        const newAccessToken = response.data.token;
        console.log(newAccessToken)
        await AsyncStorage.setItem("access_token", newAccessToken);
        const getAccessToken = await AsyncStorage.getItem("access_token");
        return getAccessToken
    } catch (error) {
        console.log('에러', error.message) 
        //로그아웃 들어갈 부분
        return Promise.reject(error)
    }
}