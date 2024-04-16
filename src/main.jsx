
import React from "react";
import "./index.css";
import App from "./App";
// eslint-disable-next-line react/no-deprecated
import { render } from "react-dom";                 
import { Provider } from "react-redux";
import {store} from './app/store'
render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);