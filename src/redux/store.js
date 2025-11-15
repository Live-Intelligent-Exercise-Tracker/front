import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import registerSlice from './slices/registerSlice';
import pointSlice from './slices/pointSlice';
import workoutSlice from './slices/workoutSlice';
import toastSlice from './slices/toastSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        reg: registerSlice,
        point: pointSlice,
        workout: workoutSlice,
        // toast: toastSlice,
    },
});

export default store