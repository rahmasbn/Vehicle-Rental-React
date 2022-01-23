import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./Main";
import { Provider } from "react-redux";
import {store} from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Main />
    </React.StrictMode>
    ,
  </Provider>,
  document.getElementById("root")
);
