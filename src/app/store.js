import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import filtersReducer from '../features/filters/filtersSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    filters: filtersReducer,
  },
});

store.subscribe(() => {
  console.log('Redux State:', store.getState());
});
