import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import Oops from "./views/oops";
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
        path: "/verification",
        element: <App page={4}/>
    }, {
        path: "/oops",
        element: <Oops/>
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
