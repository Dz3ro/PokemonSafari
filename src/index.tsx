import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import PokemonSafari from "./mainPage/PokemonSafari";

import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <PokemonSafari />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
