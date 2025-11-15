import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import registerApi from "../../utils/registerApi";
import Toast from "react-native-toast-message";
import api from "../../utils/api";

// export const registerUser = createAsyncThunk(
//     "register/registerUser",
//     async(
//       {email,nickname,password,gender,age,height,weight,navigation},
//       {rejectWithValue}
//     )=>{
//       try{
//         const response = await registerApi.post("/api/users/register/",{email,nickname,password,gender,age,height,weight})
//         if(response.status!==201) throw new Error("서버 에러")
//         // Toast.show({
//         //     type: 'customToast',
//         //     props:{text1:'회원가입 성공!'}
//         // })
//         return response.data;
//       }catch(error){
//         return rejectWithValue(error.response.data);
//       }
//     }
//   )

export const getWorkoutRecommend = createAsyncThunk(
  "workout/workoutRecommend",
  async ({intent, heart_rate}, {rejectWithValue}) => {
    try {
      const response = await api.post("/api/gemini/chat/", {
        intent,
        heart_rate,
      });
      console.log("api responseee", response.data.response);
      console.log("response statusss", response.status);
      return response.data.response;
    } catch (error) {
      console.log("error", error);
      //     Toast.show({
      //     type: 'customToast',
      //     props:{text1:error}
      // })
      return rejectWithValue(error);
    }
  }
);

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    // loading:false,
    // emailDupSucc: null,
    // emailDupError: null,
    // nickDupSucc: null,
    // nickDupError: null,
    // regError: null,
    // regSuccess: false,
    loading:false,
    error:true,
    workoutIntensity: null,
    // workoutRecommend: null,
    workoutRecommend: "오늘 운동에 대한 열정이 느껴집니다! 현재 심박수 145bpm을 고려했을 때, 고강도 인터벌 트레이닝(HIIT)을 짧게 진행하시는 것이  효과적일 것 같습니다. 예를 들어, 버피 테스트 30초, 휴식 30초를 5세트 반복하는 간단한 루틴을 추천드립니다.  운동 후에는 충분한 휴식과 수분 섭취를 잊지 마세요.",
  },
  reducers: {
    // setSuccFalse:(state)=>{
    //   state.regSuccess= false;
    // },
    setWorkoutIntensity: (state, action) => {
      state.workoutIntensity = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWorkoutRecommend.pending, (state, action) => {
        loading=true;
      })
      .addCase(getWorkoutRecommend.fulfilled, (state, action) => {
        loading=false;
        error=false;
        state.workoutRecommend = action.payload;
      })
      .addCase(getWorkoutRecommend.rejected, (state, action) => {
        loading=false;
        error=true;
      });
  },
});

export const {setWorkoutIntensity} = workoutSlice.actions;
export default workoutSlice.reducer;
