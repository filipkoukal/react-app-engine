import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_ROUTE } from '../constants';

export type Row = {
    id?: string;
    manufacturer: string;
    model: string;
    teraflops: number;
    tdp: number;
    rt: boolean;
};

type GridState = {
    rows: Row[];
};

const initialState: GridState = {
    rows: [],
};

export const createGpu = async (payload: Row): Promise<Row> => {
    const response = await axios.post<Row>(`${API_ROUTE}/gpus`, payload);
    return response.data;
};

export const updateGpu = async (payload: Row): Promise<Row> => {
    const response = await axios.put<Row>(
        `${API_ROUTE}/gpus/${payload.id}`,
        payload
    );
    return response.data;
};

export const deleteGpu = async (id: string): Promise<Row> => {
    const response = await axios.delete<Row>(`${API_ROUTE}/gpus/${id}`);
    return response.data;
};

export const fetchRows = createAsyncThunk('grid/fetchRows', async () => {
    const response = await axios.get<Row[]>(`${API_ROUTE}/gpus`);
    return response.data;
});

const gridSlice = createSlice({
    name: 'grid',
    initialState,
    reducers: {
        setRows: (state, action: PayloadAction<Row[]>) => {
            state.rows = action.payload;
        },
        addRow: (state, action: PayloadAction<Row>) => {
            state.rows.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            fetchRows.fulfilled,
            (state, action: PayloadAction<Row[]>) => {
                state.rows = action.payload;
            }
        );
    },
});

export const { setRows, addRow } = gridSlice.actions;

export default gridSlice.reducer;
