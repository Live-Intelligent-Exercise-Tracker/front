import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import registerApi from "../../utils/registerApi";

export const registerUser = createAsyncThunk(
    "register/registerUser",
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
    "register/checkEmailDup",
    async(
      {email},
      {rejectWithValue}
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
    "register/checkNickDup",
    async(
      {nickname},
      {rejectWithValue}
    )=>{
      try{
        const response = await registerApi.post("/api/users/checknickname/",{nickname})
  
        return response.data;
      }catch(error){
        return rejectWithValue(error.response.data.message)
      }
    }
  )


const registerSlice = createSlice({
  name: "register",
  initialState: {
    loading:false,
    emailDupSucc: null,
    emailDupError: null,
    nickDupSucc: null,
    nickDupError: null,
    regError: null,
    regSuccess: false,
  },
  reducers: {
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

export const { clearMsgs, setSuccFalse } = registerSlice.actions;
export default registerSlice.reducer;