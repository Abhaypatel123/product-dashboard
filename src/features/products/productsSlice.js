// features/products/productsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchProductById, fetchProducts } from './productsThunks';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  loadingById: {},
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchProductById.pending, (state, action) => {
        state.loadingById[action.meta.arg] = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loadingById[action.payload.id] = false;
        const exists = state.items.find((p) => p.id === action.payload.id);
        if (!exists) state.items.push(action.payload);
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loadingById[action.meta.arg] = false;
      });
  },
});

export default productsSlice.reducer;
