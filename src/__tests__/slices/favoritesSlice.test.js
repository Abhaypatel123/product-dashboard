import reducer, { toggleFavorite } from '../../features/favorites/favoritesSlice';

describe('favoritesSlice', () => {
  const initialState = {
    ids: [],
  };

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should add product id to favorites when not present', () => {
    const action = toggleFavorite(1);
    const state = reducer(initialState, action);

    expect(state.ids).toEqual([1]);
  });

  test('should remove product id from favorites when already present', () => {
    const stateWithFav = { ids: [1] };
    const action = toggleFavorite(1);
    const state = reducer(stateWithFav, action);

    expect(state.ids).toEqual([]);
  });

  test('should toggle multiple favorites correctly', () => {
    let state = reducer(initialState, toggleFavorite(1));
    state = reducer(state, toggleFavorite(2));
    state = reducer(state, toggleFavorite(1));

    expect(state.ids).toEqual([2]);
  });

  test('should not mutate original state', () => {
    const state = { ids: [] };
    const newState = reducer(state, toggleFavorite(1));

    expect(state).not.toBe(newState);
  });
});
