import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const monthStatus = createAsyncThunk(
    "point/monthStatus",
    async (_, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            const response = await api.get("api/points/attendance/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const attendanceCheck = createAsyncThunk(
    "point/attendanceCheck",
    async (_, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            const response = await api.post("/api/points/attendance/checkin/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const pointTotal = createAsyncThunk(
    "point/pointTotal",
    async (_, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem('access_token');
            const response = await api.get("/api/points/total/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

const pointSlice = createSlice({
    name: "point",
    initialState: {
        loading: false,
        message: null,
        total: null,
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(monthStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(monthStatus.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(monthStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "오류가 발생했습니다.";
            })
            .addCase(pointTotal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(pointTotal.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.total = action.payload;
            })
            .addCase(pointTotal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "오류가 발생했습니다.";
            })
    },
})

export default pointSlice.reducer;