import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import Dash from "./views/dash";
import Dashboard from "./views/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    }, {
        path: "/get-started",
        element: <App page={1}/>
    }, {
        path: "/login",
        element: <App page={2}/>
    }, {
        path: "/forgot-password",
        element: <App page={3}/>
    }, {
        path: "/dash",
        element: <Dash/>
    }, {
        path: "/dashboard",
        element: <Dashboard/>
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);
