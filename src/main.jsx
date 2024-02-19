import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Main.css";
import { RouterProvider } from "react-router-dom";
import Router from "./Router.jsx";
import ShopContextProvider from "./Context/ShopContext.jsx";
import { SearchProvider } from "./Context/SearchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SearchProvider>
      <ShopContextProvider>
        <RouterProvider router={Router}>
          <App />
        </RouterProvider>
      </ShopContextProvider>
    </SearchProvider>
  </React.StrictMode>
);
