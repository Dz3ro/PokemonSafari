import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "pokemonData",
  initialState: [],
  reducers: {
    pokemonDataAdded: (state, action) => {
      state.push({
        id: action.payload.id,
        name: action.payload.name,
        img: action.payload.img,
      });
    },
    pokemonDataRemoved: (state, action) => {
      const index = state.findIndex((x) => x === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { pokemonDataAdded, pokemonDataRemoved } = slice.actions;
export default slice.reducer;
