import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SecureStore from "react-native-secure-store";
import { saveToken, getToken, removeToken } from "../../screens/auth/Login/secureStorage"

export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async ({ login_id, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/login/", { login_id, password })
      console.log(response.data)

      // if (response.data?.token) {
      //   await saveToken(response.data.token);
      //   return response.data.token;
      // }

      // throw new Error("토큰 없음");
      // const authHeader = response.headers.authorization

      // const accessToken = authHeader.replace("Bearer ", "").trim()
      // console.log(response.data.token)
      await AsyncStorage.setItem("access_token", response.data.token);  // ✅ Access Token 저장
      await AsyncStorage.setItem("refresh_token", response.data.refresh_token);
      // await AsyncStorage.setItem("user_id", response.data.user_id);
      // await AsyncStorage.setItem("refresh_token", response.data.refresh_token);

      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
)

export const logout = () => async (dispatch) => {
  try {
    await api.post("/api/logout", {}) // ✅ 서버에서 세션 삭제
    await AsyncStorage.removeItem("access_token"); // ✅ 로컬 토큰 삭제
    await AsyncStorage.removeItem("refresh_token");
    dispatch(userLoggedOut()); // ✅ Redux 상태 초기화
  } catch (error) {
    console.error("로그아웃 오류:", error.error);
  }
}

export const loginWithToken = createAsyncThunk(
  "user/loginWithToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/profile") //누구의 토큰인지 요청
      return response.data
    } catch (error) {
      return rejectWithValue(error.error);
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    loginError: null,
    registrationError: null,
    success: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearErrors: (state) => {
      state.loginError = null;
      state.registrationError = null;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.loading = false;
      state.loginError = null;
      state.registrationError = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ 로그인 요청 시작
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
      })
      // ✅ 로그인 성공
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // 사용자 정보 저장
        state.loginError = null;
      })
      // ✅ 로그인 실패
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      .addCase(loginWithToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.user = action.payload.user; // ✅ 자동 로그인 성공 시 사용자 정보 저장
      })
      .addCase(loginWithToken.rejected, (state) => {
        state.user = null; // ✅ 자동 로그인 실패 시 초기화
        state.loading = false;
      })
  },
})

export const { setUser, clearErrors, userLoggedOut } = userSlice.actions;
export default userSlice.reducer;