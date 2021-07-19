import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import pokemonData from "./pokemonData";
import pokemonsSeen from "./pokemonsSeen";
import pokemonCaught from "./pokemonCaught";

const combinedReducers = combineReducers({
  data: pokemonData,
  seen: pokemonsSeen,
  caught: pokemonCaught,
});

const store = configureStore({
  reducer: { entities: combinedReducers },
});

export default store;
