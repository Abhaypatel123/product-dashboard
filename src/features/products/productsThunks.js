import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

export const fetchProducts = createAsyncThunk('products/fetch', async () => {
  const res = await api.get('/products');
  return res.data;
});
