import React from "react";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            <Toaster />
        </Provider>
    </React.StrictMode>
);
