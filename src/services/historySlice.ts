import { getOrdersApi } from '@/utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { logoutUser } from './userSlice';

import type { TOrder } from '@/utils/types';

type THistoryState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: THistoryState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const fetchHistory = createAsyncThunk('history/fetchHistory', async () => {
  return await getOrdersApi();
});

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.isLoading = true;
        state.orders = [];
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.orders = [];
        state.error = null;
      });
  },
});

export const historyReducer = historySlice.reducer;
