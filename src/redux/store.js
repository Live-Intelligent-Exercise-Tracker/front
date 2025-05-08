import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import registerSlice from './slices/registerSlice';
import pointSlice from './slices/pointSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        reg: registerSlice,
        point: pointSlice,
    },
});

export default store