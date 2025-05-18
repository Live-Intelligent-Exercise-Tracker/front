import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteTokens, getAccessToken, getRefreshToken, saveAccessToken, saveRefreshToken } from '../../screens/auth/Login/secureStorage';

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/login/", { email, password })
      console.log(response.data)

      const accessToken = response.data.token
      const refreshToken = response.data.refresh_token
      if(accessToken){
        await saveAccessToken(accessToken)
      }
      if(refreshToken){
        await saveRefreshToken(refreshToken);
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const logout = async () => {
  try {
    const refreshToken = await getRefreshToken();

    const response = await api.post("/api/users/logout/", { refresh_token: refreshToken })

    await deleteTokens();
  } catch (error) {
    console.error("로그아웃 오류:", error.message);
  }
}

// [자동로그인 관련 추후수정사항2]
// 엑세스 유무 필드 추가
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user_id;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
  },
})

export default userSlice.reducer;