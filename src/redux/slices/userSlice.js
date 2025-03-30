import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async(
    {login_id,nickname,password,age,height,weight,email,navigation},
    {dispatch, rejectWithValue}
  )=>{
    try{
      const response = await api.post("/api/users/register/",{login_id,nickname,password,age,height,weight,email})
      // console.log("response",response.data.message)

      Alert.alert("회원가입 완료", "회원가입이 완료되었습니다!", [
        {text: "확인", onPress: () => navigation.navigate("Login")},
      ]);
      
      return response.data;
    }catch(error){
      // console.log("response",response)

      Alert.alert("회원가입 실패", "회원가입이 실패했습니다.", [
        {text: "확인"},
      ]);

      return rejectWithValue(error.error);
    }
  }
)

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

      .addCase(registerUser.pending,(state)=>{
        state.loading=true;
        state.registrationError=null;
      })
      .addCase(registerUser.fulfilled, (state)=>{
        state.loading=false;
        state.registrationError=null;
      })
      .addCase(registerUser.rejected,(state,action)=>{
        state.registrationError=action.payload;
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