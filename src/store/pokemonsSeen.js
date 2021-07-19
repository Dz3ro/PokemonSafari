import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "pokemonSeen",
  initialState: [],
  reducers: {
    pokemonSeenAdded: (state, action) => {
      state.push(action.payload);
    },
    pokemonSeenRemoved: (state, action) => {
      const index = state.findIndex((x) => x === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { pokemonSeenAdded, pokemonSeenRemoved } = slice.actions;
export default slice.reducer;
