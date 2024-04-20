
import * as React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
// eslint-disable-next-line react/no-deprecated
import { render } from "react-dom";                 
import { Provider } from "react-redux";
import {store} from './app/store'

const root = createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>
)
