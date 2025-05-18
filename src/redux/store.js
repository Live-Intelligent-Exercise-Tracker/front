import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import registerSlice from './slices/registerSlice';
import toastSlice from './slices/toastSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        reg: registerSlice,
        // toast: toastSlice,
    },
});

export default store