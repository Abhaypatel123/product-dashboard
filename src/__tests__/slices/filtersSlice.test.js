import filtersReducer, { setSearch, setCategory, setSort } from '../../features/filters/filtersSlice';

describe('filtersSlice', () => {
  const initialState = {
    search: '',
    category: 'All Categories',
    sort: 'Default',
  };

  it('should return the initial state', () => {
    expect(filtersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setSearch', () => {
    const nextState = filtersReducer(initialState, setSearch('shirt'));
    expect(nextState.search).toBe('shirt');
    expect(nextState.category).toBe(initialState.category);
    expect(nextState.sort).toBe(initialState.sort);
  });

  it('should handle setCategory', () => {
    const nextState = filtersReducer(initialState, setCategory("Men's Clothing"));
    expect(nextState.category).toBe("Men's Clothing");
    expect(nextState.search).toBe(initialState.search);
    expect(nextState.sort).toBe(initialState.sort);
  });

  it('should handle setSort', () => {
    const nextState = filtersReducer(initialState, setSort('Price: Low to High'));
    expect(nextState.sort).toBe('Price: Low to High');
    expect(nextState.search).toBe(initialState.search);
    expect(nextState.category).toBe(initialState.category);
  });

  it('should handle multiple actions sequentially', () => {
    let state = filtersReducer(initialState, setSearch('jeans'));
    state = filtersReducer(state, setCategory("Women's Clothing"));
    state = filtersReducer(state, setSort('Price: High to Low'));

    expect(state).toEqual({
      search: 'jeans',
      category: "Women's Clothing",
      sort: 'Price: High to Low',
    });
  });
});
