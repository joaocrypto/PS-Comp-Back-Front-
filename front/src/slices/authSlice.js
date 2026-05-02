import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const usuario = JSON.parse(localStorage.getItem("usuario"));
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
    usuario: usuario ? usuario : null,
    token: token ? token : null,
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


export const login = createAsyncThunk("auth/login",
    async (credenciais, thunkAPI) => {

        const data = await authService.login(credenciais);

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);


export const logout = createAsyncThunk("auth/logout",
    async () => {
        await authService.logout();
    }
);


export const forgotPassword = createAsyncThunk("auth/forgotPassword",
    async (credenciais, thunkAPI) => {

        const data = await authService.forgotPassword(credenciais);

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);


export const resetPassword = createAsyncThunk("auth/resetPassword",
    async (credenciais, thunkAPI) => {

        const data = await authService.resetPassword(credenciais);

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
        .addCase(register.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(login.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.usuario = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.usuario = null;
            state.token = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.usuario = null;
            state.token = null;
        })
        .addCase(forgotPassword.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(forgotPassword.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(resetPassword.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(resetPassword.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;