import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import { retryApiCall } from '../../utils/retryApi';

export const fetchProducts = createAsyncThunk('products/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await retryApiCall(() => api.get('/products'), 3, 500);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || 'Failed to fetch products');
  }
});

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await retryApiCall(() => api.get(`/products/${id}`), 3, 500);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch product');
    }
  },
);
