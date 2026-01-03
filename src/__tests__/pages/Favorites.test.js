import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import Favorites from '../../pages/Favorites';
import productsReducer from '../../features/products/productsSlice';
import favoritesReducer from '../../features/favorites/favoritesSlice';

// 🔹 Mock ProductCard
jest.mock('../../components/ProductCard', () => ({ product }) => (
  <div data-testid="product-card">{product.title}</div>
));

describe('Favorites page', () => {
  const renderPage = ({ productsState, favoritesState }) => {
    const store = configureStore({
      reducer: {
        products: productsReducer,
        favorites: favoritesReducer,
      },
      preloadedState: {
        products: productsState,
        favorites: favoritesState,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Favorites />
        </MemoryRouter>
      </Provider>,
    );
  };

  test('shows empty state when no favorites exist', () => {
    renderPage({
      productsState: { items: [], status: 'succeeded', error: null, loadingById: {} },
      favoritesState: { ids: [] },
    });

    expect(screen.getByText(/your favorites list is empty/i)).toBeInTheDocument();
    expect(screen.getByText(/start building your collection/i)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /continue shopping/i })).toBeInTheDocument();
  });

  test('shows empty state when products exist but none are favorited', () => {
    renderPage({
      productsState: {
        items: [{ id: 1, title: 'Shirt' }],
        status: 'succeeded',
        error: null,
        loadingById: {},
      },
      favoritesState: { ids: [] },
    });

    expect(screen.getByText(/your favorites list is empty/i)).toBeInTheDocument();
  });

  test('renders favorite products correctly', () => {
    renderPage({
      productsState: {
        items: [
          { id: 1, title: 'Shirt' },
          { id: 2, title: 'Pants' },
        ],
        status: 'succeeded',
        error: null,
        loadingById: {},
      },
      favoritesState: { ids: [2] },
    });

    expect(screen.queryByText(/your favorites list is empty/i)).not.toBeInTheDocument();
    expect(screen.getByText('Pants')).toBeInTheDocument();
    expect(screen.queryByText('Shirt')).not.toBeInTheDocument();

    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(1);
  });

  test('renders multiple favorite products', () => {
    renderPage({
      productsState: {
        items: [
          { id: 1, title: 'Shirt' },
          { id: 2, title: 'Pants' },
          { id: 3, title: 'Shoes' },
        ],
        status: 'succeeded',
        error: null,
        loadingById: {},
      },
      favoritesState: { ids: [1, 3] },
    });

    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('Shirt')).toBeInTheDocument();
    expect(screen.getByText('Shoes')).toBeInTheDocument();
    expect(screen.queryByText('Pants')).not.toBeInTheDocument();
  });
});
