import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken } from '../../utils/common';

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refreshToken");

    try {
      const response = await api.post("/api/users/login/", { email, password })
      console.log(response.data)

      await AsyncStorage.setItem("access_token", response.data.token);
      await AsyncStorage.setItem("refreshToken", response.data.refresh_token);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
    
  }
)

export const logout = async () => {
  try {
    const refresh_token = await AsyncStorage.getItem('refreshToken');
    const access_token = await AsyncStorage.getItem('access_token');
    const response = await api.post("/api/users/logout/", { refresh_token })
    console.log(response.data)

    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");

  } catch (error) {
    console.error("로그아웃 오류:", error.message);
  }
}

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