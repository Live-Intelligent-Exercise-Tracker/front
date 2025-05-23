import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteTokens, getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken } from '../../screens/auth/Login/secureStorage';
import Toast from 'react-native-toast-message';

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password, navigation }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/login/", { email, password })
      console.log(response.data)

      const accessToken = response.data.token
      const refreshToken = response.data.refresh_token
      if (accessToken) {
        await AsyncStorage.setItem('access_token', accessToken);
      }
      if (refreshToken) {
        await AsyncStorage.setItem('refresh_token', refreshToken);
      }

      navigation.replace("MainTabNavigator");
      Toast.show({
        type: 'customToast',
        props: { text1: '로그인 성공!' }
      })

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "로그인 실패");
    }
  }
)

export const logout = async () => {
  try {
    const refreshToken = await getRefreshToken();

    const response = await api.post("/api/users/logout/", { refresh_token: refreshToken })

    await deleteTokens();
  } catch (error) {
    console.error(error.response.data.message);
  }
}

// [자동로그인 관련 추후수정사항2]
// 엑세스 유무 필드 추가
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    loginError: null,
  },
  reducers: {
    clearError: (state) => {
      state.loginError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
  },
})

export const { clearError } = userSlice.actions;
export default userSlice.reducer;