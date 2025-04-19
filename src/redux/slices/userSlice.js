import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import registerApi from '../../utils/registerApi';

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
    await api.post("/api/logout", {}) // ✅ 서버에서 세션 삭제
    await AsyncStorage.removeItem("access_token"); // ✅ 로컬 토큰 삭제
    dispatch(userLoggedOut()); // ✅ Redux 상태 초기화
  } catch (error) {
    console.error("로그아웃 오류:", error);
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

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async(
    {email,nickname,password,gender,age,height,weight,navigation},
    {rejectWithValue}
  )=>{
    try{
      const response = await registerApi.post("/api/users/register/",{email,nickname,password,gender,age,height,weight})

      return response.data;
    }catch(error){
      return rejectWithValue(error.response.data);
    }
  }
)

export const checkEmailDup = createAsyncThunk(
  "user/checkEmailDup",
  async(
    {email},
    {dispatch, rejectWithValue}
  )=>{
    try{
      const response = await registerApi.post("/api/users/checkemail/",{email})

      return response.data;
    }catch(error){
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const checkNickDup = createAsyncThunk(
  "user/checkNickDup",
  async(
    {nickname},
    {dispatch, rejectWithValue}
  )=>{
    try{
      const response = await registerApi.post("/api/users/checknickname/",{nickname})

      return response.data;
    }catch(error){
      return rejectWithValue(error.response.data.message)
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    loginError: null,
    success: false,

    emailDupSucc: null,
    emailDupError: null,
    nickDupSucc: null,
    nickDupError: null,
    regError: null,
    regSuccess: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearErrors: (state) => {
      state.loginError = null;
      state.regError = null;
    },
    userLoggedOut: (state) => {
      state.user = null;
      state.loading = false;
      state.loginError = null;
      state.regError = null;
      state.success = false;
    },
    setSuccFalse:(state)=>{
      state.regSuccess= false;
    },
    clearMsgs:(state)=>{
      state.emailDupSucc=null;
      state.emailDupError=null;
      state.nickDupSucc=null;
      state.nickDupError=null;
    }
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
      .addCase(checkEmailDup.fulfilled, (state,action)=>{
        state.emailDupSucc = action.payload.message;
      })
      .addCase(checkEmailDup.rejected,(state,action)=>{
        state.emailDupError=action.payload;
      })
      .addCase(checkNickDup.fulfilled, (state,action)=>{
        state.nickDupSucc=action.payload.message
      })
      .addCase(checkNickDup.rejected,(state,action)=>{
        state.nickDupError=action.payload;
      })
      .addCase(registerUser.pending,(state)=>{
        state.loading=true;
        state.regError=null;
      })
      .addCase(registerUser.fulfilled, (state)=>{
        state.loading=false;
        state.regError=null;
        state.regSuccess=true;
      })
      .addCase(registerUser.rejected,(state,action)=>{
        state.regError=action.payload.message;
      })
  },
})

export const { setUser, clearErrors, userLoggedOut, clearMsgs, setSuccFalse } = userSlice.actions;
export default userSlice.reducer;