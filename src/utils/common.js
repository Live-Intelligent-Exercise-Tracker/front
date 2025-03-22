import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { logout } from '../redux/slices/userSlice';
import { useDispatch } from 'react-redux';

export const refreshToken = async () => {
    const dispatch = useDispatch()
    try {
        // AsyncStorage에서 refreshToken 가져오기
        const getRefreshToken = await AsyncStorage.getItem('refresh_token');

        if (!getRefreshToken) {
            console.log("refresh토큰이 없습니다.")
        }

        const response = await axios.post('api/users/refresh/', {}, {
            headers: {
                Authorization: `Bearer ${getRefreshToken}`,
            }
        })
        console.log("refreshtoken으로 access토큰 발급", response.data) //새 access토큰 저장
        await AsyncStorage.setItem("access_token", response.data.token);
        const getAccessToken = await AsyncStorage.getItem("access_token");
        console.log("새 access토큰 저장성공", getAccessToken)
        return getAccessToken
    } catch (error) {
        console.log('리프레시 토큰 기간 만료', error.error) //refresh토큰 기간 만료
        dispatch(logout())
        return Promise.reject(error)
    }
}