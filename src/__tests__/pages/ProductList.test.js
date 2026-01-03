import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ProductList from '../../pages/ProductList';
import productsReducer from '../../features/products/productsSlice';
import filtersReducer from '../../features/filters/filtersSlice';

jest.mock('../../hooks/useDebounce', () => ({
  useDebounce: (value) => value,
}));

describe('ProductList page', () => {
  let store;

  const renderPage = (productsState) => {
    store = configureStore({
      reducer: {
        products: productsReducer,
        filters: filtersReducer,
      },
      preloadedState: {
        products: productsState,
        filters: { search: '', category: 'All Categories', sort: 'Default' },
      },
    });

    jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductList />
        </MemoryRouter>
      </Provider>,
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('dispatches fetchProducts when status is idle', () => {
    renderPage({ items: [], status: 'idle', error: null });

    expect(store.dispatch).toHaveBeenCalled();
  });

  it('does NOT dispatch fetchProducts when status is succeeded', () => {
    renderPage({
      items: [{ id: 1, title: 'Shirt', price: 10, image: 'img.png' }],
      status: 'succeeded',
      error: null,
    });

    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('renders "No products found" when list is empty', () => {
    renderPage({ items: [], status: 'succeeded', error: null });

    expect(screen.getByText(/no products found/i)).toBeInTheDocument();
  });

  it('renders product cards when products exist', () => {
    renderPage({
      items: [
        { id: 1, title: 'Shirt', price: 10, category: 'Men', image: 'img1.png' },
        { id: 2, title: 'Pants', price: 20, category: 'Men', image: 'img2.png' },
      ],
      status: 'succeeded',
      error: null,
    });

    expect(screen.getByText('Shirt')).toBeInTheDocument();
    expect(screen.getByText('Pants')).toBeInTheDocument();
    expect(screen.getByAltText('Shirt')).toBeInTheDocument();
    expect(screen.getByAltText('Pants')).toBeInTheDocument();
  });
});
