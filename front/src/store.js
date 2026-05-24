import { configureStore } from '@reduxjs/toolkit';

import authReducer from "./slices/authSlice";
import filmeReducer from "./slices/filmeSlice";
import avaliacaoReducer from "./slices/avaliacaoSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        filme: filmeReducer,
        avaliacao: avaliacaoReducer,
    },
});