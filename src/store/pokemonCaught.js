import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "pokemonCaught",
  initialState: [],
  reducers: {
    pokemonCaughtAdded: (state, action) => {
      state.push(action.payload);
    },
    pokemonCaughtRemoved: (state, action) => {
      const index = state.findIndex((x) => x === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { pokemonCaughtAdded, pokemonCaughtRemoved } = slice.actions;
export default slice.reducer;
