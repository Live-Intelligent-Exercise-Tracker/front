import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/login/", { username, password })
      console.log(response)
      const { user_id, token } = response.data;

      storage.setString("token", token); // ✅ Access Token 저장

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "로그인 실패");
    }
  }
)

export const logout = () => async (dispatch) => {
  try {
    await api.post("/api/logout", {}) // ✅ 서버에서 세션 삭제
    storage.delete("token"); // ✅ 로컬 토큰 삭제
    dispatch(userLoggedOut()); // ✅ Redux 상태 초기화
  } catch (error) {
    console.error("로그아웃 오류:", error);
  }
}

export const loginWithToken = createAsyncThunk(
  "user/loginWithToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("유저정보") //누구의 토큰인지 요청
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || "자동 로그인 실패");
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
        state.loginError = null;
        state.success = false;
      })
      // ✅ 로그인 성공
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // 사용자 정보 저장
        state.success = true;
      })
      // ✅ 로그인 실패
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.user = action.payload; // ✅ 자동 로그인 성공 시 사용자 정보 저장
      })
      .addCase(loginWithToken.rejected, (state) => {
        state.user = null; // ✅ 자동 로그인 실패 시 초기화
      })
  },
})

export const { setUser, clearErrors, userLoggedOut } = userSlice.actions;
export default userSlice.reducer;