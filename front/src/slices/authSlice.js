import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const initialState = {
    error: false,
    success: false,
    loading: false,
};


export const register = createAsyncThunk("auth/register",
    async (usuario, thunkAPI) => {

        const data = await authService.register(usuario);

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);



export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;