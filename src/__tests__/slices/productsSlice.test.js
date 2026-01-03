import reducer from '../../features/products/productsSlice';
import { fetchProducts } from '../../features/products/productsThunks';

describe('productsSlice', () => {
  const initialState = {
    items: [],
    status: 'idle',
    error: null,
  };

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle fetchProducts.pending', () => {
    const action = { type: fetchProducts.pending.type };
    const state = reducer(initialState, action);

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });

  test('should handle fetchProducts.fulfilled', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', price: 100 },
      { id: 2, title: 'Product 2', price: 200 },
    ];

    const action = {
      type: fetchProducts.fulfilled.type,
      payload: mockProducts,
    };

    const state = reducer(initialState, action);

    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(mockProducts);
  });

  test('should handle fetchProducts.rejected with payload', () => {
    const action = {
      type: fetchProducts.rejected.type,
      payload: 'Failed to fetch products',
      error: { message: 'Some error' },
    };

    const state = reducer(initialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe('Failed to fetch products');
  });

  test('should handle fetchProducts.rejected without payload', () => {
    const action = {
      type: fetchProducts.rejected.type,
      payload: undefined,
      error: { message: 'Network Error' },
    };

    const state = reducer(initialState, action);

    expect(state.status).toBe('failed');
    expect(state.error).toBe('Network Error');
  });
});
