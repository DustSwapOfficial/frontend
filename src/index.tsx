import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

axios.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    const token = window.localStorage.getItem("jwt-authenticationToken");
    if (token && config?.headers) {
      if (config && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
