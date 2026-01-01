import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    ids: [],
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      state.ids.includes(id)
        ? state.ids = state.ids.filter((i) => i !== id)
        : state.ids.push(id);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
