import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveToken, getToken, deleteToken } from "../../screens/auth/Login/secureStorage"

export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async ({ login_id, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/users/login/", { login_id, password })
      console.log(response.data)
      
      await AsyncStorage.setItem("access_token", response.data.token); 
      await AsyncStorage.setItem("refresh_token", response.data.refresh_token);
      // await saveToken("access_token", response.data.token); // access token 저장
      // await saveToken("refresh_token", response.data.refresh_token); // refresh token 저장
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const logout = () => async (dispatch) => {
  try {
    await api.post("/api/logout", {}) 
    await AsyncStorage.removeItem("access_token"); 
    await AsyncStorage.removeItem("refresh_token");
    dispatch(userLoggedOut()); 
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
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user_id;
        state.loginError = null;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      .addCase(loginWithToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(loginWithToken.rejected, (state) => {
        state.user = null; 
        state.loading = false;
      })
  },
})

export const { setUser, clearErrors, userLoggedOut } = userSlice.actions;
export default userSlice.reducer;