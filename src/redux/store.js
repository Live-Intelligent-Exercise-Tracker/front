import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import registerSlice from './slices/registerSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        reg: registerSlice,
    },
});

export default store