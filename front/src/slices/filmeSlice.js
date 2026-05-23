import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filmeService from "../services/filmeService";

const initialState = {
    filme: {},
    error: false,
    success: false,
    loading: false,
    message: null,
};

export const createFilme = createAsyncThunk("filmes/create-filme",
    async (filme, thunkAPI) => {

        const token = thunkAPI.getState().auth.token;

        const data = await filmeService.createFilme(filme, token);

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);



export const filmeSlice = createSlice({
    name: "filme",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createFilme.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(createFilme.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.filme = action.payload;
            state.message = "Filme criado com sucesso!";
        })
        .addCase(createFilme.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});


export const { resetMessage } = filmeSlice.actions;
export default filmeSlice.reducer;