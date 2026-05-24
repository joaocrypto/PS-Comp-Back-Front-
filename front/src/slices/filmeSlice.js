import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filmeService from "../services/filmeService";

const initialState = {
    filme: {},
    filmes: [],
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

export const updateFilme = createAsyncThunk("filmes/update-filme",
    async ({filme, id}, thunkAPI) => {

        const token = thunkAPI.getState().auth.token;

        const data = await filmeService.updateFilme(filme, id, token);

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);

export const deleteFilme = createAsyncThunk("filmes/delete-filme",
    async (id, thunkAPI) => {

        const token = thunkAPI.getState().auth.token;

        const data = await filmeService.deleteFilme(id, token);

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);

export const listOne = createAsyncThunk("filmes/list-filme",
    async (id, thunkAPI) => {

        const token = thunkAPI.getState().auth.token;

        const data = await filmeService.getFilme(id, token);

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);

export const listAll = createAsyncThunk("filmes/list-all-filmes",
    async (_, thunkAPI) => {

        const token = thunkAPI.getState().auth.token;

        const data = await filmeService.getAllFilmes(token);

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
        .addCase(updateFilme.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(updateFilme.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.filme = action.payload;
            state.message = "Filme atualizado com sucesso!";
        })
        .addCase(updateFilme.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteFilme.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(deleteFilme.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(deleteFilme.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(listOne.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(listOne.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.filme = action.payload;
        })
        .addCase(listOne.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(listAll.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(listAll.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.filmes = action.payload.data;
        })
        .addCase(listAll.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});


export const { resetMessage } = filmeSlice.actions;
export default filmeSlice.reducer;