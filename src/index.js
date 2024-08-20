import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TiktokContextProvider } from "./tiktok-context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TiktokContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TiktokContextProvider>
);
