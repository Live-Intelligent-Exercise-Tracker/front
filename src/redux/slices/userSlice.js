import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import registerApi from '../../utils/registerApi';
import { Alert } from 'react-native';

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
    {dispatch, rejectWithValue}
  )=>{
    try{
      const response = await registerApi.post("/api/users/register/",{email,nickname,password,gender,age,height,weight})
      console.log("response",response)

        // Alert.alert("회원가입 성공", "회원가입이 완료되었습니다!", [
        //   {text: "확인", onPress: () => navigation.navigate("Login")},
        // ]); 
      
      return response.data;
    }catch(error){
      console.log("error",error.response.data.error)
      // Alert.alert(`${error.response.status} 에러`, "회원가입이 실패했습니다.", [
      //   {text: "확인"},
      // ]);

      return rejectWithValue(error.response);
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
      console.log("response",response)
      Alert.alert("이메일 중복 확인", "사용할 수 있는 이메일입니다!", [
        {text: "확인"},
      ]);
      alert("사용 가능한 이메일입니다!")
    }catch(error){
      console.log("error",error.response.data.message)
      alert("사용 불가한 아이디입니다.")  
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
      console.log("response",response)
      Alert.alert("닉네임 중복 확인", "사용할 수 있는 닉네임입니다!", [
        {text: "확인"},
      ]);
      alert("사용 가능한 닉네임입니다!")
    }catch(error){
      console.log("error",error.response.data.message)
      alert("사용 불가한 닉네임입니다.")  
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

    emailDupError: null,
    nickDupError: null,
    registrationError: false,
    regSuccess: false,
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
    setSuccFalse:(state)=>{
      state.regSuccess= false;
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
      .addCase(checkEmailDup.rejected,(state,action)=>{
        state.emailDupError=action.payload;
      })
      .addCase(checkNickDup.rejected,(state,action)=>{
        state.nickDupError=action.payload;
      })
      .addCase(registerUser.pending,(state)=>{
        state.loading=true;
        state.registrationError=null;
      })
      .addCase(registerUser.fulfilled, (state)=>{
        state.loading=false;
        state.registrationError=null;
        state.regSuccess=true;
      })
      .addCase(registerUser.rejected,(state,action)=>{
        state.registrationError=action.payload;
      })
  },
})

export const { setUser, clearErrors, userLoggedOut, setSuccFalse } = userSlice.actions;
export default userSlice.reducer;