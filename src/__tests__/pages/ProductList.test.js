import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ProductList from '../../pages/ProductList';
import productsReducer, * as productsSlice from '../../features/products/productsSlice';
import filtersReducer from '../../features/filters/filtersSlice';

// Mock debounce hook to immediately return value
jest.mock('../../hooks/useDebounce', () => ({
  useDebounce: (value) => value,
}));

describe('ProductList page', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        products: productsReducer,
        filters: filtersReducer,
      },
      preloadedState: {
        products: { items: [], status: 'idle', error: null },
        filters: { search: '', category: 'All Categories', sort: 'Default' },
      },
    });

    jest.spyOn(productsSlice, 'fetchProducts').mockImplementation(() => ({ type: 'products/fetch' }));
    jest.spyOn(store, 'dispatch');
  });

  it('dispatches fetchProducts on mount', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductList />
        </MemoryRouter>
      </Provider>
    );

    expect(store.dispatch).toHaveBeenCalledWith({ type: 'products/fetch' });
  });

  it('renders "No products found" when products list is empty', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });

  it('renders product cards when products are available', () => {
    store = configureStore({
      reducer: {
        products: productsReducer,
        filters: filtersReducer,
      },
      preloadedState: {
        products: {
          items: [
            { id: 1, title: 'Shirt', price: 10, category: 'Men', image: 'img1.png' },
            { id: 2, title: 'Pants', price: 20, category: 'Men', image: 'img2.png' },
          ],
          status: 'succeeded',
          error: null,
        },
        filters: { search: '', category: 'All Categories', sort: 'Default' },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Shirt')).toBeInTheDocument();
    expect(screen.getByText('Pants')).toBeInTheDocument();
    expect(screen.getByAltText('Shirt')).toBeInTheDocument();
    expect(screen.getByAltText('Pants')).toBeInTheDocument();
  });
});
