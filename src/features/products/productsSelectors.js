export const selectProductsState = (state) => state.products;

export const selectAllProducts = (state) => selectProductsState(state).items;

export const selectProductById = (state, productId) =>
  selectProductsState(state).items.find((product) => product.id === Number(productId));

export const selectProductsStatus = (state) => selectProductsState(state).status;

export const selectProductsError = (state) => selectProductsState(state).error;
export const selectProductLoadingById = (state, id) =>
  state.products.loadingById[id];

