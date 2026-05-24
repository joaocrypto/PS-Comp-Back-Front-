import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import avaliacaoService from "../services/avaliacaoService";

const initialState = {
    avaliacao: {},
    avaliacoes: [],
    error: false,
    success: false,
    loading: false,
    message: null,
};

export const createAvaliacao = createAsyncThunk("filmes/create-avaliacao",
    async ({avaliacao, id}, thunkAPI) => {

        const token = thunkAPI.getState().auth.token;

        const data = await avaliacaoService.createAvaliacao(avaliacao, id, token);

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);

export const updateAvaliacao = createAsyncThunk("filmes/update-avaliacao",
    async ({avaliacao, id}, thunkAPI) => {

        const token = thunkAPI.getState().auth.token;

        const data = await avaliacaoService.updateAvaliacao(avaliacao, id, token);

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);

export const deleteAvaliacao = createAsyncThunk("filmes/delete-avaliacao",
    async (id, thunkAPI) => {

        const token = thunkAPI.getState().auth.token;

        const data = await avaliacaoService.deleteAvaliacao(id, token);

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);

export const listAvaliacao = createAsyncThunk("filmes/list-avaliacao",
    async (id, thunkAPI) => {

        const token = thunkAPI.getState().auth.token;

        const data = await avaliacaoService.getAvaliacoes(id, token);

        if (data.error) {
            return thunkAPI.rejectWithValue(data.error);
        }

        return data;
    }
);

export const avaliacaoSlice = createSlice({
    name: "avaliacao",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createAvaliacao.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(createAvaliacao.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.avaliacao = action.payload;
            state.message = "Avaliação criada com sucesso!";

        })
        .addCase(createAvaliacao.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(updateAvaliacao.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(updateAvaliacao.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.avaliacao = action.payload;
            state.message = "Avaliação atualizada com sucesso!";
        })
        .addCase(updateAvaliacao.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(deleteAvaliacao.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(deleteAvaliacao.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
            state.error = null;
        })
        .addCase(deleteAvaliacao.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(listAvaliacao.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(listAvaliacao.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = null;
            state.avaliacoes = action.payload.data;
        })
        .addCase(listAvaliacao.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const { resetMessage } = avaliacaoSlice.actions;
export default avaliacaoSlice.reducer;