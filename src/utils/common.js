import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

export const refreshToken = async () => {
    try {
        const getRefreshToken = await AsyncStorage.getItem('refresh_token');

        if (!getRefreshToken) {
            console.log("refresh토큰이 없습니다.")
        }
        console.log(getRefreshToken);
        const response = await axios.post(
            '/api/users/refresh/',
            { refresh_token: getRefreshToken },
        )
        console.log(response)
        const newAccessToken = response.data.token;
        console.log(newAccessToken)
        await AsyncStorage.setItem("access_token", newAccessToken);
        const getAccessToken = await AsyncStorage.getItem("access_token");
        console.log("새 access토큰 저장성공", getAccessToken)
        return getAccessToken
    } catch (error) {
        console.log('리프레시 토큰 기간 만료', error.message) //refresh토큰 기간 만료
        return Promise.reject(error)
    }
}